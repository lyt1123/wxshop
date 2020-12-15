var api = require('../../utils/api');
Page({
  data: {
    adArr: [],
    categoryArr:[],
    callImgDic:{},
    shopInfoDic:{},
    saomaDic:{},
    integralMallPicDic:{},
    newUserDic:{},
    recommendArr:[],
  },
  onLoad: function (options) {
    this.dataRequest();
  },

  dataRequest: function () {
    var that = this;
    api.request({
      url: 'homePageContent',
      data: {
        'lon': '115.02932',
        'lat': '35.76189'
      },
      method: "POST",
      success: function (res) {
        that.setData({
          adArr: res.data.data.slides,
          categoryArr: res.data.data.category,
          callImgDic: res.data.data.advertesPicture,
          shopInfoDic: res.data.data.shopInfo,
          saomaDic: res.data.data.saoma,
          integralMallPicDic: res.data.data.integralMallPic,
          newUserDic: res.data.data.newUser,
          recommendArr: res.data.data.recommend,
        })
      }
    })
  },
  onSwiperTap: function (event) {
    var id = event.target.dataset.id;
    console.log(id);
    // wx.navigateTo({});
  },
  onShareAppMessage() {
    return {
      title: '首页',
      path: 'page/home/home'
    }
  }
})