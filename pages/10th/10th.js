// index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level:['S','S+','H','H+','AP'],
    Mathindex: 0,
    Engindex: 0,
    Chiindex: 0,
    Chemindex: 0,
    Phyindex: 0,
    Hisindex: 0,
    Ele1index: 0,
    Ele2index: 0,
    MathLevel: 'S',
    MathScore: '',
    ChiLevel: 'S',
    ChiScore: '',
    EngLevel: 'S',
    EngScore: '',
    PhyLevel: 'S',
    PhyScore: '',
    HisLevel: 'S',
    HisScore: '',
    ChemLevel: 'S',
    ChemScore: '',
    Ele1Level: 'S',
    Ele1Score: '',
    Ele2Level: 'S',
    Ele2Score: '',
    credits : 30,//Main Credit
    SubjectList : new Array("Chi", "Eng", "Math", "Chem", "Phy", "Ele1", "His", "Ele2"),//Subjects
    CreditList : new Array("3.0@1", "5.5@1", "5.5@0", "3.0@0", "3.0@0", "3.0@0", "4.0@0", "3.0@0"),//Subjects'credit and the mark of whether it is language or nonlanguage. 1 = Language, 0 = NonLanguage
    NLHList : new Array(0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3), //Credits for NonLanguage H IN ORDER
    NLSPlusList : new Array(0, 2.25, 2.65, 2.95, 3.25, 3.55, 3.85, 4.15), //Credits for NonLanguage S+ IN ORDER
    NLSList : new Array(0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0), //Credits for NonLanguage S IN ORDER
    LAPList : new Array(0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.1, 4.3), //Credits for Language AP IN ORDER
    LHPLUSList : new Array(0, 2.5, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4), //Credits for Language H+ IN ORDER
    LHList : new Array(0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3), //Credits for Language H IN ORDER
    LSPLUSList : new Array(0, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1), //Credits for Language S+ IN ORDER
    LSList : new Array(0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0), //Credits for Language S IN ORDER
},

  getMathScore: function (e) {
    this.setData({
      MathScore: e.detail.value
    })
  },

  getMathLevel: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({    
      Mathindex: e.detail.value,//显示前端level
      MathLevel: this.data.level[e.detail.value]  //提取前端level       
    })
    //console.log(this.data.index)
    //console.log(this.data.MathLevel)
    
  },



  getEngScore: function (e) {
    this.setData({
      EngScore: e.detail.value
    })
  },
  getEngLevel: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Engindex: e.detail.value,//显示前端level
      EngLevel: this.data.level[e.detail.value]  //提取前端level       
    })
    //console.log(this.data.index)
    //console.log(this.data.MathLevel)

  },

  getChiScore: function (e) {
    this.setData({
      ChiScore: e.detail.value
    })
  },
  getChiLevel: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Chiindex: e.detail.value,//显示前端level
      ChiLevel: this.data.level[e.detail.value]  //提取前端level       
    })
    //console.log(this.data.index)
    //console.log(this.data.MathLevel)

  },

  getPhyScore: function (e) {
    this.setData({
      PhyScore: e.detail.value
    })
  },
  getPhyLevel: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Phyindex: e.detail.value,//显示前端level
      PhyLevel: this.data.level[e.detail.value]  //提取前端level       
    })
    //console.log(this.data.index)
    //console.log(this.data.MathLevel)

  },

  getChemScore: function (e) {
    this.setData({
      ChemScore: e.detail.value
    })
  },
  getChemLevel: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Chemindex: e.detail.value,//显示前端level
      ChemLevel: this.data.level[e.detail.value]  //提取前端level       
    })
    //console.log(this.data.index)
    //console.log(this.data.MathLevel)

  },

  getHisScore: function (e) {
    this.setData({
      HisScore: e.detail.value
    })
  },
  getHisLevel: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Hisindex: e.detail.value,//显示前端level
      HisLevel: this.data.level[e.detail.value]  //提取前端level       
    })
    //console.log(this.data.index)
    //console.log(this.data.MathLevel)

  },

  getEle1Score: function (e) {
    this.setData({
      Ele1Score: e.detail.value
    })
  },
  getEle1Level: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Ele1index: e.detail.value,//显示前端level
      ELe1Level: this.data.level[e.detail.value]  //提取前端level       
    })
    //console.log(this.data.index)
    //console.log(this.data.MathLevel)

  },

  getEle2Score: function (e) {
    this.setData({
      Ele2Score: e.detail.value
    })
  },
  getEle2Level: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Ele2index: e.detail.value,//显示前端level
      ELe2Level: this.data.level[e.detail.value]  //提取前端level       
    })
    //console.log(this.data.index)
    //console.log(this.data.MathLevel)

  },
  //StartUp Function 
  Submit:function(e){
    var total = 0;
    var rank = "";
    var that = this;
    total += 5.5 * that.getNL(this.data.MathLevel, this.data.MathScore) + 5.5 * that.getL(this.data.EngLevel, this.data.EngScore) + 3.0 * that.getL(this.data.ChiLevel, this.data.ChiScore) + 3.0 * that.getNL(this.data.PhyLevel, this.data.PhyScore) +3.0 * that.getNL(this.data.ChemLevel, this.data.ChemScore) +  4.0 * that.getNL(this.data.HisLevel, this.data.HisScore) + 3.0 * that.getNL(this.data.Ele1Level, this.data.Ele1Score) + 3.0 *that.getNL(this.data.Ele2Level, this.data.Ele2Score);

    var GPAFinal = total / this.data.credits;//Divides the Raw GPA with the credit.
    //GPA Satisfaction Evaluation
    if (GPAFinal <= 3) { rank = " Try harder!"; }
    else if (GPAFinal >= 3) { rank = " Sweet!"; }
    else { rank = "Error!"; }
    //Present GPA

    console.log("Your GPA is " + GPAFinal.toFixed(2) + "," + rank);
  //console.log(this.data.MathScore)
  //console.log(this.data.MathLevel)
  },


  //Subject Categorization Functions
getNL:function (Level, Score){
  //console.log(Level + Score);
  var that = this;
  if(Level == "AP"){
    return that.NonLanguageAP(Score);
  }
    if (Level == "H") {
    return that.NonLanguageH(Score);
  }
    if (Level == "S+")
    return that.NonLanguageSPlus(Score);
    if (Level == "S")
    return that.NonLanguageS(Score);
    },

getL:function(Level, Score) {
  console.log(Level + Score);
  var that = this
  if (Level == "AP") {
    return that.LanguageAP(Score);
  }
  if (Level == "H+") {
    return that.LanguageHPlus(Score);
  }
  if (Level == "H")
    return that.LanguageH(Score);
  if (Level == "S+")
    return that.LanguageSPlus(Score);
  if (Level == "S")
    return that.LanguageS(Score);
},

//Score Comparison Functions
NonLanguageAP:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.NLAPList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.NLAPList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.NLAPList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.NLAPList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.NLAPList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.NLAPList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.NLAPList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.NLAPList[7];
  return gpa;
},
NonLanguageH:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.NLHList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.NLHList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.NLHList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.NLHList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.NLHList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.NLHList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.NLHList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.NLHList[7];
  return gpa;
},
NonLanguageSPlus:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.NLSPlusList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.NLSPlusList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.NLSPlusList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.NLSPlusList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.NLSPlusList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.NLSPlusList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.NLSPlusList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.NLSPlusList[7];
  return gpa;
},
NonLanguageS: function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.NLSList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.NLSList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.NLSList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.NLSList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.NLSList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.NLSList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.NLSList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.NLSList[7];
    console.log(gpa);
  return gpa;
},
LanguageAP:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.LAPList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.LAPList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.LAPList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.LAPList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.LAPList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.LAPList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.LAPList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.LAPList[7];
  return gpa;
},
 LanguageHPlus:function(Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.LAPList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.LAPList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.LAPList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.LAPList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.LAPList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.LAPList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.LAPList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.LAPList[7];
  return gpa;
},
LanguageH:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.LHList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.LHList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.LHList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.LHList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.LHList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.LHList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.LHList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.LHList[7];
  return gpa;
},
LanguageSPlus:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.LSPLUSList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.LSPLUSList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.LSPLUSList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.LSPLUSList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.LSPLUSList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.LSPLUSList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.LSPLUSList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.LSPLUSList[7];
  return gpa;
},
LanguageS:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = this.data.LSList[0];
  if (Score > 59 && Score <= 67)
    gpa = this.data.LSList[1];
  if (Score > 67 && Score <= 72)
    gpa = this.data.LSList[2];
  if (Score > 72 && Score <= 77)
    gpa = this.data.LSList[3];
  if (Score > 77 && Score <= 82)
    gpa = this.data.LSList[4];
  if (Score > 82 && Score <= 87)
    gpa = this.data.LSList[5];
  if (Score > 87 && Score <= 92)
    gpa = this.data.LSList[6];
  if (Score > 92 && Score <= 100)
    gpa = this.data.LSList[7];
    console.log(gpa);
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