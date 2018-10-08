const db = wx.cloud.database()
const userSearcher = db.collection('UserGPA')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SubjectList: ["Math", "Eng", "Chi", "Phy", "Chem", "His", "Ele"],//Subjects (Not used in the following code, only to make the data

    level: ['S', 'S+', 'H', 'H+', 'AP'],
    pLevel: ['S', 'S', 'S', 'S', 'S', 'S', 'S'],
    pScore: ['', '', '', '', '', '', ''],
    SubAindex: 0,
    SubBindex: 0,
    SubCindex: 0,
    SubDindex: 0,
    SubEindex: 0,
    SubFindex: 0,
    SubGindex: 0,
    CreditList: ["6.5@0", "6.5@1", "3.0@1", "4.0@0", "3.0@0", "4.0@0", "2.5@0"],//Subjects'credit and the mark of whether it is language or nonlanguage. 1 = Language, 0 = NonLanguage

    NLAPList: [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5], //Credits for Language AP IN ORDER
    NLHList: [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3], //Credits for NonLanguage H IN ORDER
    NLSPlusList: [0, 2.25, 2.65, 2.95, 3.25, 3.55, 3.85, 4.15], //Credits for NonLanguage S+ IN ORDER
    NLSList: [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0], //Credits for NonLanguage S IN ORDER
    LAPList: [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5], //Credits for Language AP IN ORDER
    LHPLUSList: [0, 2.5, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4], //Credits for Language H+ IN ORDER
    LHList: [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3], //Credits for Language H IN ORDER
    LSPLUSList: [0, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1], //Credits for Language S+ IN ORDER
    LSList: [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0], //Credits for Language S IN ORDER
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
      SubGindex: e.detail.value,//显示前端level
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
      if (this.data.pScore[count] != '') {
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
      content: ("Your GPA is " + GPAFinal.toFixed(2) + "," + rank),
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
    if (Validator == 1)//Validate the type of the subject
    { return Credit * that.getL(subLevel, subScore); }
    else { return Credit * that.getNL(subLevel, subScore); }
  },

  //Subject Categorization Functions
  getNL: function (Level, Score) {
    console.log(Level);
    var that = this;
    var calLevel;
    if (Level == "AP") {
      calLevel = this.data.calLevel
      return that.calGPA(Score, calLevel);
    }
    if (Level == "H") {
      calLevel = this.data.NLHList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "S+") {
      calLevel = this.data.NLSPlusList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "S") {
      calLevel = this.data.NLSList
      return that.calGPA(Score, calLevel);
    }
  },

  getL: function (Level, Score) {
    //console.log(Level + Score);
    var calLevel
    var that = this
    if (Level == "AP") {
      calLevel = this.data.LAPList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "H+") {
      calLevel = this.data.LHPLusList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "H") {
      calLevel = this.data.LHList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "S+") {
      calLevel = this.data.LSPlusList
      return that.calGPA(Score, calLevel);
    }
    if (Level == "S") {
      calLevel = this.data.LSList
      return that.calGPA(Score, calLevel);
    }
  },

  calGPA: function (Score, calLevel) {
    //console.log(list);
    //console.log(listname);
    //console.log(this.data.[listname])
    var gpa = 0;
    //console.log("AP",Score)
    if (Score <= 59)
      gpa = this.data.calLevel[0];
    if (Score > 59 && Score <= 67)
      gpa = this.data.calLevel[1];
    if (Score > 67 && Score <= 72)
      gpa = this.data.calLevel[2];
    if (Score > 72 && Score <= 77)
      gpa = this.data.calLevel[3];
    if (Score > 77 && Score <= 82)
      gpa = this.data.calLevel[4];
    if (Score > 82 && Score <= 87)
      gpa = this.data.calLevel[5];
    if (Score > 87 && Score <= 92)
      gpa = this.data.calLevel[6];
    if (Score > 92 && Score <= 100)
      gpa = this.data.calLevel[7];
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