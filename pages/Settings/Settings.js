// pages/Settings/Settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: [
      {
        subjectName: 'Loading......',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 5.5,
        type: 1 //1 = Language, 0 = NonLanguage
      }
    ],
    level: ['S', 'S+', 'H', 'H+', 'AP'],
    levelNum: 1,
    subNum: [],
  },

  generateSubject: function(e){
    this.subNum
    this.setData({
      subNum:list
    })
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