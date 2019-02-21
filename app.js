//app.js
App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    gradeList:[8, 9, 10, 11, 11],
    imageList: ["https://connect.shs.cn/images/b/b4/b45141edd63b272b.jpg",
      "https://connect.shs.cn/images/6/67/679b5bfbf1cbd7ef.jpg",
      "https://connect.shs.cn/images/c/c4/c4b4fc3612738a2a.jpg",
      "https://connect.shs.cn/images/2/23/2335cadc333ced44.jpg",
      "https://wx2.sinaimg.cn/mw690/006tozhpgy1fz9nlk3sanj30u00jg0t5.jpg"
    ],
    eighthGrade: [{
        subjectName: 'Math',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 7.5,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'English',
        level: ['S', 'S+', 'H', 'H+'],
        selectedValue: 0,
        credit: 7.5,
        type: 1 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Chinese',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 5.0,
        type: 1 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Physics',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 3.5,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Biology',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'History',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 2.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Geography',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 2.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
    ],

    ninethGrade: [{
        subjectName: 'Math',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 6.5,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'English',
        level: ['S', 'S+', 'H', 'H+'],
        selectedValue: 0,
        credit: 6.5,
        type: 1 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Chinese',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 1 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Physics',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Chemistry',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'History',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Elective',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 2.5,
        type: 0 //1 = Language, 0 = NonLanguage
      },
    ],

    tenthGrade: [{
        subjectName: 'Math',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 5.5,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'English',
        level: ['S', 'S+', 'H', 'H+'],
        selectedValue: 0,
        credit: 5.5,
        type: 1 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Chinese',
        level: ['S', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 3.0,
        type: 1 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Physics',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Chemistry',
        level: ['S', 'S+', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'History',
        level: ['S', 'S+', 'H', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Elective1',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Elective2',
        level: ['S', 'H'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
    ],

    elethGrade: [{
        subjectName: 'Math',
        level: ['S', 'H', 'AP'],
        selectedValue: 0,
        credit: 5.5,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'English',
        level: ['S', 'S+', 'H', 'AP'],
        selectedValue: 0,
        credit: 5.5,
        type: 1 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Chinese',
        level: ['S', 'H', 'H+'],
        selectedValue: 0,
        credit: 3.0,
        type: 1 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Subject D',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Subject E',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Subject F',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: 'Subject G',
        level: ['S', 'S+', 'H', 'H+', 'AP'],
        selectedValue: 0,
        credit: 4.0,
        type: 0 //1 = Language, 0 = NonLanguage
      }
    ],

    ib: [{
        subjectName: "TOK",
        level: ['IB'],
        selectedValue: 0,
        credit: 3.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: "SubA",
        level: ['IB'],
        selectedValue: 0,
        credit: 6.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: "SubB",
        level: ['IB'],
        selectedValue: 0,
        credit: 6.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: "SubC",
        level: ['IB'],
        selectedValue: 0,
        credit: 6.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: "SubD",
        level: ['IB'],
        selectedValue: 0,
        credit: 6.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: "SubE",
        level: ['IB'],
        selectedValue: 0,
        credit: 6.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
      {
        subjectName: "SubF",
        level: ['IB'],
        selectedValue: 0,
        credit: 6.0,
        type: 0 //1 = Language, 0 = NonLanguage
      },
    ],
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ],
    userInfo: null
  },

})