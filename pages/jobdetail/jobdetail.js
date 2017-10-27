//index.js
var imageUtil = require('../../utils/util.js');
var timeUtil = require('../../utils/timeUtil.js');
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
var sessionId = "";
var recruitId = '';
var title = '';
var newphone = '';
Page({
  data: {
    userInfo: {},
    mark2: '../../images/mark2.png',

    winWidth: 0,
    winHeight: 0,
    slide: slide,
    imglist: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hide: false,
    detailid:'',
    userId:'',

    recruitId: '',
    title: '',
    // jcompanyEconomicId: '',
    // jcontact: '',
    // jmobile: '',
    subsidy: '',
    subsidyDescription: '',
    salaryDescription: '',
    positionDescription: '',
    minSalary:'',
    maxSalary: '',
    enrollCount: '',
    companyName: '',
    address: '',
    companyLabel: '',
    information: '',
    attention:'',
    isEnroll:'',
    officialphone:'',
    economicphone:'',
    economicname: '',
    myname: '',
    myphone:'',
    comlabelInfo: '',

    id: '',
    result: [],
    end_time: '',
    clock: '',

    disabled: true,
    codeDis: true,
    phoneCode: "获取验证码",
    name: '',
    telephone: "",
    code: "",

    btnB:true,

    showModalA: false,
    showModalB: false,
    showModalC: false

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
    /**
     * 初始化emoji设置
     */
    WxParse.emojisInit('[]', "/wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
    })
    wx.request({
      url: url + 'wechat/jw/selectRecruitInfo',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: { 
        userId: wx.getStorageSync('userId'),
        recruitId: recruitId,
      },
      success: function (res) {
        let data = res.data
        var imglist = []
        if (data.status == '0') {
          // WxParse.wxParse('article', 'html', data.data, that, 5);
          for (var i = 0; i < data.data.imgList.length; i++) {
            imglist.push(data.data.imgList[i]);
          }
          var label = [];
          label = data.data.recruitInfo.companyLabel.split(',');
          that.setData({
            imglist: imglist,
            recruitId: data.data.recruitInfo.recruitId,
            title: data.data.recruitInfo.title,
            // jcompanyEconomicId: data.data.recruitInfo.companyEconomicId,
            // jcontact: data.data.recruitInfo.contact,
            // jmobile: data.data.recruitInfo.mobile,
            subsidy: data.data.recruitInfo.subsidy,
            subsidyDescription: data.data.recruitInfo.subsidyDescription,
            salaryDescription: data.data.recruitInfo.salaryDescription,
            positionDescription: data.data.recruitInfo.positionDescription,
            minSalary: data.data.recruitInfo.minSalary,
            maxSalary: data.data.recruitInfo.maxSalary,
            enrollCount: data.data.recruitInfo.enrollCount,
            companyName: data.data.recruitInfo.companyName,
            address: data.data.recruitInfo.address,
            companyLabel: label,
            information: data.data.recruitInfo.information,
            attention: data.data.attention,
            isEnroll: data.data.isEnroll,
            comlabelInfo: data.data.recruitInfo.companyLabel
          });
        }

      }
    })
    
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  focus: function() {
    var that = this;
    wx.request({
      url: url +'wechat/jw/attentionRecruit',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        userId: wx.getStorageSync('userId'),
        recruitId: recruitId
      },
      success: function(res){
        let data = res.data
        if (data.status == "0") {
          wx.showToast({
            title: '已关注',
            icon: "success",
            duration: 1500,
          })
          that.setData({
            attention:1
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
  unfocus: function () {
    var that = this;
    wx.request({
      url: url + 'wechat/jw/deleteAttention',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId'),
        recruitId: recruitId
      },
      success: function (res) {
        let data = res.data
        if (data.status == "0") {
          wx.showToast({
            title: '取消关注',
            icon: "success",
            duration: 1500,
          })
          that.setData({
            attention: 0
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
  answerlist: function () {
    wx.navigateTo({
      url: '../questionlist/questionlist?id=' + recruitId + '&title=' + title
    })
  },
  /**
     * 弹窗A
     */
  showDialogBtn: function () {
    var _this = this
    wx.request({
      url: url + 'wechat/jw/showUserMessage',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: function (res) {
        let data = res.data
        if (data.status == "0") {
          _this.setData({
            myname: data.data.contact,
            myphone: data.data.mobile
          })
        }
      }
    })
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
  onConfirmA: function (e) {
    var that = this
    wx.request({
      url: url + 'wechat/jw/submitEnroll',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId'),
        userEconomicId: wx.getStorageSync('userEconomicId'),
        recruitId: recruitId,
        phone: newphone
      },
      success: function (res) {
        let data = res.data
        if (data.status == "0") {
          wx.showToast({
            title: '报名成功',
            icon: "loading",
            duration: 2000,
          })
          that.setData({
            isEnroll: 1
          })
          return
        }
      }
    })
    this.hideModalA();
  },
  /**
     * 弹窗B
     */
  showDialogBtnB: function () {
    this.setData({
      showModalB: true
      // showModalA: false
    });
  },
  /**
   * 隐藏模态对话框B
   */
  hideModalB: function () {
    this.setData({
      showModalB: false
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件B
   */
  preventTouchMoveB: function () {
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancelB: function () {
    this.hideModalB();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirmB: function () {
    var _this = this
    wx.request({
      url: url + 'wechat/jw/updateMobile',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        mobile: _this.data.telephone,
        code: _this.data.code,
        sessionId: wx.getStorageSync('code')
      },
      success: function (res) {
        let data = res.data
        if (data.status == "0") {
          _this.setData({
            myphone: _this.data.telephone
          })
          newphone = _this.data.telephone
          _this.hideModalB();
          
        }else {
          wx.showToast({
            title: data.message,
            icon: "loading",
            duration: 1500
          })
        }
      }
    })
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
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          mobile: _this.data.telephone
        },
        success: function (res) {
          let data = res.data
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
            wx.setStorageSync('code', data.data.sessionId);
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
  phoneinput(e) {
    let value = e.detail.value
    console.log(value)
    this.setData({
      telephone: value,
      codeDis: false
    })
    if (this.data.code.length != 0 && this.data.telephone.length == 11) {
      this.setData({
        btnB: false
      })
    } else {
      this.setData({
        btnB: true
      })
    }
  },
  codeinput(e) {
    let value = e.detail.value
    console.log(value)
    this.setData({
      code: value
    })
    if (this.data.code.length != 0 && this.data.telephone.length ==11) {
      this.setData({
        btnB: false
      })
    } else {
      this.setData({
        btnB: true
      })
    }
  },

  /**
     * 弹窗C
     */
  myContractor: function () {
    var that = this
    that.setData({
      showModalC: true,
    });
    wx.request({
      url: url + 'wechat/jw/freeConsultation',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        //userEconomicId: wx.getStorageSync('userEconomicId')
        userEconomicId: 1
      },
      success: function (res) {
        let data = res.data
        if (data.status == "0") {
          that.setData({
            officialphone: data.data.phone,
            economicphone: data.data.mobile,
            economicname: data.data.contact
          })
        }
      }
    })
  },
  // 打电话
  callEco:function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.eco
    })
  },
  callOff: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.off
    })
  },
  /**
   * 隐藏模态对话框C
   */
  hideModalC: function () {
    this.setData({
      showModalC: false
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件C
   */
  preventTouchMoveC: function () {
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancelC: function () {
    this.hideModalC();
  },

})
