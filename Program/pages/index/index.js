import {
  Unit,
  Result
} from '../../utils/GPAC';

const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();
var GPACs = [];
var easterEgg = 0;
//Default Presets

Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcomeText: "Good day",
    unLoaded: false,
    isPresetLoaded: false,
    isNavLoaded: false,
    swiperNav: {　　
      i: 0,
      defaultPresets: []　
    },
    defaultPresets: [{
      presetName: "Default Preset",
      displayName: "Default Loading...",
      subjects: [{
        name: "Loading..."
      }]
    }],
    currentPreset: [
      'Example', [{
        subjectName: 'Loading......',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 5.5,
        type: 1 //1 = Language, 0 = NonLanguage
      }]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: 'Loading...',
    })
    var that = this;
    var defaultPresets = [];
    wx.cloud.callFunction({
        name: 'getDb',
        data: {
          dbName: "defaultPresets"
        }
      })
      .then(res => {
        defaultPresets = res.result.data;
        wx.cloud.callFunction({
            name: 'getDb',
            data: {
              dbName: "UserPreset"
            }
          })
          .then(res => {
            var userPresets = res.result.data;
            wx.cloud.callFunction({
                name: 'getDb',
                data: {
                  dbName: "welcomeTexts"
                }
              })
              .then(res => {
                var welcomeTexts = res.result.data;
                var myPresets = [];
                    var openid = app.globalData.user._openid
                    for (let preset of userPresets) {
                      if (openid === preset._openid) {
                        myPresets.push(preset);
                      }
                    }
                    that.initialize(defaultPresets[0]);
                    that.setData({
                      "swiperNav.defaultPresets": defaultPresets.concat(myPresets),
                      defaultPresets: defaultPresets.concat(myPresets),
                      currentPreset: defaultPresets[0],
                      welcomeText: welcomeTexts[Math.floor((Math.random() * welcomeTexts.length))].text,
                      isPresetLoaded: true,
                      isNavLoaded: true
                    })
                    wx.hideLoading();
              })
          })
          .catch(console.error);
      })
      .catch(console.error);
  },

  onShow: function() {},

  initialize: function(currentPreset) {
    GPACs = [];
    for (let subject of currentPreset.subjects) {
      GPACs.push(new Unit(subject.subjectName, subject.credit, subject.type, subject.level[0]));
    }
  },

  scrollNav: function(e) {
    /*获取可视窗口宽度*/
    console.log(e);
    var w = wx.getSystemInfoSync().windowWidth;
    var len = this.data.swiperNav.defaultPresets.length;
    var disX = (e.currentTarget.dataset.speed - 2) * w / len;
    if (e.currentTarget.dataset.speed != this.data.swiperNav.i) {
      this.setData({
        'swiperNav.i': e.currentTarget.dataset.speed
      })
    }
    this.setData({
      'swiperNav.x': disX,
    })
  },

  changePreset: function(e) {
    /*获取可视窗口宽度*/
    var w = wx.getSystemInfoSync().windowWidth;
    var len = this.data.swiperNav.defaultPresets.length;
    var i = e.target.dataset.i;
    var disX = (i - 2) * w / len;
    if (i != this.data.swiperNav.i) {
      this.setData({
        'swiperNav.i': i
      })
    }
    this.setData({
      'swiperNav.x': disX,
      currentPreset: this.data.defaultPresets[i]
    })
    this.initialize(this.data.defaultPresets[i]);
  },

  getSubScore: function(e) {
    var index = e.currentTarget.dataset.index;
    GPACs[index].setCredit(this.data.currentPreset.subjects[index].credit);
    GPACs[index].setScore(e.detail.value);
  },

  getSubLevel: function(e) {
    var index = e.currentTarget.dataset.index;
    var selectedLevel = this.data.currentPreset.subjects[index].level[e.detail.value];
    var formatter = "currentPreset.subjects[" + index + "].selectedValue";
    GPACs[index].setLevel(selectedLevel);
    this.setData({
      [formatter]: e.detail.value, //显示前端level 
    })
    console.log("A")
  },

  //StartUp Function 
  submit: function() {
    var total = 0;
    var that = this;
    var gpaResult = new Result(GPACs);
    console.log(gpaResult);
    var gpaFinal = gpaResult.getGPA();
    app.globalData.gpa = gpaFinal;
    //Present GPA
    wx.showModal({
      title: 'Result',
      content: ("Your GPA is " + gpaFinal + "," + gpaResult.getRank() + "\n Do you want to access more info(STAT,HISTORY) by uploading your GPA?"),
      confirmText: "Ok",
      cancelText: "No",
      success: function(res) {
        if (res.confirm) {
          that.upload(gpaFinal);
        } else if (res.cancel) {}
      }
    });

  },

  upload: function(gpa) {
    var that = this;
    const _ = db.command;
    var time = util.formatTime(new Date());
        db.collection('UserGPA').doc(app.globalData.user._openid).update({
          // data 传入需要局部更新的数据
          data: {
            GPA: _.push(gpa),
            grade: that.data.currentPreset.presetName,
            time: _.push(time)
          },
          success: res => {
            console.log(res);
            wx.showToast({
              title: 'Updated~',
            }) 
          },
          fail: err => {
              console.error('[数据库] [更新记录] 失败：', err)
          }
        })
  },

  showShareMenu() {
    wx.showShareMenu();
  },

  onPullDownRefresh: function() {
  },

  onShareAppMessage: function() {
    return {
      title: 'Check out your GPA',
      path: '/pages/index/index?',
      imageUrl: "/utils/logoBak.png"
    }
  },

  onHide: function() {}

})