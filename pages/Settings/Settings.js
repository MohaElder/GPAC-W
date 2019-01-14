// pages/Settings/Settings.js

const db = wx.cloud.database()
const userSearcher = db.collection('UserPreset')

Page({

  /**
   * 页面的初始数据
   */
  data: {
          
    presetName:"defaultPreset",
    presetGrade: 0,
    subjects: [
      {
        subjectName: 'Loading......',
        level: ['S', 'S+', 'H', 'H+', 'AP'],//open the right to change this in the future
        credit: 0,
        type: 0, //1 = Language, 0 = NonLanguage
        selectedValue: 0
      }
    ],
    typeList: ["Is Not Language","Is Language"],
    //levels:[],
    //level: ['S', 'S+', 'H', 'H+', 'AP'],
    //levelNum: 1,
    //subNum: [],
  },

  generateSubject: function(e){
    var rawSubject = []

    for(var i = 0; i < e.detail.value; i++){
      rawSubject.push({
        subjectName: 'Loading......',
        level: ['S', 'S+', 'H', 'H+', 'AP'],//open the right to change this in the future
        credit: 0,
        type: 0,  //1 = Language, 0 = NonLanguage
        selectedValue: 0
      });
    }

    this.setData({
      subjects:rawSubject
    })

  },

  //generateLevel: function(e){
  //
  //},
  getPresetname: function (e) {
    //console.log(selectedLevel);
    this.setData({
      presetName: e.detail.value,//显示前端level 
    })
  },

  getSubname: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var formatter = "subjects[" + index + "].subjectName";
    //console.log(selectedLevel);
    that.setData({
      [formatter]: e.detail.value,//显示前端level 
    })
    console.log(index);
  },

  getSubtype: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var formatter = "subjects[" + index + "].type";
    //console.log(selectedLevel);
    that.setData({
      [formatter]: e.detail.value,//显示前端level 
    })
    console.log(index);

    //console.log(this.data.subjects[0].type);
  },

  getSubcredit: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var formatter = "subjects[" + index + "].credit";
    //console.log(selectedLevel);
    that.setData({
      [formatter]: e.detail.value,//显示前端level 
    })
    console.log(index);
    console.log(this.data.subjects[index].credit)

    //console.log(this.data.subjects[0].type);
  },

  userInfo: function (e) {
    var that = this;
    var name = e.detail.userInfo.nickName.replace(/\s*/g, "");
    that.upload(name);

  },

  upload: function(name) {
    var message = '';
    var flag = false;
    //console.log(this.data.subjects[0].presetName+this.data.subjects[1].subjectName);
    for(var i = 0; i < this.data.subjects.length;i++){
      if (this.data.subjects[i].credit <= 0 ){
        message = "Missing Something, cannot upload!";
      }
      else{
        flag = true;
        }
    }

    if(flag == true){
      message = "Uploaded!";
        var uploadList = this.data.subjects;
        console.log(uploadList);
        var presetName = this.data.presetName;
        var presetGrade = this.data.presetGrade;
        
        /*
        db.collection('UserPreset').doc(name).get({//建立或者更新数据库信息
          success: function (res) {
            db.collection('UserPreset').doc(name).update({
              
              // data 传入需要局部更新的数据
              data: {
                // 表示将 done 字段置为 true
                Presetname: presetName,
                Presetgrade: presetGrade,
                subjects:uploadList
              }
            })
            // res.data 包含该记录的数据
            console.log("Update");
          },
          fail: function () {

            console.log("Created");
          }
        })
        */

      db.collection('UserPreset').add({
        data: {
          Name: name,
          Presetname: presetName,
          Presetgrade: presetGrade,
          subjects: uploadList
        }
      })
      }
    

    wx.showModal({
      title: 'Result',
      content: (message),
      confirmText: "Confirm",
      cancelText: "OK"
    });

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