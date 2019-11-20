// Program/pages/splash/splash.js
import lottie from 'lottie-miniprogram'

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
  onLoad: function(options) {
    openid = options.openid
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (this._inited) {
      return
    }
    wx.createSelectorQuery().selectAll('#canvas').node(res => {
      const canvas = res[0].node
      const context = canvas.getContext('2d')

      canvas.width = 300
      canvas.height = 300

      lottie.setup(canvas)
      this.ani = lottie.loadAnimation({
        loop: true,
        autoplay: true,
        animationData: require('../../utils/registration-animation.js'),
        rendererSettings: {
          context,
        },
      })
      this._inited = true
    }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  //用户注册
  register: function(res) {
    var that = this;
    var userInfo = res.detail.userInfo;
    db.collection('UserGPA').add({
      data: {
        _id: openid,
        GPA: [],
        time: [],
        grade: 0,
        info: userInfo
      }
    }).then(res => {
      console.log("registered")
      app.globalData.user = {
        _id: openid,
        _openid: openid,
        GPA: [],
        time: [],
        grade: 0,
        info: userInfo
      }
      wx.reLaunch({
        url: '../index/index',
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})