const db = wx.cloud.database();
const userSearcher = db.collection('UserPreset');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    presetName: "defaultPreset",
    subjects: [],
    typeList: ["Is Not Language", "Is Language"],
  },

  generateSubject: function(e) {
    var rawSubject = []
    for (var i = 0; i < e.detail.value; i++) {
      rawSubject.push({
        subjectName: 'Loading......',
        level: ['S', 'S+', 'H', 'H+', 'AP'], //open the right to change this in the future
        credit: 0,
        type: 0, //1 = Language, 0 = NonLanguage
        selectedValue: 0
      });
    }

    this.setData({
      subjects: rawSubject
    })

  },

  getPresetname: function(e) {
    this.setData({
      presetName: e.detail.value, //显示前端level 
    })
  },

  getSubname: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var formatter = "subjects[" + index + "].subjectName";
    that.setData({
      [formatter]: e.detail.value, //显示前端level 
    })
  },

  getSubtype: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var formatter = "subjects[" + index + "].type";
    that.setData({
      [formatter]: e.detail.value, //显示前端level 
    })
  },

  getSubcredit: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var formatter = "subjects[" + index + "].credit";
    that.setData({
      [formatter]: e.detail.value, //显示前端level 
    })
  },

  userInfo: function(e) {
    var that = this;
    var name = e.detail.userInfo.nickName.replace(/\s*/g, "");
    that.upload(name);

  },

  submit: function(name) {
    for (var i = 0; i < this.data.subjects.length; i++) {
      if (this.data.subjects[i].credit <= 0) {
        wx.showToast({
          title: 'Missing parameters',
        })
      } else {
        this.upload(name);
      }
    }
  },

  upload: function(name){
    db.collection('UserPreset').add({
      data: {
        Name: name,
        presetName: this.data.presetName,
        displayName: this.data.presetName,
        subjects: this.data.subjects
      }
    })
    wx.showModal({
      title: 'Result',
      content: "Preset Created!",
      confirmText: "Confirm",
      cancelText: "OK"
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: 'Wow! My GPA is ' + app.globalData.gpa,
      path: '/pages/index/index?',
      //imageUrl: "/images/1.jpg"
    }
  },

  onShow: function() {
  },

  onHide: function() {
  }
})