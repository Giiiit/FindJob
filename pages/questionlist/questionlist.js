//index.js
var imageUtil = require('../../utils/util.js');
var toDate = require('../../utils/util.js');
//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
var recruitId = '';
var title = '';
Page({
  data: {
    userInfo: {},

    winWidth: 0,
    winHeight: 0,

    questionlist: [],

    pic: '../../images/yhmrtx.png'
  },
  onLoad: function (options) {
    var that = this
    recruitId = options.id
    title = options.title
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
    })
    wx.request({
      url: url + 'wechat/jw/selectQuestionList',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        recruitId: recruitId
      },
      success: function (res) {
        let data = res.data
        var questionlist = []
        if (data.status == '0') {
          for (var i = 0; i < data.data.length; i++) {
            res.data.data[i].askTime = toDate.toDateFromMs(res.data.data[i].askTime, 'Y-M-D h:m:s');
            questionlist.push(res.data.data[i]);
          }
          that.setData({
            questionlist: questionlist
          });
        }
      }
    })
  },
  ask: function () {
    wx.navigateTo({
      url: '../ask/ask?id=' + recruitId + '&title=' + title
    })
  },

})
