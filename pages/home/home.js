//index.js
var imageUtil = require('../../utils/util.js');
var listUtil = require('../../utils/listUtil.js')
//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
Page({
  data: {
    userInfo: {},
    butie: '../../images/add.png',
    hot: '../../images/hot.png',
    loadingImg: '../../images/loading.gif',
    winWidth: 0,
    winHeight: 0,
    slide: slide,

    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hide: false,

    imgUrl: [],
    comlist:[],
    joblist: []
  },
  onLoad: function () {
    var _this = this
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.showLoading({
      title: '加载中'
    })
    // 轮播图
    wx.request({
      url: url+'wechat/jw/selectImage',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {},
      success: function (res) {
        let data = res.data
        var imgUrl = []
        if(data.status == '0'){
          for (var i = 0; i < data.data.length;i++){
            imgUrl.push(res.data.data[i]);
          }
          _this.setData({
            imgUrl: imgUrl
          });

          // 总列表
          wx.request({
            url: url + 'wechat/jw/selectRecruitList',
            method: 'POST',
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {},
            success: function (res) {
              let data = res.data
              var joblist = []
              if (data.status == '0') {
                for (var i = 0; i < data.data.length; i++) {
                  if (null != res.data.data[i].companyLabel && '' != res.data.data[i].companyLabel) {
                    res.data.data[i].companyLabel = res.data.data[i].companyLabel.split(",");
                  }
                  joblist.push(res.data.data[i]);
                }
                _this.setData({
                  joblist: joblist
                });

                // 推荐企业
                wx.request({
                  url: url + 'wechat/jw/selectDisplayCompany',
                  method: 'POST',
                  header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  data: {},
                  success: function (res) {
                    let data = res.data;
                    var comlist = []
                    if (data.status == '0') {
                      for (var i = 0; i < data.data.length; i++) {
                        comlist.push(res.data.data[i]);
                      }
                      _this.setData({
                        comlist: comlist
                      });

                      wx.hideLoading()
                    }
                  }
                })
              }
            }
          });
        }
      }
    });
  },
  tolist: function (e) {
    wx.navigateTo({
      url: '../joblist/joblist?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title
    })
  },
  todetail:function(e){
    var jobid = e.currentTarget.dataset.jobid
    console.log(jobid)
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

  suggest: function(){
    wx.navigateTo({
      url: '../suggest/suggest',
    })
  }
})
