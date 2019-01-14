import { Unit, Result } from '../../utils/GPAC';

const db = wx.cloud.database()
const userSearcher = db.collection('UserGPA')
var GPACs = [];
var Presets = [];
var presetListname = [];
var Gradelist = [8,9,10,11,11];
var grade;
//Default Presets
var eighthGrade = [
  {
  subjectName: 'Math',
  level: ['S', 'S+', 'H'],
  selectedValue: 0,
  credit: 7.5,
  type: 0 //1 = Language, 0 = NonLanguage
  }, 
  {
    subjectName: 'English',
    level: ['S', 'S+', 'H', 'H+'],
    selectedValue: 0,
    credit: 7.5,
    type: 1 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Chinese',
    level: ['S','H'],
    selectedValue: 0,
    credit: 5.0,
    type: 1 //1 = Language, 0 = NonLanguage
  }, 
  {
    subjectName: 'Physics',
    level: ['S','H'],
    selectedValue: 0,
    credit: 3.5,
    type: 0 //1 = Language, 0 = NonLanguage
  }, 
  {
    subjectName: 'Biology',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 3.0,
    type: 0 //1 = Language, 0 = NonLanguage
  }, 
  {
    subjectName: 'History',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 2.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Geography',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 2.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  ];

var ninethGrade = [
  {
    subjectName: 'Math',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 6.5,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'English',
    level: ['S', 'S+', 'H', 'H+'],
    selectedValue: 0,
    credit: 6.5,
    type: 1 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Chinese',
    level: ['S','H'],
    selectedValue: 0,
    credit: 3.0,
    type: 1 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Physics',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 4.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Chemistry',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 3.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'History',
    level: ['S', 'H'],
    selectedValue: 0,
    credit: 4.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Elective',
    level: ['S', 'S+', 'H', 'H+', 'AP'],
    selectedValue: 0,
    credit: 2.5,
    type: 0 //1 = Language, 0 = NonLanguage
  },
 ];

var tenthGrade = [
  {
    subjectName: 'Math',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 5.5,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'English',
    level: ['S', 'S+', 'H', 'H+'],
    selectedValue: 0,
    credit: 5.5,
    type: 1 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Chinese',
    level: ['S','H', 'H+', 'AP'],
    selectedValue: 0,
    credit: 3.0,
    type: 1 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Physics',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 3.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Chemistry',
    level: ['S', 'S+', 'H'],
    selectedValue: 0,
    credit: 3.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'History',
    level: ['S', 'S+', 'H', 'AP'],
    selectedValue: 0,
    credit: 4.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Elective1',
    level: ['S', 'H'],
    selectedValue: 0,
    credit: 3.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Elective2',
    level: ['S', 'H'],
    selectedValue: 0,
    credit: 3.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
 ];

var elethGrade = [
  {
    subjectName: 'Math',
    level: ['S', 'H', 'AP'],
    selectedValue: 0,
    credit: 5.5,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'English',
    level: ['S', 'S+', 'H', 'AP'],
    selectedValue: 0,
    credit: 5.5,
    type: 1 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Chinese',
    level: ['S', 'H', 'H+'],
    selectedValue: 0,
    credit: 3.0,
    type: 1 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Subject D',
    level: ['S', 'S+', 'H', 'H+', 'AP'],
    selectedValue: 0,
    credit: 4.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Subject E',
    level: ['S', 'S+', 'H', 'H+', 'AP'],
    selectedValue: 0,
    credit: 4.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Subject F',
    level: ['S', 'S+', 'H', 'H+', 'AP'],
    selectedValue: 0,
    credit: 4.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: 'Subject G',
    level: ['S', 'S+', 'H', 'H+', 'AP'],
    selectedValue: 0,
    credit: 4.0,
    type: 0 //1 = Language, 0 = NonLanguage
  }
 ];

var ib =[
  {
    subjectName: "TOK",
    level: ['IB'],
    selectedValue: 0,
    credit: 3.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: "SubA",
    level: ['IB'],
    selectedValue: 0,
    credit: 6.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: "SubB",
    level: ['IB'],
    selectedValue: 0,
    credit: 6.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: "SubC",
    level: ['IB'],
    selectedValue: 0,
    credit: 6.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: "SubD",
    level: ['IB'],
    selectedValue: 0,
    credit: 6.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: "SubE",
    level: ['IB'],
    selectedValue: 0,
    credit: 6.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
  {
    subjectName: "SubF",
    level: ['IB'],
    selectedValue: 0,
    credit: 6.0,
    type: 0 //1 = Language, 0 = NonLanguage
  },
 ];

var defaultPresets = [eighthGrade, ninethGrade, tenthGrade, elethGrade, ib];

//console.log(defaultPresets)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    announcement: "Change Preset 👆",
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
    ],
    
    /**
     * If you change the part below, there might be problems
     */
    finalGPA: '',
  },

  changePreset: function(e){
    //console.log(this.data.presetList[e.detail.value]);
    this.setData({
      subjects: defaultPresets[e.detail.value],
      presetIndex: e.detail.value//显示前端level 
    })
    GPACs = [];
    grade = Gradelist[e.detail.value];
    console.log(grade);
    for (var i = 0; i < defaultPresets[e.detail.value].length; i++) {
      //var TempList = settingList[i].split("@");//Decode CreditList
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
      finalGPA: gpaFinal.getGPA()
    })

    db.collection('UserGPA').doc(name).get({//建立或者更新数据库信息
      success: function (res) {
        db.collection('UserGPA').doc(name).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            GPA: gpaFinal.getGPA(),
            grade: grade
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
            GPA: gpaFinal.getGPA(),
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
    //console.log(this.data.array[0].level);

      this.setData({
        subjects:eighthGrade
      })
    for (var i = 0; i < this.data.subjects.length; i++) {
      //var TempList = settingList[i].split("@");//Decode CreditList
      GPACs.push(new Unit(this.data.subjects[i].name, this.data.subjects[i].credit, this.data.subjects[i].type));
    }

    console.log("Running OnLoad...")
    var that = this;
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
            Gradelist.push(Presets[count].Presetgrade);
            //console.log(Presets[count].Presetgrade);
            defaultPresets.push(Presets[count].subjects);
            that.setData({
              presetListname: presetListname
            })
            console.log("Success");
            console.log(Gradelist);
          }
        }
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //console.log(this.data.finalGPA)
    return {
      title: 'Wow! My GPA is ' + this.data.finalGPA,
      path: '/pages/index/index?',
      //imageUrl: "/images/1.jpg"
    }
  }
})