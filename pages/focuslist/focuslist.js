//index.js
var imageUtil = require('../../utils/util.js');
//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
Page({
  data: {
    userInfo: {},
    butie: '../../images/add.png',
    hot: '../../images/hot.png',
    winWidth: 0,
    winHeight: 0,

    focuslist: []
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: url + 'wechat/jw/selectAttentionList',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: function (res) {
        let data = res.data
        var joblist = []
        if (data.status == '0') {
          for (var i = 0; i < data.data.length; i++) {
            if (null != res.data.data[i].companyLabel && '' != res.data.data[i].companyLabel) {
              res.data.data[i].companyLabel = res.data.data[i].companyLabel.split(",");
            }
            focuslist.push(res.data.data[i]);
          }
          that.setData({
            focuslist: joblist
          });
        }
      }
    })
  },
  todetail: function () {
    wx.navigateTo({
      url: '../jobdetail/jobdetail?id=' + recruitId + '&title=' + e.currentTarget.dataset.title
    })
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }

})
