//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone:'',
    name:'',
    disabled: true,
    suglist: [],

    pic: '../../images/yhmrtx.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this
    wx.request({
      url: url + 'wechat/jw/selectRecommendList',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {},
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
  },
  suggest: function(){
    var _this = this
    wx.request({
      url: url + 'fore/jw/recommendFriend',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        friendName: _this.data.name,
        friendMobile: _this.data.telephone,
        userId: wx.getStorageSync('userId')
      },
      success: function (res) {
        let data = res.data;
        if (data.status == '0') {
          wx.showToast({
            title: '推荐成功',
            icon: "success",
            duration: 1000
          })
        } else {
          wx.showToast({
            title: data.message,
            icon: "loading",
            duration: 1500
          })
        }
      }
    })
  },
  phoneinput(e) {
    console.log(e)
    let value = e.detail.value
    console.log(value)
    this.setData({
      telephone: value
    })
    if (this.data.telephone.length != 0 && this.data.name.length != 0) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  nameinput(e) {
    console.log(e)
    let value = e.detail.value
    console.log(value)
    this.setData({
      name: value
    })
    if (this.data.telephone.length != 0 && this.data.name.length != 0) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
})