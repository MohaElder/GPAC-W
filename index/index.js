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
    N5List : new Array(2.3, 2.7, 3.0, 3.3, 3.6, 3.9, 4.2), //Credits for Chinese Nonnative5 IN ORDER
    N4List : new Array(0, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1), //Credits for Chinese Nonnative4 IN ORDER
    N3List : new Array(0, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1), //Credits for Chinese Nonnative3 IN ORDER
    N2List : new Array(0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0), //Credits for Chinese Nonnative2 IN ORDER
    N1List : new Array(0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0) //Credits for Chinese Nonnative1 IN ORDER
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
  console.log(this.data.MathScore)
  console.log(this.data.MathLevel)
  },


  //Subject Categorization Functions
getNL:function (Level, Score){
  console.log(Level + Score);
  var that = this;
  if(Level == "AP"){
    return that.NonLanguageAP(Score);
  }
    if (Level == "H") {
    return that.NonLanguageH(Score);
  }
    if (Level == "S2")
    return that.NonLanguageSPlus(Score);
    if (Level == "S1")
    return that.NonLanguageS(Score);
    },

getL:function(Level, Score) {
  console.log(Level + Score);
  var that = this
  if (Level == "AP") {
    return that.LanguageAP(Score);
  }
  if (Level == "H2") {
    return that.LanguageHPlus(Score);
  }
  if (Level == "H1")
    return that.LanguageH(Score);
  if (Level == "S2")
    return that.LanguageSPlus(Score);
  if (Level == "S1")
    return that.LanguageS(Score);
  if (Level == "N5")
    return that.LanguageN5(Score);
  if (Level == "N4")
    return that.LanguageN4(Score);
  if (Level == "N3")
    return that.LanguageN3(Score);
  if (Level == "N2")
    return that.LanguageN2(Score);
  if (Level == "N1")
    return that.LanguageN1(Score);
},

//Score Comparison Functions
NonLanguageAP:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = NLAPList[0];
  if (Score > 59 && Score <= 67)
    gpa = NLAPList[1];
  if (Score > 67 && Score <= 72)
    gpa = NLAPList[2];
  if (Score > 72 && Score <= 77)
    gpa = NLAPList[3];
  if (Score > 77 && Score <= 82)
    gpa = NLAPList[4];
  if (Score > 82 && Score <= 87)
    gpa = NLAPList[5];
  if (Score > 87 && Score <= 92)
    gpa = NLAPList[6];
  if (Score > 92 && Score <= 100)
    gpa = NLAPList[7];
  return gpa;
},
NonLanguageH:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = NLHList[0];
  if (Score > 59 && Score <= 67)
    gpa = NLHList[1];
  if (Score > 67 && Score <= 72)
    gpa = NLHList[2];
  if (Score > 72 && Score <= 77)
    gpa = NLHList[3];
  if (Score > 77 && Score <= 82)
    gpa = NLHList[4];
  if (Score > 82 && Score <= 87)
    gpa = NLHList[5];
  if (Score > 87 && Score <= 92)
    gpa = NLHList[6];
  if (Score > 92 && Score <= 100)
    gpa = NLHList[7];
  return gpa;
},
NonLanguageSPlus:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = NLSPlusList[0];
  if (Score > 59 && Score <= 67)
    gpa = NLSPlusList[1];
  if (Score > 67 && Score <= 72)
    gpa = NLSPlusList[2];
  if (Score > 72 && Score <= 77)
    gpa = NLSPlusList[3];
  if (Score > 77 && Score <= 82)
    gpa = NLSPlusList[4];
  if (Score > 82 && Score <= 87)
    gpa = NLSPlusList[5];
  if (Score > 87 && Score <= 92)
    gpa = NLSPlusList[6];
  if (Score > 92 && Score <= 100)
    gpa = NLSPlusList[7];
  return gpa;
},
NonLanguageS: function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = NLSList[0];
  if (Score > 59 && Score <= 67)
    gpa = NLSList[1];
  if (Score > 67 && Score <= 72)
    gpa = NLSList[2];
  if (Score > 72 && Score <= 77)
    gpa = NLSList[3];
  if (Score > 77 && Score <= 82)
    gpa = NLSList[4];
  if (Score > 82 && Score <= 87)
    gpa = NLSList[5];
  if (Score > 87 && Score <= 92)
    gpa = NLSList[6];
  if (Score > 92 && Score <= 100)
    gpa = NLSList[7];
  return gpa;
},
LanguageAP:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = LAPList[0];
  if (Score > 59 && Score <= 67)
    gpa = LAPList[1];
  if (Score > 67 && Score <= 72)
    gpa = LAPList[2];
  if (Score > 72 && Score <= 77)
    gpa = LAPList[3];
  if (Score > 77 && Score <= 82)
    gpa = LAPList[4];
  if (Score > 82 && Score <= 87)
    gpa = LAPList[5];
  if (Score > 87 && Score <= 92)
    gpa = LAPList[6];
  if (Score > 92 && Score <= 100)
    gpa = LAPList[7];
  return gpa;
},
 LanguageHPlus:function(Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = LAPList[0];
  if (Score > 59 && Score <= 67)
    gpa = LAPList[1];
  if (Score > 67 && Score <= 72)
    gpa = LAPList[2];
  if (Score > 72 && Score <= 77)
    gpa = LAPList[3];
  if (Score > 77 && Score <= 82)
    gpa = LAPList[4];
  if (Score > 82 && Score <= 87)
    gpa = LAPList[5];
  if (Score > 87 && Score <= 92)
    gpa = LAPList[6];
  if (Score > 92 && Score <= 100)
    gpa = LAPList[7];
  return gpa;
},
LanguageH:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = LHList[0];
  if (Score > 59 && Score <= 67)
    gpa = LHList[1];
  if (Score > 67 && Score <= 72)
    gpa = LHList[2];
  if (Score > 72 && Score <= 77)
    gpa = LHList[3];
  if (Score > 77 && Score <= 82)
    gpa = LHList[4];
  if (Score > 82 && Score <= 87)
    gpa = LHList[5];
  if (Score > 87 && Score <= 92)
    gpa = LHList[6];
  if (Score > 92 && Score <= 100)
    gpa = LHList[7];
  return gpa;
},
LanguageSPlus:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = LSPLUSList[0];
  if (Score > 59 && Score <= 67)
    gpa = LSPLUSList[1];
  if (Score > 67 && Score <= 72)
    gpa = LSPLUSList[2];
  if (Score > 72 && Score <= 77)
    gpa = LSPLUSList[3];
  if (Score > 77 && Score <= 82)
    gpa = LSPLUSList[4];
  if (Score > 82 && Score <= 87)
    gpa = LSPLUSList[5];
  if (Score > 87 && Score <= 92)
    gpa = LSPLUSList[6];
  if (Score > 92 && Score <= 100)
    gpa = LSPLUSList[7];
  return gpa;
},
LanguageS:function (Score) {
  var gpa = 0;
  if (Score <= 59)
    gpa = LSList[0];
  if (Score > 59 && Score <= 67)
    gpa = LSList[1];
  if (Score > 67 && Score <= 72)
    gpa = LSList[2];
  if (Score > 72 && Score <= 77)
    gpa = LSList[3];
  if (Score > 77 && Score <= 82)
    gpa = LSList[4];
  if (Score > 82 && Score <= 87)
    gpa = LSList[5];
  if (Score > 87 && Score <= 92)
    gpa = LSList[6];
  if (Score > 92 && Score <= 100)
    gpa = LSList[7];
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