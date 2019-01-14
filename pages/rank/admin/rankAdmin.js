// rank.js
const db = wx.cloud.database();
const userSearcher = db.collection('UserGPA');
var Max = 0;
var GPATemp = 0;
var Place = 0;
var NameTemp = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Avatar:'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/profilepic.png?sign=fa7791764a65ac112c4a05a1e24d9b72&t=1542189212',
    items: [
              {
                    
                    "Rank": 0,
                    "Name": "The Name of the person",
                    "GPA": 666

              }
        ]

    
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
        Max = GPAList[i+1];
          
      }

        for (var count = GPAList.length; count >= 0 ; count--) {
          const length = this.data.items.length;
          this.data.items = [{ Rank: count + 1, Name: NameList[count], GPA: GPAList[count]  }].concat(this.data.items);
          this.setData({
           items: this.data.items
          })
          console.log("Name : " + NameList[count] + " GPA: " + GPAList[count] + " No:" + (count+1));
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