var setSession = require('../../utils/session.js')
//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
var wxcode = getApp().globalData.wxcode;
var sessionId = "";
Page({
  data: {
    disabled: true,
    codeDis: true,
    phoneCode: "获取验证码",
    name:'',
    telephone: "",
    code: ""
  },
  getCode() {
    var _this = this
    let telephone = _this.data.telephone
    if (telephone.length != 11 || isNaN(telephone)) {
      wx.showToast({
        title: '手机号错误',
        icon: "loading",
        duration: 1500
      })
      return
    } else {
      _this.setData({
        codeDis: true
      })
      //发送短信验证码
      wx.request({
        url: url + 'fore/jw/getValidateCode',
        method: 'POST',
        crossDomain: true,
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },  
        data: {
          mobile: _this.data.telephone
        },
        success: function (res) {
          let data = res.data;
          console.log(data);
          if (data.status == "0") {
            wx.showToast({
              title: '发送成功',
              icon: "success",
              duration: 1500
            })
            _this.setData({
              codeDis: true,
              phoneCode: 60
              
            })
            sessionId = data.data.sessionId;
            console.log("seff2=" + sessionId);
            let time = setInterval(() => {
              let phoneCode = _this.data.phoneCode
              phoneCode--
              _this.setData({
                phoneCode: phoneCode
              })
              if (phoneCode == 0) {
                clearInterval(time)
                _this.setData({
                  phoneCode: "获取验证码",
                  codeDis: false
                })
              }
            }, 1000)
          } else {
            _this.setData({
              codeDis: false
            })
            wx.showToast({
              title: data.message,
              icon: "loading",
              duration: 1500
            })
          }
        }
      })

    }
  },
  login:function(){
    var _this = this
    wx.request({
      url: url + 'fore/jw/loginMember',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        contact: _this.data.contact,
        mobile: _this.data.telephone,
        code: _this.data.code
      },
      success: function (res) {
        let data = res.data;
        if (data.status == '0') {
          wx.showToast({
            title: '登录成功',
            icon: "success",
            duration: 1000
          }),
          wx.setStorageSync('phone', data.data.mobile),
          wx.setStorageSync('code', sessionId),
          wx.setStorageSync('userId', data.data.id),
          wx.setStorageSync('account', data.data.account),
          wx.setStorageSync('contact', _this.data.contact),
          wx.setStorageSync('userEconomicId', data.data.userEconomicId),
          wx.switchTab({
            url: '../my/my',
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
  registar:function () {
    var _this = this
    wx.request({
      url: url + 'fore/jw/saveMember',
      method: 'POST',
      crossDomain:true,
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        contact: _this.data.contact,
        mobile: _this.data.telephone,
        code: _this.data.code,
        sessionId: sessionId
      },
      success: function (res) {
        let data = res.data;
        if (data.status == '0'){
          wx.showToast({
            title: '注册成功'
          })
          wx.showLoading({
            title: '自动登录'
          })
          wx.setStorageSync('phone', data.data.mobile),
          wx.setStorageSync('code', sessionId),
          wx.setStorageSync('userId', data.data.id),
          wx.setStorageSync('account', data.data.account),
          wx.setStorageSync('contact', _this.data.contact),
          wx.setStorageSync('userEconomicId', data.data.userEconomicId),
          wx.hideLoading()
          wx.switchTab({
            url: '../my/my',
          })
        }
      }
    })
  },
  nameinput(e) {
    let value = e.detail.value
    this.setData({
      contact: value
    })
    if (this.data.contact.length != 0 && this.data.telephone.length != 0 && this.data.code.length != 0) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  phoneinput(e) {
    let value = e.detail.value
    console.log(value)
    this.setData({
      telephone: value
    })
    if (this.data.telephone.length != 0){
      this.setData({
        codeDis: false
      })
    } else {
      this.setData({
        codeDis: true
      })
    }
    if (this.data.contact.length != 0 && this.data.telephone.length != 0 && this.data.code.length != 0) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  codeinput(e) {
    let value = e.detail.value
    console.log(value)
    this.setData({
      code: value
    })
    if (this.data.contact.length != 0 && this.data.telephone.length != 0 && this.data.code.length != 0) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  }
})  