// rank.js
const db = wx.cloud.database();
const userSearcher = db.collection('UserGPA');
var Max = 0;
var GPATemp = 0;
var Place = 0;
var NameTemp = 0;
var nickName = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Name: 'Please Wait',
    Rank: 0,
    GPA: 0,
    Defeat: 0,
    Population:0,
    RankPic:'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/loading.png?sign=2e217944ae56ea6abaac195707c5455c&t=1542199997',
    RankName:'Please Wait',
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
        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo;
            nickName = userInfo.nickName.replace(/\s*/g, "")
            //console.log(nickName); 
            for (var count = 0; count <= GPAList.length; count++) {
              if (nickName == NameList[count]) {
                
                that.setData({
                  Name: NameList[count],//显示前端level
                  Rank: count,
                  GPA: GPAList[count],
                  Defeat: Number.parseInt(100-(count/GPAList.length)*100),
                  Population:GPAList.length
                })

                
              }
            }
            var ranking = that.data.Rank;
            //console.log(ranking);
            if (ranking <= 20)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/dia.png?sign=d097da9786f77ca9bb7b6e6dbbbd8930&t=1542198375',
                RankName: 'Diamond'
              });
            if (ranking <= 40 && ranking > 20)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/plat1.png?sign=308e7a878c7cb58f4523010874052c70&t=1542198719',
                RankName: 'Platinum I'
              });
            if (ranking <= 60 && ranking > 40)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/plat2.png?sign=289508b44c055fa7018602f5bcaf3c80&t=1542198731',
                RankName: 'Platinum II'
              });
            if (ranking <= 80 && ranking > 60)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/plat3.png?sign=e2ad03cb8464c0183c3bb2a70aed5d8e&t=1542198757',
                RankName: 'Platinum III'
              });
            if (ranking <= 100 && ranking > 80)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/gold1.png?sign=9775ed72e8f7b25fe785f5f31c975f75&t=1542198781',
                RankName: 'Gold I'
              });
            if (ranking <= 120 && ranking > 100)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/gold2.png?sign=dc8cd501ff2c7bc2a754f19a8ce55ca6&t=1542198807',
                RankName: 'Gold II'
              });
            if (ranking <= 140 && ranking > 120)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/gold3.png?sign=a4de58ea74f6588a4aed9e474d275f78&t=1542198819',
                RankName: 'Gold III'
              });
            if (ranking <= 160 && ranking > 140)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/gold4.png?sign=7b2f2dc7eab73a474812f858e9e8b0e9&t=1542198840',
                RankName: 'Gold IV'
              });
            if (ranking <= 180 && ranking > 160)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/silver1.png?sign=5ee4ee363e956610836c24d5780d365d&t=1542198858',
                RankName: 'Silver I'
              });
            if (ranking <= 200 && ranking > 180)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/silver2.png?sign=2d93865bac9d4d3cdc311fa962cca28b&t=1542198874',
                RankName: 'Silver II'
              });
            if (ranking <= 220 && ranking > 200)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/silver3.png?sign=99c8b4bb63e2531167ddd14c0e196272&t=1542198914',
                RankName: 'Silver III'
              });
            if (ranking <= 240 && ranking > 220)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/silver4.png?sign=6700c9965c583640621ca2bf4ae76326&t=1542198931',
                RankName: 'Silver IV'
              });
            if (ranking <= 280 && ranking > 240)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/bronze1.png?sign=7c72ae7158bec68d3315c386be295eab&t=1542198951',
                RankName: 'Bronze I'
              });
            if (ranking <= 300 && ranking > 280)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/bronze2.png?sign=2ba8a4b21f554db02f2e4524ee5fd911&t=1542198967',
                RankName: 'Bronze II'
              });
            if (ranking <= 320 && ranking > 300)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/bronze4.png?sign=8905e614f06df44f45214d0e40e1c7da&t=1542198982',
                RankName: 'Bronze III'
              });
            if (ranking <= 340 && ranking > 320)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/bronze4.png?sign=f69663e3aff684e1d23ef289a07e62ae&t=1542202915',
                RankName: 'Bronze IV'
              });
            if (ranking <= 360 && ranking > 340)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/copper2.png?sign=11513cbd38d47ab02dfd8765f2c097e5&t=1542199025',
                RankName: 'Copper I'
              });
            if (ranking > 360)
              that.setData({
                RankPic: 'https://6770-gpacw-069de7-1257702765.tcb.qcloud.la/ranks/copper3.png?sign=18e4b43015c4e3ae1534163f5c4677ff&t=1542199042',
                RankName: 'Copper II'
              });
            //console.log(that.data.Rank);
           

              console.log(that.data.RankPic);

          }
          
        })
        
        
        
        

        

        
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