const db = wx.cloud.database()
const userSearcher = db.collection('UserGPA')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserInfo: '',
    UserGPA: 0,
    SubjectList: ["TOK", "SUBA", "SUBB", "SUBC", "SUBD", "SUBE", "SUBF"],//Subjects (Not used in the following code, only to make the data readable)
    level: ['IB'],
    pLevel: ['IB', 'IB', 'IB', 'IB', 'IB', 'IB', 'IB'],
    pScore: [0, 0, 0, 0, 0, 0, 0],
    SubAindex: 0,
    SubBindex: 0,
    SubCindex: 0,
    SubDindex: 0,
    SubEindex: 0,
    SubFindex: 0,
    SubGindex: 0,
    CreditList: ["3.0@0", "6.0@0", "6.0@0", "6.0@0", "6.0@0", "6.0@0", "6.0@0"],//Subjects'credit and the mark of whether it is language or nonlanguage. 1 = Language, 0 = NonLanguage

    IBList: [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5], //Credits for Language IB IN ORDER
   
  },

  getSubAScore: function (e) {
    var formatter = "pScore[" + 0 + "]";
    this.setData({
      [formatter]: e.detail.value
    })
    //console.log(e.detail.value)
  },

  getSubALevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var formatter = "pLevel[" + 0 + "]";
    this.setData({
      SubAindex: e.detail.value,//显示前端level
      [formatter]: this.data.level[e.detail.value] //提取前端level      
    })
    //console.log(this.dPta.index)
    //console.log(this.data.pLevel[0])

  },

  getSubBScore: function (e) {
    var formatter = "pScore[" + 1 + "]";
    this.setData({
      [formatter]: e.detail.value
    })
  },
  getSubBLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var formatter = "pLevel[" + 1 + "]";
    this.setData({
      SubBindex: e.detail.value,//显示前端level
      [formatter]: this.data.level[e.detail.value] //提取前端level   
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubCScore: function (e) {
    var formatter = "pScore[" + 2 + "]";
    this.setData({
      [formatter]: e.detail.value
    })
  },
  getSubCLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var formatter = "pLevel[" + 2 + "]";
    this.setData({
      SubCindex: e.detail.value,//显示前端level
      [formatter]: this.data.level[e.detail.value] //提取前端level   
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubDScore: function (e) {
    var formatter = "pScore[" + 3 + "]";
    this.setData({
      [formatter]: e.detail.value
    })
  },
  getSubDLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var formatter = "pLevel[" + 3 + "]";
    this.setData({
      SubDindex: e.detail.value,//显示前端level
      [formatter]: this.data.level[e.detail.value] //提取前端level    
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubEScore: function (e) {
    var formatter = "pScore[" + 4 + "]";
    this.setData({
      [formatter]: e.detail.value
    })
  },
  getSubELevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var formatter = "pLevel[" + 4 + "]";
    this.setData({
      SubEindex: e.detail.value,//显示前端level
      [formatter]: this.data.level[e.detail.value] //提取前端level   
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubFScore: function (e) {
    var formatter = "pScore[" + 5 + "]";
    this.setData({
      [formatter]: e.detail.value
    })
  },
  getSubFLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var formatter = "pLevel[" + 5 + "]";
    this.setData({
      SubFindex: e.detail.value,//显示前端level
      [formatter]: this.data.level[e.detail.value] //提取前端level    
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubGScore: function (e) {
    var formatter = "pScore[" + 6 + "]";
    this.setData({
      [formatter]: e.detail.value
    })
  },
  getSubGLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var formatter = "pLevel[" + 6 + "]";
    this.setData({
      SubFindex: e.detail.value,//显示前端level
      [formatter]: this.data.level[e.detail.value] //提取前端level   
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },

  getSubHScore: function (e) {
    var formatter = "pScore[" + 7 + "]";
    this.setData({
      [formatter]: e.detail.value
    })
  },
  getSubHLevel: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var formatter = "pLevel[" + 7 + "]";
    this.setData({
      SubHindex: e.detail.value,//显示前端level
      [formatter]: this.data.level[e.detail.value] //提取前端level   
    })
    //console.log(this.data.index)
    //console.log(this.data.SubALevel)

  },
  userInfo: function (e) {
    var that = this;
    var name = e.detail.userInfo.nickName.replace(/\s*/g, "");
    that.Submit(name);

    //console.log(this.data.UserInfo);
    //console.log('A')

  },
  //StartUp Function 
  Submit: function (name) {
    const _ = db.command;
    var total = 0;
    var rank = "";
    var credit = 0;
    var that = this;
    //console.log(name);
    for (var count = 0; count < this.data.pLevel.length; count++) {
      if (this.data.pScore[count] != -1) {
        var TempList = this.data.CreditList[count].split("@")//Decode CreditList
        credit += parseFloat(TempList[0]);//Import Credit
        console.log(credit);
        total += that.getGpa(count);//Adds all the raw GPA
      }

    }

    var GPAFinal = total / credit;//Divides the Raw GPA with the credit.
    //GPA Satisfaction Evaluation
    if (GPAFinal <= 3) { rank = " Try harder!"; }
    else if (GPAFinal >= 3) { rank = " Sweet!"; }
    else { rank = "Error!"; }
    //Present GPA
    wx.showModal({
      title: 'Result',
      content: ("Your GPA is " + GPAFinal + "," + rank),
      confirmText: "Confirm",
      cancelText: "OK"
    });

    db.collection('UserGPA').doc(name).get({//建立或者更新数据库信息
      success: function (res) {
        db.collection('UserGPA').doc(name).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            GPA: GPAFinal
          },
          success: function (res) {
            console.log(res.data)
          }
        })
        // res.data 包含该记录的数据
        console.log("Update");
      },
      fail: function () {
        db.collection('UserGPA').add({
          data: {
            _id: name,
            GPA: GPAFinal
          }
        })
        console.log("Created");
      }
    })

    //console.log(this.data.UserGPA)
    //console.log("Your GPA is " + GPAFinal + "," + rank);
    //console.log(this.data.SubAScore)
    //console.log(this.data.SubALevel)


  },

  //Data Importation Function
  getGpa: function (count) {
    var that = this;
    var subScore = this.data.pScore[count];//Import Score
    var subLevel = this.data.pLevel[count];//Import Level
    var TempList = this.data.CreditList[count].split("@");//Decode CreditList
    var Credit = parseFloat(TempList[0]);//Import Credit
    var Validator = parseInt(TempList[1]);//Import Class Validator
    //console.log(subScore,subLevel,Credit,Validator)
    if (Validator == 0)//Validate the type of the subject
    { return Credit * that.IB(subScore); }
  },

  //Score Comparison Functions
  IB: function (Score) {
    var gpa = 0;
    //console.log("AP",Score)
    if (Score <= 59)
      gpa = this.data.IBList[0];
    if (Score > 59 && Score <= 67)
      gpa = this.data.IBList[1];
    if (Score > 67 && Score <= 72)
      gpa = this.data.IBList[2];
    if (Score > 72 && Score <= 77)
      gpa = this.data.IBList[3];
    if (Score > 77 && Score <= 82)
      gpa = this.data.IBList[4];
    if (Score > 82 && Score <= 87)
      gpa = this.data.IBList[5];
    if (Score > 87 && Score <= 92)
      gpa = this.data.IBList[6];
    if (Score > 92 && Score <= 100)
      gpa = this.data.IBList[7];
    console.log(gpa)
    return gpa;
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