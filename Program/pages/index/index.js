import { Unit, Result } from '../../utils/GPAC';

const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();
var grade = app.globalData.gradeList;
var GPACs = [];
var Presets, presetListname = []
var finalGPA;
var selectedGrade;
var easterEgg = 0;

//Default Presets

var defaultPresets = [app.globalData.eighthGrade, app.globalData.ninethGrade, app.globalData.tenthGrade, app.globalData.elethGrade, app.globalData.ib];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    announcement: "",
    presetListname:["8th Grade","9th Grade","10th Grade","11th Grade", "IB"],
    presetIndex: 0,
    subjects: [
      {
      subjectName: 'Loading......',
      level: ['S', 'S+', 'H', 'H+', 'AP'],
      selectedValue: 0,
      credit:5.5,
      type: 1 //1 = Language, 0 = NonLanguage
    }
    ]
  },
  toCanvas: function(){
    wx.navigateTo({
      url: '../../pages/wxCanvas/wxCanvas?'
    })
  },
  easterEgg: function(){
    if(easterEgg == 10){
      wx.showModal({
        title: 'You Are Not Supposed To See This',
        content: 'Hey! You have discovered an Easter Egg! Now I am going to tell you a secret.',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../pages/AboutUs/AboutUs?',
            });
          }
          else if (res.cancel) {
          }
        }
      });
    }
    easterEgg++;
  },

  changePreset: function(e){
    selectedGrade = grade[e.detail.value];
    var that = this;
    that.setData({
      subjects: defaultPresets[e.detail.value],
      presetIndex: e.detail.value//显示前端level 
    })
    GPACs = [];
    for (var i = 0; i < defaultPresets[e.detail.value].length; i++) {
      GPACs.push(new Unit(defaultPresets[e.detail.value][i].subjectName, defaultPresets[e.detail.value][i].credit, defaultPresets[e.detail.value][i].type, defaultPresets[e.detail.value][i].level[0]));
    }
  },

  getSubScore: function (e) {
    var index = e.currentTarget.dataset.index;
    GPACs[index].setCredit(this.data.subjects[index].credit);
    GPACs[index].setScore(e.detail.value);
    
  },

  getSubLevel: function (e) {
    var index = e.currentTarget.dataset.index;
    var selectedLevel = this.data.subjects[index].level[e.detail.value];
    var formatter = "subjects[" + index + "].selectedValue";
    GPACs[index].setLevel(selectedLevel);
    this.setData({
     [formatter]: e.detail.value,//显示前端level 
    })

  },

  userInfo: function (e) {
    var that = this;
    var name = e.detail.userInfo.nickName.replace(/\s*/g, "");
    that.Submit(name);

  },
  //StartUp Function 
  Submit: function (name) {
    var total = 0;
    var that = this;
    var gpaFinal = new Result(GPACs);
    finalGPA = gpaFinal.getGPA();
    app.globalData.gpa = finalGPA;
    //Present GPA
    wx.showModal({
      title: 'Result',
      content: ("Your GPA is " + finalGPA + "," + gpaFinal.getRank() + "\n Do you want to access more info(STAT,HISTORY) by uploading your GPA?"),
      confirmText: "Ok",
      cancelText: "No",
      success: function (res) {
        if (res.confirm) {
          that.Upload(finalGPA,name);
        }
        else if (res.cancel) {
        }
      }
    });
    
  },

  Upload: function(GPA,name){
    const _ = db.command;
    var Time = util.formatTime(new Date());
    db.collection('UserGPA').doc(name).get({//建立或者更新数据库信息
      success: function (res) {
        db.collection('UserGPA').doc(name).update({
          // data 传入需要局部更新的数据
          data: {
            GPA: _.push(GPA),
            grade: selectedGrade,
            time: _.push(Time)
          }
        })
        // res.data 包含该记录的数据
        wx.showModal({
          title: 'Status',
          content: 'Your profile has been updated!',
        });
      },
      fail: function () {
        db.collection('UserGPA').add({
          data: {
            _id: name,
            GPA: [GPA],
            grade: selectedGrade,
            time: [Time]
          }
        })
        wx.showModal({
          title: 'Status',
          content: 'Your profile has been created!',
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("AAAAA" + this.data.subjects);
    var that = this;
    that.setData({
      subjects: defaultPresets[0]
    })
    for (var i = 0; i < this.data.subjects.length; i++) {
      //var TempList = settingList[i].split("@");//Decode CreditList
      GPACs.push(new Unit(this.data.subjects[i].subjectName, this.data.subjects[i].credit, this.data.subjects[i].type, this.data.subjects[i].level[0]));
    }

    
    wx.cloud.callFunction({
      name: 'presetCloud'
    })
      .then(res => {
        Presets = res.result.data;
        that.search();
      })
      .catch(console.error)
  },

  search: function () {
    var that = this;
    var nickName = '';
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        nickName = userInfo.nickName.replace(/\s*/g, "")
        for (var count = 0; count < Presets.length; count++) {
          if (nickName == Presets[count].Name) {
            presetListname = that.data.presetListname;
            presetListname.push(Presets[count].Presetname);
            grade.push(Presets[count].Presetgrade);
            defaultPresets.push(Presets[count].subjects);
            that.setData({
              presetListname: presetListname
            })
          }
        }
      },
      fail: function (res) {
      }
    })
  },

  showShareMenu() {
    wx.showShareMenu();
  },

  onPullDownRefresh: function () {
    this.onLoad()
  },

  onShareAppMessage: function () {
    return {
      title: 'Wow! My GPA is ' + finalGPA,
      path: '/pages/index/index?',
      //imageUrl: "/images/1.jpg"
    }
  },

  onShow: function(){
    app.sliderightshow(this, 'slide_right1', -110, 1);
    setTimeout(function () {
      app.sliderightshow(this, 'slide_right2', -110, 1);
    }.bind(this), 200);
  },
  
  onHide: function(){
    app.sliderightshow(this, 'slide_right1', 110, 0);
    setTimeout(function () {
      app.sliderightshow(this, 'slide_right2', 110, 1)
    }.bind(this), 200);
  }

})