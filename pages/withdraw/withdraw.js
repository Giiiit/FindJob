var tcity = require("../../utils/citys.js");
var img = require("../../utils/util.js");
//获取应用实例
var app = getApp();
var url = getApp().globalData.url;
var slide = getApp().globalData.slide;
Page({
  data: {
    realName:'',
    bankAccount:'',
    bankName: '',
    openArea : '',
    openBank: '',
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    cover: true,
    urlFront:'',
    urlBack:''
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
    wx.showLoading({
      title: '加载中',
    })

    tcity.init(that);

    var cityData = that.data.cityData;

    var t = this.data.values;
    console.log(1111111111111111);
    console.log(t);
    
    var province = '';
    var city = '';
    var county = '';
    province = cityData[t[0]].areaName;
    console.log('province=' + province);
    city = cityData[t[0]].cities[t[1]].areaName;
    county = cityData[t[0]].cities[t[1]].counties[t[2]].areaName;

    that.setData({
      'province': province,
      'city': city,
      'county': county
    })
    console.log('初始化完成');
    wx.hideLoading();

    // 信息展示
    wx.request({
      url: url + 'wechat/jw/selectWithdrawInfo',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: function (res) {
        let data = res.data;
        console.log("selectWithdrawInfo11111111111");
        var location = data.data.openAreaLocation.split(",");
        
        var cityData = that.data.cityData;
        const provinces = [];
        const citys = [];
        const countys = [];
        for (let i = 0; i < cityData.length; i++) {
          provinces.push(cityData[i].areaName);
        }
        console.log('省份完成');
        for (let i = 0; i < cityData[location[0]].cities.length; i++) {
          citys.push(cityData[location[0]].cities[i].areaName)
        }
        console.log('city完成');
        for (let i = 0; i < cityData[location[0]].cities[location[1]].counties.length; i++) {
          countys.push(cityData[location[0]].cities[location[1]].counties[i].areaName)
        }
        
        if (data.status == '0') {
          that.setData({
            realName: data.data.realName,
            bankAccount: data.data.bankAccount,
            bankName: data.data.bankName,
            openArea: data.data.openArea,
            openBank: data.data.openBank,
            urlFront: data.data.urlFront,
            urlBack: data.data.urlBack,
            value: location,
            values: location,
            province: cityData[location[0]].areaName,
            city: cityData[location[0]].cities[location[1]].areaName,
            county: cityData[location[0]].cities[location[1]].counties[location[2]].areaName,
            provinces: provinces,
            citys: citys,
            countys: countys
          });
        }
        console.log("select   vals=" + location);
        console.log("select   openArea=" + data.data.openArea);
      }
    })
  },
  bindChange: function(e) {
    //console.log(e);
    var val = e.detail.value
    var vals = this.data.values;
    console.log("val=" + val);
    console.log("vals=" + vals);
    var cityData = this.data.cityData;
    
    if (val[0] != vals[0]){
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0 ; i < cityData[val[0]].cities.length; i++) {
        citys.push(cityData[val[0]].cities[i].areaName)
      }
      for (let i = 0; i < cityData[val[0]].cities[0].counties.length; i++) {
        countys.push(cityData[val[0]].cities[0].counties[i].areaName)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].cities[0].areaName,
        citys:citys,
        openArea: cityData[val[0]].cities[0].counties[0].areaId,
        county: cityData[val[0]].cities[0].counties[0].areaName,
        countys:countys,
        values: val,
        value:[val[0],0,0]
      })
      console.log('openArea 1 no=' + this.data.openArea);
      return;
    }
    if (val[1] != vals[1]){
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].cities[val[1]].counties.length; i++) {
        countys.push(cityData[val[0]].cities[val[1]].counties[i].areaName)
      }
      
      this.setData({
        city: this.data.citys[val[1]],
        openArea: cityData[val[0]].cities[val[1]].counties[0].areaId,
        county: cityData[val[0]].cities[val[1]].counties[0].areaName,
        countys: countys,
        values: val,
        value:[val[0],val[1],0]
      })
      console.log('openArea 2 no=' + this.data.openArea);
      return;
    }
    if (val[2] != vals[2]){
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        openArea: cityData[val[0]].cities[val[1]].counties[val[2]].areaId,
        values: val,
        value: [val[0], val[1], val[2]]
      })
      console.log('openArea 3 no=' + this.data.openArea);
      console.log('openArea 3 values=' + this.data.values.toString());
      return;
    }
    

  },
  open:function(){
    console.log(this.data.values);
    this.setData({
      condition:!this.data.condition,
      cover:!this.data.cover
    })
    console.log('openArea 4 no=' + this.data.openArea);
  },
  nameinput(e){
    console.log(e)
    let value = e.detail.value
    console.log(value)
    this.setData({
      realName: value
    })
  },
  cardinput(e) {
    console.log(e)
    let value = e.detail.value
    console.log(value)
    this.setData({
      bankAccount: value
    })
  },
  bankinput(e) {
    console.log(e)
    let value = e.detail.value
    console.log(value)
    this.setData({
      bankName: value
    })
  },
  openbankinput(e) {
    console.log(e)
    let value = e.detail.value
    console.log(value)
    this.setData({
      openBank: value
    })
  },
  preventTouchMove: function () {
  },
  // 图片
  // 正面
  add: function () {
    var _this = this
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        _this.setData({
          urlFront: res.tempFilePaths
        })
        
        console.log('123----'+res.tempFilePaths)
      },
    })
  },
  // 背面
  add2: function () {
    var _this = this
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        _this.setData({
          urlBack: res.tempFilePaths
        })
        console.log('1111----' + res.tempFilePaths)
      },
    })
  },
  save: function(e) {
    var that= this
    if (that.data.realName == '' || that.data.bankAccount == '' || that.data.bankName == '' || that.data.openBank == '' || e.currentTarget.dataset.front == '' || e.currentTarget.dataset.back == ''){
      wx.showToast({
        title: '资料须全部填写',
        icon:'loading'
      })
    }else{
      wx.request({
        url: url + 'wechat/jw/submitWithdrawInfo',
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          id: wx.getStorageSync('userId'),
          realName: that.data.realName,
          bankAccount: that.data.bankAccount,
          bankName: that.data.bankName,
          openArea: that.data.openArea,
          openAreaLocation: that.data.values.toString(),
          openBank: that.data.openBank,
          urlFront: e.currentTarget.dataset.front,
          urlBack: e.currentTarget.dataset.back
        },
        success: function (res) {
          let data = res.data
          var imglist = []
          if (data.status == '0') {
            wx.showToast({
              title: '保存成功',
              icon:'success'
            })
            wx.navigateBack()
          } else {
            wx.showToast({
              title: data.message,
              icon:'loading'
            })
          }

        }
      })

    }
  }
})  