import {
  Unit,
  Result
} from '../../utils/GPAC';
import {
  defaultPresets
} from '../../utils/defaultSubjects.js';
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
    announcement: "",
    presetIndex: 0,
    defaultPresets: [],
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
  toCanvas: function() {
    wx.navigateTo({
      url: '../../pages/wxCanvas/wxCanvas?'
    })
  },

  easterEgg: function() {
    if (easterEgg == 10) {
      wx.showModal({
        title: 'You Are Not Supposed To See This',
        content: 'Hey! You have discovered an Easter Egg! Now I am going to tell you a secret.',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../pages/AboutUs/AboutUs?',
            });
          } else if (res.cancel) {}
        }
      });
    }
    easterEgg++;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.initialize();

    wx.cloud.callFunction({
        name: 'presetCloud'
      })
      .then(res => {
        that.search(res.result.data);
      })
      .catch(console.error)

    this.setData({
      defaultPresets: defaultPresets,
      currentPreset: defaultPresets[0]
    })
  },

  initialize: function() {
    GPACs = [];
    for (let preset of defaultPresets) {
      for (let subject of preset.subjects) {
        GPACs.push(new Unit(subject.subjectName, subject.credit, subject.type, subject.level[0]));
      }
    }
  },

  changePreset: function(e) {
    this.setData({
      currentPreset: defaultPresets[e.detail.value],
      presetIndex: e.detail.value //显示前端level 
    })
    this.initialize();
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

  search: function(fetchedPresets) {
    var that = this;
    var nickName = '';
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo;
        nickName = userInfo.nickName.replace(/\s*/g, "");
        for (let preset of fetchedPresets) {
          if (nickName == preset.Name) {
            defaultPresets.push(preset);
            that.setData({
              defaultPresets: defaultPresets
            })
          }
        }
      },
      fail: function(res) {}
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

  onShow: function() {
  },

  onHide: function() {
  }

})