import { Unit, Result } from '../../utils/GPAC';

const db = wx.cloud.database()
const userSearcher = db.collection('UserGPA')
var GPACs = [];
var level =  [];
var settingList = ["Math@5.5@0", "Eng@5.5@1", "Chi@3.0@1", "Phy/Chem@4.0@0", "SubE@4.0@0", "SubF@4.0@0", "SubG@4.0@0"];//Subject's Name, Subjects'credit and the mark of whether it is language or nonlanguage. 1 = Language, 0 = NonLanguage

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    level: ['S', 'S+', 'H', 'H+', 'AP'],

    /**
     * If you change the part below, there might be problems
     */
    FinalGPA: '',
    SubAindex: 0,
    SubBindex: 0,
    SubCindex: 0,
    SubDindex: 0,
    SubEindex: 0,
    SubFindex: 0,
    SubGindex: 0,
  },

  getSubAScore: function (e) {
    GPACs[0].setScore(e.detail.value);
  },

  getSubALevel: function (e) {
    GPACs[0].setLevel(level[e.detail.value]);
    this.setData({
      SubAindex: e.detail.value,//显示前端level 
    })

  },

  getSubBScore: function (e) {
    GPACs[1].setScore(e.detail.value);
  },
  getSubBLevel: function (e) {
    GPACs[1].setLevel(level[e.detail.value]);
    this.setData({
      SubBindex: e.detail.value,//显示前端level  
    })

  },

  getSubCScore: function (e) {
    GPACs[2].setScore(e.detail.value);
  },
  getSubCLevel: function (e) {
    GPACs[2].setLevel(level[e.detail.value]);
    this.setData({
      SubCindex: e.detail.value,//显示前端level
      
    })

  },

  getSubDScore: function (e) {
    GPACs[3].setScore(e.detail.value);
  },
  getSubDLevel: function (e) {
    GPACs[3].setLevel(level[e.detail.value]);

    this.setData({
      SubDindex: e.detail.value,//显示前端level
      
    })

  },

  getSubEScore: function (e) {
    GPACs[4].setScore(e.detail.value);
  },
  getSubELevel: function (e) {
    GPACs[4].setLevel(level[e.detail.value]);
    this.setData({
      SubEindex: e.detail.value,//显示前端level
     
    })

  },

  getSubFScore: function (e) {
    GPACs[5].setScore(e.detail.value);
  },
  getSubFLevel: function (e) {
    GPACs[5].setLevel(level[e.detail.value]);
    this.setData({
     SubFindex: e.detail.value,//显示前端level
     
    })
  },

  getSubGScore: function (e) {
    GPACs[6].setScore(e.detail.value);
  },
  getSubGLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    GPACs[6].setLevel(level[e.detail.value]);
    this.setData({
      SubGindex: e.detail.value,//显示前端level

    })

  },

  
  userInfo: function (e) {
    var that = this;
    var name = e.detail.userInfo.nickName.replace(/\s*/g, "");
    that.Submit(name);
    
  },
  //StartUp Function 
  Submit: function (name) {
    const _ = db.command;
    var total = 0;
    var that = this;
    var gpaFinal = new Result(GPACs);
    
    //Present GPA
    wx.showModal({
      title: 'Result',
      content: ("Your GPA is " + gpaFinal.getGPA() + "," + gpaFinal.getRank()),
      confirmText: "Confirm",
      cancelText: "OK"
    });
    that.setData({
      FinalGPA: gpaFinal.getGPA()
    })

    db.collection('UserGPA').doc(name).get({//建立或者更新数据库信息
      success: function (res) {
        db.collection('UserGPA').doc(name).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            GPA: goaFinal.getGPA(),
            grade: 11
          },
          success: function (res) {
          }
        })
        // res.data 包含该记录的数据
        console.log("Update");
      },
      fail: function () {
        db.collection('UserGPA').add({
          data: {
            _id: name,
            GPA: gpaFInal.getGPA(),
            grade: 11
          }
        })
        console.log("Created");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < settingList.length; i++){
      level.push(this.data.level[i]);
      var TempList = settingList[i].split("@");//Decode CreditList
      GPACs.push(new Unit(TempList[0],TempList[1],TempList[2]));
    }
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //console.log(this.data.FinalGPA)
    return { 
      title: 'Wow! My GPA is ' + this.data.FinalGPA, 
      path: '/pages/index/index?',
      //imageUrl: "/images/1.jpg"
  }
  }
})