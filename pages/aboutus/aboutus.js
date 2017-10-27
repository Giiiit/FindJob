//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
var WxParse = require('../../wxParse/wxParse.js');
 

Page({
  data: {
    userInfo: {},

    winWidth: 0,
    winHeight: 0,
    
    content:''
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    /**
     * 初始化emoji设置
     */
    WxParse.emojisInit('[]', "/wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
    });
    wx.request({
      url: url + 'wechat/jw/aboutUs',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {},
      success: function (res) {
        let data = res.data
        console.log(data.data);
        console.log(11223344);
        if (data.status == '0') {
          // WxParse.wxParse('article', 'html', data.data, that, 5);
           that.setData({
             content: data.data
           });
        }
      }
    })
  }
})
