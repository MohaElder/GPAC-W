import GPAC from '../../utils/GPAC';

const db = wx.cloud.database()
const userSearcher = db.collection('UserGPA')
var pScore = [];
var pLevel = [];
var GPACs = [];
var subjectList= ["Math", "Eng", "Chi", "Phy/Chem", "SubE", "SubF", "SubG"];
var level =  ['S', 'S+', 'H', 'H+', 'AP'];

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    //imagelist: ['https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/a.png?sign=c7b448418df2aecd04952a7368b0c6da&t=1537967612'],
    SubjectList: ["Math", "Eng", "Chi", "Phy/Chem", "SubE", "SubF", "SubG"],//Subjects (Not used in the following code, only to make the data readable)
    level: ['S', 'S+', 'H', 'H+', 'AP'],
    CreditList: ["5.5@0", "5.5@1", "3.0@1", "4.0@0", "4.0@0", "4.0@0", "4.0@0"],//Subjects'credit and the mark of whether it is language or nonlanguage. 1 = Language, 0 = NonLanguage
    NLAPList: [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5], //Credits for Language AP IN ORDER
    NLHPLUSList: [0, 2.25, 2.65, 2.95, 3.25, 3.55, 3.85, 4.15],
    NLHList: [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3], //Credits for NonLanguage H IN ORDER
    NLSPLUSList: [0, 2.25, 2.65, 2.95, 3.25, 3.55, 3.85, 4.15], //Credits for NonLanguage S+ IN ORDER
    NLSList: [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0], //Credits for NonLanguage S IN ORDER
    LAPList: [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5], //Credits for Language AP IN ORDER
    LHPLUSList: [0, 2.5, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4], //Credits for Language H+ IN ORDER
    LHList: [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3], //Credits for Language H IN ORDER
    LSPLUSList: [0, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1], //Credits for Language S+ IN ORDER
    LSList: [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0], //Credits for Language S IN ORDER
    /**
     * If you change the part below, there might be problems
     */
    FinalGPA: '',
    UserInfo: '',
    UserGPA: 0,
    SubAindex: 0,
    SubBindex: 0,
    SubCindex: 0,
    SubDindex: 0,
    SubEindex: 0,
    SubFindex: 0,
    SubGindex: 0,
    
  },
  //previewImage: function (e){
  //  wx.scanCode({
   //   success: () => {
   //   this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path; that.setData({ show: this.show })
 // },
  getSubAScore: function (e) {
    GPACs[0].setScore(e.detail.value);
  },

  getSubALevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    GPACs[0].setLevel(level[e.detail.value]);
    //console.log(GPACs[0].getLevel());
    var formatter = "pLevel[" + 0 + "]";
    this.setData({
      SubAindex: e.detail.value,//显示前端level 
    })
    //console.log(this.data.pLevel[0])

  },

  getSubBScore: function (e) {
    GPACs[1].setScore(e.detail.value);
  },
  getSubBLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    GPACs[1].setLevel(level[e.detail.value]);
    var formatter = "pLevel[" + 1 + "]";
    this.setData({
      SubBindex: e.detail.value,//显示前端level  
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubCScore: function (e) {
    GPACs[2].setScore(e.detail.value);
  },
  getSubCLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    GPACs[2].setLevel(level[e.detail.value]);
    this.setData({
      SubCindex: e.detail.value,//显示前端level
      
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubDScore: function (e) {
    GPACs[3].setScore(e.detail.value);
  },
  getSubDLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    GPACs[3].setLevel(level[e.detail.value]);

    this.setData({
      SubDindex: e.detail.value,//显示前端level
      
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubEScore: function (e) {
    GPACs[4].setScore(e.detail.value);
  },
  getSubELevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    GPACs[4].setLevel(level[e.detail.value]);
    var formatter = "pLevel[" + 4 + "]";
    this.setData({
      SubEindex: e.detail.value,//显示前端level
     
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubFScore: function (e) {
    GPACs[5].setScore(e.detail.value);
  },
  getSubFLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    GPACs[5].setLevel(level[e.detail.value]);
    this.setData({
     SubFindex: e.detail.value,//显示前端level
     
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

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
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  
  userInfo: function (e) {
    var that = this;
    var name = e.detail.userInfo.nickName.replace(/\s*/g, "");
    that.Submit(name);
    
    //console.log(this.data.UserInfo);
    //console.log('A')
    
  },
  //StartUp Function 
  Submit: function (name) {


    //console.log(this.data.UserGPA)
    //console.log("Your GPA is " + GPAFinal + "," + rank);
    //console.log(this.data.SubAScore)
    //console.log(this.data.SubALevel)


  },

  //Data Importation Function
  getGpa:function (count){
    var that = this;
    var subScore = pScore[count];//Import Score
    var subLevel = this.data.pLevel[count];//Import Level
    var TempList = this.data.CreditList[count].split("@");//Decode CreditList
    var Credit = parseFloat(TempList[0]);//Import Credit
    var Validator = parseInt(TempList[1]);//Import Class Validator
    //console.log(subScore,subLevel,Credit,Validator)
    if(Validator == 1)//Validate the type of the subject
{ return Credit * that.getL(subLevel, subScore); }
    else
{ return Credit * that.getNL(subLevel, subScore); }      
},

  //Subject Categorization Functions
  getNL: function (Level, Score) {
    //console.log(Level);
    var that = this;
    var calLevel;
    if (Level == "AP") {
      calLevel = this.data.NLAPList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "H+") {
      calLevel = this.data.NLHPLUSList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "H") {
      calLevel = this.data.NLHList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "S+"){
      calLevel = this.data.NLSPLUSList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "S"){
      calLevel = this.data.NLSList
      return that.calGPA(Score, calLevel); 
    }
    },

  getL: function (Level, Score) {
    //console.log(Level + Score);
    var calLevel
    var that = this
    if (Level == "AP") {
      calLevel = this.data.LAPList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "H+") {
      calLevel = this.data.LHPLUSList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "H"){
      calLevel = this.data.LHList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "S+"){
      calLevel = this.data.LSPLUSList
      return that.calGPA(Score, calLevel);
  }
    if (Level == "S"){
      calLevel = this.data.LSList
      return that.calGPA(Score, calLevel);
    }
  },

  calGPA: function(Score,calLevel){
    //console.log(list);
    //console.log(listname);
    //console.log(this.data.[listname])czcscszczdccscz
    var gpa = 0;
    //console.log("AP",Score)
    if (Score <= 59)
      gpa = calLevel[0];
    if (Score > 59 && Score <= 67)
      gpa = calLevel[1];
    if (Score > 67 && Score <= 72)
      gpa = calLevel[2];
    if (Score > 72 && Score <= 77)
      gpa = calLevel[3];
    if (Score > 77 && Score <= 82)
      gpa = calLevel[4];
    if (Score > 82 && Score <= 87)
      gpa = calLevel[5];
    if (Score > 87 && Score <= 92)
      gpa = calLevel[6];
    if (Score > 92 && Score <= 100)
      gpa = calLevel[7];
    //console.log(gpa)
    return gpa;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < subjectList.length; i++){
      GPACs.push(new GPAC());
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