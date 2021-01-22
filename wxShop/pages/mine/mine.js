const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    funcArr: [{"icon": "/image/icon_order.png","title": "我的订单"},
              {"icon": "/image/icon_quan.png","title": "领取优惠券"}, 
              {"icon": "/image/icon_quan.png","title": "已领取优惠券"},
              {"icon": "/image/icon_dizhi.png","title": "地址管理"},
              {"icon": "/image/icon_about.png","title": "关于商城"}, 
              {"icon": "/image/icon_qrcode.png","title": "扫码进行投诉"}],
  },

  onLoad: function (options) {
    this.checkUserInfo();
  },

  funcItemTap:function (event) {
    let index = event.target.dataset.index
    if (index == 1)
    {
      wx.navigateTo({
        url: 'coupon/coupon',
      })
    }else if (index == 4){
      wx.navigateTo({
        url: 'about/about',
      })
    }
  },

  checkUserInfo:function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})