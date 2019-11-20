// Program/pages/splash/splash.js
const app = getApp();
const db = wx.cloud.database();

var openid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  //用户注册
  register: function (res) {
      var that = this;
      var userInfo = res.detail.userInfo;
      app.globalData.user = userInfo;
      db.collection('UserGPA').add({
        data: {
          _id: openid,
          GPA: [],
          time:[],
          info: userInfo
        }
      }).then(res =>
      {
        console.log("registered")
        wx.switchTab({
          url: '../index/index',
        })
      }
      )
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})