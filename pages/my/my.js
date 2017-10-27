var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
Page({
    data:{
        yhbj:'../../images/yonghubj.jpg',
        pic:'../../images/yhmrtx.png',
        contact:'',
        phone:'',
        account:'',
        userId:'',
        withdrawAmount:''
    },
    onLoad: function () {
      var that = this
      wx.showLoading({
        title: '加载中',
      })
      that.setData({
        userId: wx.getStorageSync('userId'),
        contact: wx.getStorageSync('contact'),
        account: wx.getStorageSync('account'),
        phone: wx.getStorageSync('phone'),
      })
      console.log(wx.getStorageSync('userId'))
      wx.hideLoading()
    },

    onShow: function () {
      var that = this
      that.setData({
        userId: wx.getStorageSync('userId'),
        contact: wx.getStorageSync('contact'),
        account: wx.getStorageSync('account'),
        phone: wx.getStorageSync('phone'),
      })
    },
    logout: function () {
      var that = this
      wx.showModal({
        title: '提示',
        content: '确定要退出吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.clearStorage();
            that.setData({
              userId: wx.getStorageSync('userId'),
              contact: wx.getStorageSync('contact'),
              account: wx.getStorageSync('account'),
              phone: wx.getStorageSync('phone'),
            })
            wx.switchTab({
              url: '../home/home',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    login: function (){
      wx.navigateTo({
        url: '../login/login',
      })
    },
    myaccount: function () {
      wx.navigateTo({
        url: '../myaccount/myaccount',
      })
    },
    mysuggest: function() {
      wx.navigateTo({
        url: '../mysuggest/mysuggest',
      })
    },
    aboutus: function (){
      wx.navigateTo({
        url: '../aboutus/aboutus',
      })
    },
    focuslist: function () {
      wx.navigateTo({
        url: '../focuslist/focuslist',
      })
    },
    chooseimg: function () {
      var _this = this
      if (wx.getStorageSync('userId') != '') {
        wx.chooseImage({
          count: 9, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function (res) {
            // success
            _this.setData({
              pic: res.tempFilePaths
            })
            wx.request({
              url: url + 'wechat/jw/updateUserUrl',
              method: 'POST',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
                userId: wx.getStorageSync('userId'),
                url: res.tempFilePaths
              },
              success: function (res) {
                let data = res.data
                var cashlist = []
                if (data.status == '0') {
                  wx.showToast({
                    title: '保存成功',
                    icon:'loading'
                  })
                }else{
                  wx.showToast({
                    title: data.message
                  })
                }

              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '请登录'
        })
      }
    }
    
})