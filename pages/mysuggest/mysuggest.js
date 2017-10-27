//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suglist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this
    wx.request({
      url: url + 'wechat/jw/selectRecommendListByUserId',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: function (res) {
        let data = res.data
        var suglist = []
        if (data.status == '0') {
          for (var i = 0; i < data.data.length; i++) {
            suglist.push(data.data[i]);
          }
          _this.setData({
            suglist: suglist
          });
        }

      }
    })
  }

})