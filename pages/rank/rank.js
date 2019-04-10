// rank.js
import * as echarts from '../../ec-canvas/echarts';
import * as ecStat from '../../ec-canvas/ec-stat';
import WxCanvas from '../../ec-canvas/wx-canvas';

//const util = require('../../utils/util.js');
const db = wx.cloud.database();
const userSearcher = db.collection('UserGPA');
const app = getApp();

var ePeople = [];
var nPeople = [];
var tPeople = [];
var elePeople = [];

var people = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    Name: 'Please Wait',
    Rank: 0,
    GPA: 0,
    Defeat: 0,
    Population: 0,
    Grade: 0,
    RankPic: '',//need to change this pic in the future
    RankName: 'Please Wait',
    finalGPA: [],
    ec: {
      lazyLoad: true
    },
    q1: 0,
    q3: 0,
    mean: 0,
    sd: 0
  },
  deleteWarn: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: 'Info',
      content: ("So, you wanna delete this record?"),
      confirmText: "Yes",
      cancelText: "No",
      success: function (res) {
        if (res.confirm) {
          that.deleteTime(index);
        }
        else if (res.cancel) {
        }
      }
    });
  },
  deleteTime: function(index){
    //console.log(index);
    var that = this;
    var newList = this.data.historyList;
    newList.time.splice(index,1);
    newList.gpas.splice(index, 1);
    //console.log(newList);
    that.setData({
      historyList:newList
    })
    that.Upload(this.data.historyList.name);
  },
  Upload: function (name) {
    const _ = db.command;
    var that = this;
    var newList = that.data.historyList
    db.collection('UserGPA').doc(name).get({//建立或者更新数据库信息
      success: function (res) {
        db.collection('UserGPA').doc(name).update({
          // data 传入需要局部更新的数据
          data: {
            time: newList.time,
            GPA:newList.gpas
          }
        })
        // res.data 包含该记录的数据
      }
    })
  },

  donation: function(){
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path:'pages/apps/largess/detail?id=McWzLEbvB78%3D'
    })
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
        for (var count = 0; count < res.result.data.length; count++) {
          people.push({
              name: res.result.data[count]._id,
              gpas: res.result.data[count].GPA,
              gpa: (Number)(res.result.data[count].GPA[0]).toFixed(2),
              grade: res.result.data[count].grade,
              time: res.result.data[count].time
            });
        }
        //console.log(people);
        that.categorize();
        that.search();
      })
      .catch(console.error)
    console.log("Run Complete.")
  },

  categorize: function() {
    console.log("Running categorize...")
    var that = this;
    //console.log(rawGrade);

    for (var count = 0; count < people.length; count++) {
      if (people[count].grade == 8) {
       ePeople.push(people[count]);
      }
      if (people[count].grade == 9) {
        nPeople.push(people[count]);
      }
      if (people[count].grade == 10) {
        tPeople.push(people[count]);
      }
      if (people[count].grade == 11) {
        elePeople.push(people[count]);
      }
    }
    console.log("Run Complete.")
  },

  sort: function() {
    console.log("Running sort...")
    var that = this;
    var Max = 0;
    var peopleTemp = [];
    for (var i = 0; i < people.length-1; i++) {
      Max = i;
      for (var j = i; j < people.length; j++) {
        if ((Number(people[j].gpa)) > (Number(people[Max].gpa))) {
          Max = j;
        }
      }
      peopleTemp = people[i];
      people[i] = people[Max];
      people[Max] = peopleTemp;
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
        for (var count = 0; count < people.length; count++) {
          if (nickName == people[count].name) {
            that.syncAll(people[count].grade, nickName);
          }
        }
      }
    })
    console.log("Run Complete.")
  },

  syncAll: function(userGrade, name) {
    var that = this;
    console.log("Running syncAll...")
    //console.log(userGrade);

    if (userGrade == 8) {
      people = ePeople;
    }
    if (userGrade == 9) {
      people = nPeople;
    }
    if (userGrade == 10) {
      people = tPeople;
    }
    if (userGrade == 11) {
      people = elePeople;
    }
    that.sort();
console.log(people);
  var gpaList = [];
    for (var count = 0; count < people.length; count++) {
      if (name == people[count].name) {
        that.setData({
          historyList: people[count],
          Name: people[count].name,
          Grade: people[count].grade,
          Rank: count,
          GPA: people[count].gpa,
          Defeat: Number.parseInt(100 - (count / people.length) * 100),
          Population: people.length
        })
        that.rankPic(Number.parseInt((count / people.length) * 100));
        for (var innerCount = 0; innerCount < people.length; innerCount++) {
          if (people[innerCount].gpa != "NaN"){
            gpaList.push((Number((people[innerCount].gpa))));
          }
          
        }
        that.initChart(gpaList);
        that.stat(gpaList);
      }
    }
    console.log("Run Complete.")
  },

  stat: function(gpaList) {
    var that = this;
    that.setData({
      mean: ecStat.statistics.mean(gpaList),
      q1: ecStat.statistics.quantile(gpaList, 0.25),
      q3: ecStat.statistics.quantile(gpaList, 0.75),
      sd: ecStat.statistics.deviation(gpaList)
    })
    
  },
  rankPic: function(ranking) {
    console.log("Running rankPic...")
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
        barWidth: '50%',
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
    return {
      title: 'Wow! My GPA is ' + app.globalData.gpa,
      path: '/pages/index/index?',
      //imageUrl: "/images/1.jpg"
    }
  },
  onPullDownRefresh: function () {
    console.log("Yay");
    this.onLoad()
  }
})