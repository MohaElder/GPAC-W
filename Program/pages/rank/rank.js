// rank.js

import * as echarts from '../../ec-canvas/echarts';
import * as ecStat from '../../ec-canvas/ec-stat';
import WxCanvas from '../../ec-canvas/wx-canvas';

const util = require('../../utils/util.js');
const db = wx.cloud.database();
const userSearcher = db.collection('UserGPA');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    user: {},
    rankPic: '',
    rankName: 'Please Wait',
    finalGPA: [],
    ec: {
      lazyLoad: true
    },
    statInfo: {
      q1: 0,
      q3: 0,
      mean: 0,
      sd: 0,
    },
    isLoaded: true
  },

  onReady: function() {
    this.ecComponent = this.selectComponent('#mychart-dom-move-bar');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: 'Loading...',
    })
    var that = this;
    var people = [];
    wx.cloud.callFunction({
        name: 'getDb',
        data: {
          dbName: "UserGPA"
        }
      })
      .then(res => {
        for (let person of res.result.data) {
          people.push({
            _openid: person._id,
            gpas: person.GPA,
            gpa: (Number)(person.GPA[person.GPA.length - 1]).toFixed(2),
            grade: person.grade,
            time: person.time
          });
        }
        that.search(people);
      })
      .catch(console.error)
  },

  search: function(people) {
    var that = this;
        for (let person of people) {
          if (app.globalData.user._openid == person._openid) {
            that.sync(person, people)
          }
        }
  },

  sort: function(people) {
    var that = this;
    var Max = 0;
    var peopleTemp = [];
    for (var i = 0; i < people.length - 1; i++) {
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
    return people;
  },

  findRank: function(ranking) {
    wx.cloud.callFunction({
        name: 'getDb',
        data: {
          dbName: "rankPics"
        }
      })
      .then(res => {
        for (let rank of res.result.data) {
          if (rank.start < ranking && rank.end >= ranking) {
            this.setData({
              rankPic: rank.url,
              rankName: rank.rankName
            })
          }
        }
      })
  },

  sync: function(user, people) {
    var that = this;
    var sameGraders = [];
    for (let person of people) {
      if (user.grade === person.grade) {
        sameGraders.push(person);
      }
    }
    sameGraders = that.sort(sameGraders);
    var gpaList = [];
    for (var count = 0; count < sameGraders.length; count++) {
      if (user._openid === sameGraders[count]._openid) {
        let user = {
          _openid: sameGraders[count]._openid,
          grade: sameGraders[count].grade,
          rank: count,
          gpa: sameGraders[count].gpa,
          defeated: Number.parseInt(100 - (count / sameGraders.length) * 100)
        };
        that.setData({
          historyList: sameGraders[count],
          user: user,
          isLoaded: true
        })
        that.findRank(Number.parseInt((count / people.length) * 100));
        for (let person of sameGraders) {
          if (person.gpa != "NaN") {
            gpaList.push((Number((person.gpa))));
          }
        }
        wx.hideLoading();
        that.initChart(gpaList);
        that.stat(gpaList);
      }
    }
  },

  stat: function(gpaList) {
    var that = this;
    let statInfo = {
      mean: ecStat.statistics.mean(gpaList),
      q1: ecStat.statistics.quantile(gpaList, 0.75),
      q3: ecStat.statistics.quantile(gpaList, 0.25),
      sd: ecStat.statistics.deviation(gpaList)
    }
    that.setData({
      statInfo: statInfo
    })
  },

  deleteWarn: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: 'Info',
      content: ("So, you wanna delete this record?"),
      confirmText: "Yes",
      cancelText: "No",
      success: function(res) {
        if (res.confirm) {
          that.deleteTime(index);
        } else if (res.cancel) {}
      }
    });
  },

  deleteTime: function(index) {
    var that = this;
    var newList = this.data.historyList;
    newList.time.splice(index, 1);
    newList.gpas.splice(index, 1);
    that.setData({
      historyList: newList
    })
    that.Upload(this.data.historyList.name);
  },

  Upload: function() {
    const _ = db.command;
    var that = this;
    var newList = that.data.historyList
        db.collection('UserGPA').doc(app.globalData.user._openid).update({
          // data 传入需要局部更新的数据
          data: {
            time: newList.time,
            GPA: newList.gpas
          }
        })
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
    })
  },

  setOp: function(chart, finalGPA) {
    var bins = ecStat.histogram(finalGPA); //Gotta change back to "finalGPA" after gaining a certain amount of users. GPAs
    var option = {
      title: {
        text: 'GPA Distribution',
        left: 'center',
        top: 20
      },
      color: ['rgb(255,45,86)'],
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
            },
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
  onShareAppMessage: function () {
    return {
      title: 'Check out your GPA',
      path: '/pages/index/index?',
      imageUrl: "/utils/logoBak.png"
    }
  },

  onShow: function() {},

  onHide: function() {}
})