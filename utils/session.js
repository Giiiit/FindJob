function csession(phone,code) {
  wx.request({
    url: '',
    method: 'POST',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      mobile: phone,
      code: code
    },
    success: function (res) {
      if (res.status == '0') {
      }
    }
  })
}

module.exports = {
  aaa: csession
}