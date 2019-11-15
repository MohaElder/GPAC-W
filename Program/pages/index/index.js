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
    unLoaded:false,
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
      title: '🏃‍♂🚴‍♀️',
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
                wx.getUserInfo({
                  success: function(res) {
                    var nickName = res.userInfo.nickName.replace(/\s*/g, "");
                    for (let preset of userPresets) {
                      if (nickName === preset.Name) {
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
                  },
                  fail: function(res) {}
                })
              })
          })
          .catch(console.error);
      })
      .catch(console.error);
  },

  onShow: function() {
    if(this.data.isNavLoaded && this.data.isPresetLoaded){
      this.setData({
        unLoaded: true
      })
    }
  },

  initialize: function(currentPreset) {
    GPACs = [];
    for (let subject of currentPreset.subjects) {
      GPACs.push(new Unit(subject.subjectName, subject.credit, subject.type, subject.level[0]));
    }
  },

  changePreset: function(e) {
    console.log(e);　 /*获取可视窗口宽度*/
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

  getUserInfo: function(e) {
    var name = e.detail.userInfo.nickName.replace(/\s*/g, "");
    this.submit(name);
  },

  //StartUp Function 
  submit: function(name) {
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
          that.upload(gpaFinal, name);
        } else if (res.cancel) {}
      }
    });

  },

  upload: function(gpa, name) {
    const _ = db.command;
    var time = util.formatTime(new Date());
    db.collection('UserGPA').doc(name).get({ //建立或者更新数据库信息
      success: function(res) {
        db.collection('UserGPA').doc(name).update({
          // data 传入需要局部更新的数据
          data: {
            GPA: _.push(gpa),
            grade: this.data.currentPreset.presetName,
            time: _.push(time)
          }
        })
        // res.data 包含该记录的数据
        wx.showModal({
          title: 'Status',
          content: 'Your profile has been updated!',
        });
      },
      fail: function() {
        db.collection('UserGPA').add({
          data: {
            _id: name,
            GPA: [gpa],
            grade: this.data.currentPreset.presetName,
            time: [time]
          }
        })
        wx.showModal({
          title: 'Status',
          content: 'Your profile has been created!',
        });
      }
    })
  },

  showShareMenu() {
    wx.showShareMenu();
  },

  onPullDownRefresh: function() {
    this.onLoad()
  },

  onShareAppMessage: function() {
    return {
      title: 'Wow! My GPA is ' + finalGPA,
      path: '/pages/index/index?',
      //imageUrl: "/images/1.jpg"
    }
  },

  onHide: function() {
    this.setData({
      unLoaded:true
    })
  }

})