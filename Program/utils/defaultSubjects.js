const defaultPresets = [{
    presetName: "eighthGrade",
    displayName: "Eighth Grade",
    subjects: [{
        subjectName: 'Math',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 7.5,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'English',
        level: ['S', 'S+', 'H', 'H+'],
        selectedValue: 0,
        credit: 7.5,
        type: 1 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Chinese',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 5.0,
        type: 1 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Physics',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 3.5,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Biology',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'History',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 2.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Geography',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 2.0,
        type: 0 //1 : Language, 0 : NonLanguage
      }
    ]
  },
  {
    presetName: "ninthGrade",
    displayName: "Ninth Grade",
    subjects: [{
        subjectName: 'Math',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 6.5,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'English',
        level: ['S', 'S+', 'H', 'H+'],
        selectedValue: 0,
        credit: 6.5,
        type: 1 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Chinese',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 1 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Physics',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Chemistry',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'History',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Elective',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 2.5,
        type: 0 //1 : Language, 0 : NonLanguage
      },
    ]
  },
  {
    presetName: "tenthGrade",
    displayName: "Tenth Grade",
    subjects: [{
        subjectName: 'Math',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 5.5,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'English',
        level: ['S', 'S+', 'H', 'H+'],
        selectedValue: 0,
        credit: 5.5,
        type: 1 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Chinese',
        level: ['S', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 3.0,
        type: 1 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Physics',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Chemistry',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'History',
        level: ['S', 'S+', 'H', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Elective1',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Elective2',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
    ]
  },
  {
    presetName: "elethGrade",
    displayName: "Eleventh Grade",
    subjects: [{
        subjectName: 'Math',
        level: ['S', 'H', 'AP'],
        selectedValue: 0,
        credit: 5.5,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'English',
        level: ['S', 'S+', 'H', 'AP'],
        selectedValue: 0,
        credit: 5.5,
        type: 1 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Chinese',
        level: ['S', 'H', 'H+'],
        selectedValue: 0,
        credit: 3.0,
        type: 1 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Subject D',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Subject E',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Subject F',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 : Language, 0 : NonLanguage
      },
      {
        subjectName: 'Subject G',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 : Language, 0 : NonLanguage
      }
    ]
  }
];

export {
  defaultPresets
};