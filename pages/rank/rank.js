// rank.js
const db = wx.cloud.database()
const userSearcher = db.collection('UserGPA')
var Max = 0
var Temp = 0
var Place = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    A:'Anzhi',
    userOpenId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
        Max = GPAList[0];
        for (var i = 0; i < GPAList.length; i++){
         for (var j = i; j < GPAList.length; j++){
            if(GPAList[j] > Max){
              Temp = Max;
              Max = GPAList[j];
              //Place = count;
              Place = j;
            }

        }
        GPAList[Place] = Temp;
        GPAList[i] = Max;
      }
        for (var count = 0; count < GPAList.length; count++) {
          console.log(GPAList[count]);

        }
      })
      .catch(console.error)
   
    

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