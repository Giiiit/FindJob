//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
var recruitId = '';
var title = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    recruitId = options.id
    title = options.title
    wx.setNavigationBarTitle({
      title: title
    })
    
  },

  toask: function(){
    var _this = this
    wx.request({
      url: url + 'wechat/jw/submitAskQuestion',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId'),
        content: _this.data.content,
        recruitId: recruitId
      },
      success: function (res) {
        let data = res.data;
        if(data.status == '0'){
          wx.showToast({
            title: '提交成功',
            icon: "success",
            duration: 1500,
            complete: function(){
              wx.navigateBack()
            }
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
  ask(e) {
    let value = e.detail.value
    this.setData({
      content: value
    })
    if (this.data.content.length != 0) {
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