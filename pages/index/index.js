//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  To8:function(){
  wx.navigateTo({
  url: '/pages/8th/8th?',
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
  },
  To9: function () {
    wx.navigateTo({
      url: '/pages/9th/9th?',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  To10: function () {
    wx.navigateTo({
      url: '/pages/10th/10th?',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  To11: function () {
    wx.navigateTo({
      url: '/pages/11th/11th?',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  Torank: function () {
    wx.navigateTo({
      url: '/pages/rank/rank?',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  ToIB: function () {
    wx.navigateTo({
      url: '/pages/IB/IB?',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  ToAgreement: function () {
    wx.navigateTo({
      url: '/pages/Agreement/Agreement?',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  ToDonation: function () {
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?accountId=5655567'
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
      }

})
