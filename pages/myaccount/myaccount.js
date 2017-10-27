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
    cashlist: [],
    money:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: url + 'wechat/jw/showUserInfo',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: function (res) {
        let data = res.data
        if (data.status == '0') {
          money: data.data.account
        }
      }
    })
    wx.request({
      url: url + 'wechat/jw/selectWithdrawRecord',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: function (res) {
        let data = res.data
        var cashlist = []
        if (data.status == '0') {
          for (var i = 0; i < data.data.length; i++) {
            cashlist.push(data.data[i]);
          }
          _this.setData({
            cashlist: cashlist
          });
        }

      }
    })
    wx.hideLoading()
  },

  withdraw: function () {
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  },

  cashinput: function () {
    // this.setData({
      var moneya= e.detail.value
    // })
  },
  /**
   * 提现弹窗
   */
  getMoney: function () {
    this.setData({
      showModalA: true
    })
  },
  /**
   * 隐藏模态对话框A
   */
  hideModalA: function () {
    this.setData({
      showModalA: false
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件A
   */
  preventTouchMoveA: function () {
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancelA: function () {
    this.hideModalA();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirmA: function () {
    var _this = this

    wx.request({
      url: url + 'fore/jw/applyWithdraw',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId'),
        withdrawAmount: moneya
      },
      success: function (res) {
        let data = res.data
        if (data.status == "0") {
          wx.showToast({
            title: 提现成功,
            icon: "loading",
            duration: 2000
          })
          wx.showLoading({
            title: '加载中'
          })
          wx.request({
            url: url + 'wechat/jw/showUserInfo',
            method: 'POST',
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
              userId: wx.getStorageSync('userId')
            },
            success: function (res) {
              let data = res.data
              if (data.status == '0') {
                money: data.data.account
              }
              wx.request({
                url: url + 'wechat/jw/selectWithdrawRecord',
                method: 'POST',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                  userId: wx.getStorageSync('userId')
                },
                success: function (res) {
                  let data = res.data
                  var cashlist = []
                  if (data.status == '0') {
                    for (var i = 0; i < data.data.length; i++) {
                      cashlist.push(data.data[i]);
                    }
                    _this.setData({
                      cashlist: cashlist
                    });
                  }
                  wx.hideLoading()
                  this.hideModalA();
                }
              })
            }
          })
        }
      }
    })
  }
})