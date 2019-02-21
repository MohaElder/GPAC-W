// rank.js
import * as echarts from '../../ec-canvas/echarts';
import * as ecStat from '../../ec-canvas/ec-stat';
import WxCanvas from '../../ec-canvas/wx-canvas';

//const util = require('../../utils/util.js');
const db = wx.cloud.database();
const userSearcher = db.collection('UserGPA');
const app = getApp();
var EGPAs, NGPAs, TGPAs, ELEGPAs = [];
var ENames, NNames, TNames, ELENames = [];
var GPAs = [];
var Names = [];
var Grades= [];

//var Time = util.formatTime(new Date());

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [
      {
        time: 0,
        courseName: "DataStructure",
        courseGrade: 100,
      },
      {
        time: "22:20",
        courseName: "DataStructure",
        courseGrade: 100,
      },
      {
        time: "22:20",
        courseName: "DataStructure",
        courseGrade: 100,
      },
      {
        time: "22:20",
        courseName: "DataStructure",
        courseGrade: 100,
      },
      {
        time: "22:20",
        courseName: "DataStructure",
        courseGrade: 100,
      }
    ],
    Name: 'Please Wait',
    Rank: 0,
    GPA: 0,
    Defeat: 0,
    Population: 0,
    Grade: 0,
    RankPic: 'cloud://gpacw-069de7.6770-gpacw-069de7/timg (2).gif',//need to change this pic in the future
    RankName: 'Please Wait',
    finalGPA: [],
    ec: {
      lazyLoad: true
    },
  },
  onReady: function() {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-move-bar');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("Running OnLoad...")
    var that = this;
    wx.cloud.callFunction({
        name: 'rankCloud'
      })
      .then(res => {
        var GPAList = new Array(res.result.data.length);
        var NameList = new Array(res.result.data.length);
        var GradeList = new Array(res.result.data.length);
  
        for (var count = 0; count < res.result.data.length; count++) {
          GPAList[count] = Number(res.result.data[count].GPA).toFixed(2);
          NameList[count] = res.result.data[count]._id;
          GradeList[count] = res.result.data[count].grade;
        }

        GPAs = GPAList;
        Names = NameList;
        Grades = GradeList;

        that.sort();
        that.categorize();
        that.search();

      })
      .catch(console.error)
    console.log("Run Complete.")
  },

  categorize: function() {
    console.log("Running categorize...")
    var that = this;
    var rawGPA = GPAs;
    var rawName = Names;
    var rawGrade = Grades;
    //console.log(rawGrade);
    var EGpa = [];
    var NGpa = [];
    var TGpa = [];
    var ELEGpa = [];
    var EName = [];
    var NName = [];
    var TName = [];
    var ELEName = [];

    for (var count = 0; count < rawGPA.length; count++) {
      if (rawGrade[count] == 8) {
        EGpa.push(rawGPA[count]);
        EName.push(rawName[count]);
      }
      if (rawGrade[count] == 9) {
        NGpa.push(rawGPA[count]);
        NName.push(rawName[count]);
      }
      if (rawGrade[count] == 10) {
        TGpa.push(rawGPA[count]);
        TName.push(rawName[count]);
      }
      if (rawGrade[count] == 11) {
        ELEGpa.push(rawGPA[count]);
        ELEName.push(rawName[count]);
      }
    }

    EGPAs = EGpa;
    ENames = EName;
    NGPAs = NGpa;
    NNames = NName;
    TGPAs = TGpa;
    TNames = TName;
    ELEGPAs = ELEGpa;
    ELENames = ELEName;
    console.log("Run Complete.")
  },

  sort: function() {
    console.log("Running sort...")
    var that = this;
    var Max = 0;
    var gpaTemp = 0;
    var nameTemp = 0;
    var gradeTemp = 0;
    //height = GPAList;

    for (var i = 0; i < GPAs.length-1; i++) {
      Max = i;
      for (var j = i; j < GPAs.length; j++) {
        if (GPAs[j] > GPAs[Max]) {
          Max = j;
        }
      }
      gpaTemp = GPAs[i];
      nameTemp = Names[i];
      gradeTemp = Grades[i];
      GPAs[i] = GPAs[Max];
      Names[i] = Names[Max];
      Grades[i] = Grades[Max];
      GPAs[Max] = gpaTemp;
      Names[Max] = nameTemp;
      Grades[Max] = gradeTemp;
    }

    console.log("Run Complete.")
  },

  search: function() {
    console.log("Running Search...")
    var that = this;
    var nickName = '';

    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo;
        nickName = userInfo.nickName.replace(/\s*/g, "")
        //console.log(nickName); 
        for (var count = 0; count < Names.length; count++) {
          if (nickName == Names[count]) {
            that.syncAll(Grades[count], nickName);

          }
        }
      }
    })
    console.log("Run Complete.")
  },

  syncAll: function(userGrade, Name) {
    var that = this;
    console.log("Running syncAll...")
    //console.log(userGrade);
    var userGPA = [];
    var userField = [];

    if (userGrade == 8) {
      userGPA = EGPAs;
      userField = ENames;
    }
    if (userGrade == 9) {
      userGPA = NGPAs;
      userField = NNames;
    }
    if (userGrade == 10) {
      userGPA = TGPAs;
      userField = TNames;
    }
    if (userGrade == 11) {
      userGPA = ELEGPAs;
      userField = ELENames;
      //console.log("Got it!")
      //console.log(userGPA[0]);
    }

    for (var count = 0; count < userGPA.length; count++) {
      if (Name == userField[count]) {
        that.setData({
          Name: userField[count],
          Grade: userGrade,
          Rank: count,
          GPA: userGPA[count],
          Defeat: Number.parseInt(100 - (count / userGPA.length) * 100),
          Population: userGPA.length
        })
        that.rankPic(Number.parseInt((count / userGPA.length) * 100));
        //console.log(userGPA[0]);
        //setTimeout(function(){console.log("Here we go."); that.initChart(userGPA);}, "5000");
        that.initChart(userGPA);
      }
      //console.log("Not this one.")
    }
    //console.log(this.data.finalGPA[11]);
    console.log("Run Complete.")
  },


  rankPic: function(ranking) {
    console.log("Running rankPic...")
    //console.log(ranking);
    var that = this;
    if (ranking <= 5)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/dia.png?sign=d097da9786f77ca9bb7b6e6dbbbd8930&t=1542198375',
        RankName: 'Diamond'
      });
    if (ranking <= 10 && ranking > 5)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/plat1.png?sign=308e7a878c7cb58f4523010874052c70&t=1542198719',
        RankName: 'Platinum I'
      });
    if (ranking <= 15 && ranking > 10)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/plat2.png?sign=289508b44c055fa7018602f5bcaf3c80&t=1542198731',
        RankName: 'Platinum II'
      });
    if (ranking <= 20 && ranking > 15)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/plat3.png?sign=e2ad03cb8464c0183c3bb2a70aed5d8e&t=1542198757',
        RankName: 'Platinum III'
      });
    if (ranking <= 25 && ranking > 20)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/gold1.png?sign=9775ed72e8f7b25fe785f5f31c975f75&t=1542198781',
        RankName: 'Gold I'
      });
    if (ranking <= 30 && ranking > 25)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/gold2.png?sign=dc8cd501ff2c7bc2a754f19a8ce55ca6&t=1542198807',
        RankName: 'Gold II'
      });
    if (ranking <= 35 && ranking > 40)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/gold3.png?sign=a4de58ea74f6588a4aed9e474d275f78&t=1542198819',
        RankName: 'Gold III'
      });
    if (ranking <= 45 && ranking > 50)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/gold4.png?sign=7b2f2dc7eab73a474812f858e9e8b0e9&t=1542198840',
        RankName: 'Gold IV'
      });
    if (ranking <= 50 && ranking > 55)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/silver1.png?sign=5ee4ee363e956610836c24d5780d365d&t=1542198858',
        RankName: 'Silver I'
      });
    if (ranking <= 60 && ranking > 55)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/silver2.png?sign=2d93865bac9d4d3cdc311fa962cca28b&t=1542198874',
        RankName: 'Silver II'
      });
    if (ranking <= 65 && ranking > 60)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/silver3.png?sign=99c8b4bb63e2531167ddd14c0e196272&t=1542198914',
        RankName: 'Silver III'
      });
    if (ranking <= 70 && ranking > 65)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/silver4.png?sign=6700c9965c583640621ca2bf4ae76326&t=1542198931',
        RankName: 'Silver IV'
      });
    if (ranking <= 75 && ranking > 70)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/bronze1.png?sign=7c72ae7158bec68d3315c386be295eab&t=1542198951',
        RankName: 'Bronze I'
      });
    if (ranking <= 80 && ranking > 75)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/bronze2.png?sign=2ba8a4b21f554db02f2e4524ee5fd911&t=1542198967',
        RankName: 'Bronze II'
      });
    if (ranking <= 85 && ranking > 80)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/bronze4.png?sign=8905e614f06df44f45214d0e40e1c7da&t=1542198982',
        RankName: 'Bronze III'
      });
    if (ranking <= 90 && ranking > 85)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/bronze4.png?sign=f69663e3aff684e1d23ef289a07e62ae&t=1542202915',
        RankName: 'Bronze IV'
      });
    if (ranking <= 95 && ranking > 90)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/copper2.png?sign=11513cbd38d47ab02dfd8765f2c097e5&t=1542199025',
        RankName: 'Copper I'
      });
    if (ranking > 95)
      that.setData({
        RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/copper3.png?sign=18e4b43015c4e3ae1534163f5c4677ff&t=1542199042',
        RankName: 'Copper II'
      });
    console.log("Run Complete.")
  },

  initChart: function(finalGPA) {

    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOp(chart, finalGPA);
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  setOp: function(chart, finalGPA) {

    //console.log(finalGPA[0]);
    //var bins = ecStat.histogram(tempList,'scott');
    // var girth = [8.3, 8.6, 8.8, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12.0, 12.9, 12.9, 13.3, 13.7, 13.8, 14.0, 14.2, 14.5, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 20.6];

    var bins = ecStat.histogram(finalGPA); //Gotta change back to "finalGPA" after gaining a certain amount of users. GPAs
    var option = {
      title: {
        text: 'Distribution of GPA',
        left: 'center',
        top: 20
      },
      color: ['rgb(25, 183, 207)'],
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'value',
        scale: true, //这个一定要设，不然barWidth和bins对应不上
      }],
      yAxis: [{
        type: 'value',
      }],
      series: [{
        name: 'height',
        type: 'bar',
        barWidth: '70%',
        label: {
          normal: {
            show: true,
            position: 'insideTop',
            formatter: function(params) {
              return params.value[1];
            }
          }
        },
        data: bins.data
      }]
    };
    chart.setOption(option);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onPullDownRefresh: function () {
    console.log("Yay");
    this.onLoad()
  }
})