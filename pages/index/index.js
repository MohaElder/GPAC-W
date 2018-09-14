//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.getUserInfo({
    success: function(res) {
      console.log(res);
      var avatarUrl = 'userInfo.avatarUrl';
      var nickName = 'userInfo.nickName';
      that.setData({
        [avatarUrl]: res.userInfo.avatarUrl,
        [nickName]: res.userInfo.nickName,
      })
    }

    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
