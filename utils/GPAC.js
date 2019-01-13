export class Result{

  constructor(GPACs) {
    this.rawGPACs = GPACs;
    console.log(this.rawGPACs);
  }

  getGPA(){
    var credit = 0;
    var total = 0;
    for (var count = 0; count < this.rawGPACs.length; count++) {
      if (this.rawGPACs[count].getScore() != 0) {
        credit += parseFloat(this.rawGPACs[count].getCredit());//Import Credit
        total += this.rawGPACs[count].getGPA();//Adds all the raw GPA
      }
    }

    this.gpaFinal = (total / credit).toFixed(2);
    return this.gpaFinal;

  }

  getRank(){
    if (this.gpaFinal <= 3) { this.rank = " Try harder!"; }
    else if (this.gpaFinal >= 3) { this.rank = " Sweet!"; }
    else { this.rank = "Error!"; }

    return this.rank;
  }

}

export class Unit{
  
  constructor(name,credit,type) {
    this.rawName = name;
    this.rawCredit = credit;
    this.rawIdentifier = type;
    this.rawScore = 0;
    this.convertType(this.rawIdentifier);
    this.rawLevel = "S";
    this.NLIBList = [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5];
    this.NLAPList = [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]; //Credits for Language AP IN ORDER
    this.NLHPLUSList = [0, 2.25, 2.65, 2.95, 3.25, 3.55, 3.85, 4.15]; //Credits for Language S+ IN ORDER
    this.NLHList= [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3]; //Credits for NonLanguage H IN ORDER
    this.NLSPLUSList= [0, 2.25, 2.65, 2.95, 3.25, 3.55, 3.85, 4.15]; //Credits for NonLanguage S+ IN ORDER
    this.NLSList= [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0]; //Credits for NonLanguage S IN ORDER
    this.LAPList= [0, 2.6, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5]; //Credits for Language AP IN ORDER
    this.LHPLUSList= [0, 2.5, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4]; //Credits for Language H+ IN ORDER
    this.LHList= [0, 2.4, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3]; //Credits for Language H IN ORDER
    this.LSPLUSList= [0, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1]; //Credits for Language S+ IN ORDER
    this.LSList= [0, 2.1, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0]; //Credits for Language S IN ORDER
  }

  convertType(type){
    if (this.rawIdentifier == 0){ //0 is Non-Language, 1 is Language
      this.rawType = false;
      this.rawTypename = "Non-Language";
    }
    else{
      this.rawType = true;
      this.rawTypename = "Language";
    }
  }

  setCredit(credit){
    this.rawCredit = credit;
  }

  setType(type){
    this.rawType = type;
  }

  setScore(score){
    this.rawScore = score;
  }

  setLevel(level) {
    this.rawLevel = level;
  }

  getLevel() {
    return this.rawLevel;
  }

  getScore(){
    return this.rawScore;
  }

  getCredit() {
    return this.rawCredit;
  }

  getType() {
    return this.rawType;
  } 

  //Data Importation Function
  getGPA(){
    if (this.rawType == true) {  //false is non-language, true is language
    return this.rawCredit * this.getL();
    }
    else{
    return this.rawCredit * this.getNL();
    }
  }

   //Subject Categorization Function
   getNL() {
    //console.log(Level);
      if (this.rawLevel == "AP") {
      return this.calGPA(this.NLAPList)
    }
      if (this.rawLevel == "H+") {
      return this.calGPA(this.NLHPLUSList)
      
    }
      if (this.rawLevel == "H") {
      return this.calGPA(this.NLHList)

    }
      if (this.rawLevel == "S+") {
      return this.calGPA(this.NLSPLUSList)

    }
      if (this.rawLevel == "S") {
      return this.calGPA(this.NLSList)
    }

  }

  getL() {
    //console.log(Level);
    if (this.rawLevel == "AP") {
      return this.calGPA(this.LAPList)
    }
    if (this.rawLevel == "H+") {
      return this.calGPA(this.LHPLUSList)

    }
    if (this.rawLevel == "H") {
      return this.calGPA(this.LHList)

    }
    if (this.rawLevel == "S+") {
      return this.calGPA(this.LSPLUSList)

    }
    if (this.rawLevel == "S") {
      return this.calGPA(this.LSList)
    }

  }

  calGPA(list){
    //console.log(list);
    //console.log(listname);
    //console.log(this.data.[listname])
    //console.log("AP",Score)
    if (this.rawScore <= 59)
      this.gpa = list[0];
    if (this.rawScore > 59 && this.rawScore <= 67)
      this.gpa = list[1];
    if (this.rawScore > 67 && this.rawScore <= 72)
      this.gpa = list[2];
    if (this.rawScore > 72 && this.rawScore <= 77)
      this.gpa = list[3];
    if (this.rawScore > 77 && this.rawScore <= 82)
      this.gpa = list[4];
    if (this.rawScore > 82 && this.rawScore <= 87)
      this.gpa = list[5];
    if (this.rawScore > 87 && this.rawScore <= 92)
      this.gpa = list[6];
    if (this.rawScore > 92 && this.rawScore <= 100)
      this.gpa = list[7];
    //console.log(gpa)
    return this.gpa;
  }

  toString() {
      return ("Subject Name: " + this.rawName + " Subject Credit: " + this.rawCredit + " Subject Type: " + this.rawTypename + " Subject Score: " + this.rawScore + " Subject Level: " + this.rawLevel);
  }

}
