// rank.js

import * as echarts from '../../ec-canvas/echarts';
import * as ecStat from '../../ec-canvas/ec-stat';
import WxCanvas from '../../ec-canvas/wx-canvas';

const db = wx.cloud.database();
const userSearcher = db.collection('UserGPA');
const app = getApp();

 /* function setOption(chart) {
  const option = {
    color: ['rgb(25, 183, 207)'],
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'value',
      //这个一定要设，不然barWidth和bins对应不上
      scale: true,
    }],
    yAxis: [{
      type: 'value',
    }],
    series: [{
      type: 'bar',
      barWidth: '99.3%',
      label: {
        normal: {
          show: true,
          position: 'insideTop',
          formatter: function (params) {
            return params.value[1];
          }
        }
      },
      data: Page.data.GPAs
    }]
  };
  chart.setOption(option);
} */


Page({

  /**
   * 页面的初始数据
   */
  data: {
    Name: 'Please Wait',
    Rank: 0,
    GPA: 0,
    Defeat: 0,
    Population: 0,
    RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/loading.png?sign=2e217944ae56ea6abaac195707c5455c&t=1542199997',
    RankName: 'Please Wait',
    ec: {
      lazyLoad: true
    },
    isLoaded: false,  
    isDisposed: false,
    GPAs: [],
    Names:[]
  },
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.cloud.callFunction({
        name: 'rankCloud'
      })
      .then(res => {
        var GPAList = new Array(res.result.data.length);
        var NameList = new Array(res.result.data.length);
        for (var count = 0; count < res.result.data.length; count++) {
          GPAList[count] = res.result.data[count].GPA;
          NameList[count] = res.result.data[count]._id;
          //console.log(res.result.data[count].GPA);
          //console.log(res.result.data[count]._id);
        }
        that.setData({
          GPAs: GPAList,
          Names:NameList
        })
        //console.log(that.data.GPAs);
        //console.log(that.data.Names);
        that.sort();
        that.search();
        //console.log(ranking);

        //console.log(that.data.Rank);
        //console.log(that.data.RankPic);
                  //var height = [70, 65, 63, 72, 81, 83, 66, 75, 80, 75, 79, 76, 76, 69, 75, 74, 85, 86, 71, 64, 78, 80, 74, 72, 77, 81, 82, 80, 80, 80, 87];
        //var bins = ecStat.histogram(that.data.GPAs);
        //that.initChart();

      })
      .catch(console.error)
  },
  sort:function(){
    var that = this;
    var GPAList = that.data.GPAs;
    var NameList = that.data.Names;
    var Max = GPAList[0];
    var GPATemp = 0;
    var Place = 0;
    var NameTemp = 0;
    //height = GPAList;

    for (var i = 0; i < GPAList.length; i++) {
      for (var j = i; j < GPAList.length; j++) {
        if (GPAList[j] > Max) {
          Max = GPAList[j];
          Place = j;
        }

      }

      GPATemp = GPAList[i];
      NameTemp = NameList[i];
      GPAList[i] = GPAList[Place];
      NameList[i] = NameList[Place];
      GPAList[Place] = GPATemp;
      NameList[Place] = NameTemp;
      Max = GPAList[i + 1];

      that.setData({
        GPAs: GPAList,
        Names:NameList
      })
    }
  },
  search:function(){
    var that = this;
    var GPAList = that.data.GPAs;
    var NameList = that.data.Names;
    var nickName = '';

    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        nickName = userInfo.nickName.replace(/\s*/g, "")
        //console.log(nickName); 
        for (var count = 0; count <= GPAList.length; count++) {
          if (nickName == NameList[count]) {
            that.setData({
              Name: NameList[count], //显示前端level
              Rank: count,
              GPA: GPAList[count],
              Defeat: Number.parseInt(100 - (count / GPAList.length) * 100),
              Population: GPAList.length
            })
            that.rankPic(Number.parseInt((count / GPAList.length) * 100));
          }
        }
      }
    })
  },
  rankPic: function(ranking) {
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
  },

  initChart: function() {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart);
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  }, 
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})