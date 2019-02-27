import { Unit, Result } from '../../utils/GPAC';

const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();
const userSearcher = db.collection('UserGPA');
var grade = app.globalData.gradeList;
var GPACs = [];
var Presets, presetListname = []
var finalGPA;
var selectedGrade;

//Default Presets

var defaultPresets = [app.globalData.eighthGrade, app.globalData.ninethGrade, app.globalData.tenthGrade, app.globalData.elethGrade, app.globalData.ib];

//console.log(defaultPresets)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubimageList:app.globalData.imageList,
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

  changePreset: function(e){
    selectedGrade = grade[e.detail.value];
    //console.log(this.data.presetList[e.detail.value]);
    this.setData({
      subjects: defaultPresets[e.detail.value],
      presetIndex: e.detail.value//显示前端level 
    })
    GPACs = [];
    console.log(selectedGrade);
    for (var i = 0; i < defaultPresets[e.detail.value].length; i++) {

      GPACs.push(new Unit(defaultPresets[e.detail.value][i].subjectName, defaultPresets[e.detail.value][i].credit, defaultPresets[e.detail.value][i].type));
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
    //console.log(selectedLevel);
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
          console.log("Cancelled");
        }
      }
    });
    
  },

  Upload: function(GPA,name){
    const _ = db.command;
    console.log("Running Upload...")
    var Time = util.formatTime(new Date());
    db.collection('UserGPA').doc(name).get({//建立或者更新数据库信息
      success: function (res) {
        console.log("Running Update..." + "GPA is " + GPA + " Time is " + Time);
        db.collection('UserGPA').doc(name).update({
          // data 传入需要局部更新的数据
          data: {
            GPA: _.push(GPA),
            grade: selectedGrade,
            time: _.push(Time)
          }
        })
        // res.data 包含该记录的数据
        console.log("Updated!");
        wx.showModal({
          title: 'Status',
          content: 'Your profile has been updated!',
        });
      },
      fail: function () {
        console.log("Running Create...");
        db.collection('UserGPA').add({
          data: {
            _id: name,
            GPA: [GPA],
            grade: selectedGrade,
            time: [Time]
          }
        })
        console.log("Created");
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
    //console.log(this.data.array[0].level);
    var that = this;
    this.setData({
      subjects: defaultPresets[0]
    })
    console.log(this.data.subjects);
    for (var i = 0; i < this.data.subjects.length; i++) {
      //var TempList = settingList[i].split("@");//Decode CreditList
      GPACs.push(new Unit(this.data.subjects[i].subjectName, this.data.subjects[i].credit, this.data.subjects[i].type));
    }

    console.log("Running OnLoad...")
    
    wx.cloud.callFunction({
      name: 'presetCloud'
    })
      .then(res => {
        Presets = res.result.data;
        that.search();
      })
      .catch(console.error)

    console.log("Run Complete.")

    

  },

  search: function () {
    console.log("Running Search...")
    var that = this;
    var nickName = '';

    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        nickName = userInfo.nickName.replace(/\s*/g, "")
        //console.log(nickName); 
        for (var count = 0; count < Presets.length; count++) {
          if (nickName == Presets[count].Name) {
            presetListname = that.data.presetListname;
            presetListname.push(Presets[count].Presetname);
            grade.push(Presets[count].Presetgrade);
            //console.log(Presets[count].Presetgrade);
            defaultPresets.push(Presets[count].subjects);
            that.setData({
              presetListname: presetListname
            })
            console.log("Success");
            console.log(grade);
          }
        }
      },
      fail: function (res) {
      console.log("Running Offline Mode...");
      }
    })
    console.log("Run Complete.")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  showShareMenu() {

    wx.showShareMenu();

    //console.log("显示了当前页面的转发按钮");

  },
  onPullDownRefresh: function () {
    console.log("Yay");
    this.onLoad()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'Wow! My GPA is ' + finalGPA,
      path: '/pages/index/index?',
      //imageUrl: "/images/1.jpg"
    }
  }
})