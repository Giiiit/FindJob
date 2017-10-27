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
    slide: slide,
    winWidth: 0,
    winHeight: 0,

    joblist: []
  },
  onLoad: function (options) {
    var that = this
    var id = options.id
    var title = options.title
    wx.setNavigationBarTitle({
      title: title
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    wx.request({
      url: url + 'wechat/jw/selectRecruitByCompanyId',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        companyId: id,
      },
      success: function (res) {
        let data = res.data
        var joblist = []
        if (data.status == '0') {
          for (var i = 0; i < data.data.length; i++) {
            if (null != data.data[i].companyLabel && '' != data.data[i].companyLabel) {
              data.data[i].companyLabel = data.data[i].companyLabel.split(",");
            }
            joblist.push(data.data[i]);
          }
          that.setData({
            joblist: joblist
          });
        }

      }
    })
  },
  todetail: function (e) {
    var jobid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../jobdetail/jobdetail?id=' + jobid + '&title=' + e.currentTarget.dataset.title
    })
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },

})
