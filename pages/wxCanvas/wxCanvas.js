// pages/wxCanvas/wxCanvas.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    widWidth: 0,

    widHeight: 0,

    screenWid: 0,

    multiple: 0,
    avatarURL:''
  },
  launchAppError: function(e) {

    console.log(e.detail.errMsg)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        console.log(userInfo.avatarURL);
      }
            })
    that.setData({
      avatarURL: userInfo.avatarUrl
    });
    console.log("success");
    let ctxId = wx.createCanvasContext('shareCanvas')    
    let screenWid = wx.getSystemInfoSync().windowWidth;
    this.setData({
      multiple: 750 / screenWid
    })    
    this.setData({
      widWidth: 750 / this.data.multiple,
      widHeight: 1334 / this.data.multiple
    })    
    wx.getImageInfo({
      src: 'https://oacademo-1252397592.file.myqcloud.com/miniprogram/images/bg.jpg',
      success: function(res) {
        console.log(res.path);
        ctxId.drawImage(res.path, 0, 0, 750 / that.data.multiple, 1354 / that.data.multiple);
        that.getIcon(ctxId, that, screenWid);
      }
    })
  },
  getIcon(ctxId, that, screenWid) {     /*明星头像*/     
    wx.getImageInfo({
      src: this.data.avatarUrl,
      success: function(res) {
        console.log(res.path);
        ctxId.save();
        ctxId.beginPath(); //开始绘制                
        var avatarurl_width = 180 / that.data.multiple;  
        //绘制的头像宽度                
        var avatarurl_heigth = 180 / that.data.multiple; 
        //绘制的头像高度                
        var avatarurl_x = 285 / that.data.multiple; 
        //绘制的头像在画布上的位置                
        var avatarurl_y = 18 / that.data.multiple; 
        //绘制的头像在画布上的位置                
        ctxId.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);        
        ctxId.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因                
        ctxId.drawImage(res.path, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth)        
        ctxId.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制                
        that.getFont(ctxId, that, screenWid);      
      }    
    })
  },
  getFont(ctxId, that, screenWid) {
    ctxId.setTextAlign('center')  
    // 文字居中        
    ctxId.setFillStyle('#f74565') 
    // 文字颜色：黑色        
    ctxId.setFontSize(parseInt(34 / that.data.multiple))   
    ctxId.fillText("实时排行： 1000+", screenWid / 2, 347 / that.data.multiple)    
    ctxId.stroke()    
    ctxId.draw();  
  },
    
  savetup: function() {    
    wx.canvasToTempFilePath({      
      x: 0,
            y: 0,
            width: this.data.widWidth,
            height: this.data.widHeight,
            destWidth: 750,
            destHeight: 1354,
            canvasId: 'shareCanvas',
            success: function(res) {         //调取小程序当中获取图片                
        console.log(res.tempFilePath);        
        wx.saveImageToPhotosAlbum({          
          filePath: res.tempFilePath,
                    success(res) {            
            wx.showModal({              
              title: '存图成功',
                            content: '图片成功保存到相册了，去发圈噻~',
                            showCancel: false,
                            confirmText: '好哒',
                            confirmColor: '#72B9C3',
                            success: function(res) {                
                if (res.confirm) {                  
                  console.log('用户点击确定');                
                }              
              }            
            })          
          }        
        })      
      },
            fail: function(res) {        
        console.log(res)      
      }    
    })  
  }
})