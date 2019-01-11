export default class GPAC {
  
  constructor() {
    //this.Score = score;
  }

  setScore(score){
    this.rawScore = score;
  }

  getScore(){
    return this.rawScore;
  }

  toString() {
    
      return "HelloWorld"
    
  }

  setLevel(level){
    this.rawLevel = level;
  }

  getLevel(){
    return this.rawLevel;
  }

  Submit(name,rawGrade){
    const _ = db.command;
    var total = 0;
    var rank = "";
    var credit = 0;
    var that = this;
    //console.log(name);
    for (var count = 0; count < pScore.length; count++) {
      if (pScore[count] != '') {
        var TempList = this.data.CreditList[count].split("@")//Decode CreditList
        credit += parseFloat(TempList[0]);//Import Credit
        //console.log(credit);
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
    that.setData({
      FinalGPA: GPAFinal
    })
    //console.log(this.data.FinalGPA);
    db.collection('UserGPA').doc(name).get({//建立或者更新数据库信息
      success: function (res) {
        db.collection('UserGPA').doc(name).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            GPA: GPAFinal,
            grade: 11
          },
          success: function (res) {
            //console.log(res.data)
          }
        })
        // res.data 包含该记录的数据
        console.log("Update");
      },
      fail: function () {
        db.collection('UserGPA').add({
          data: {
            _id: name,
            GPA: GPAFinal,
            grade: rawGrade
          }
        })
        console.log("Created");
      }
    })
  }
}