var api = require('../../utils/api');
Page({
  data: {
    adArr: [],
    categoryArr: [],
    callImgDic: {},
    shopInfoDic: {},
    saomaDic: {},
    integralMallPicDic: {},
    newUserDic: {},
    recommendArr: [],
    floor1TitleImg: {},
    floor1ImgArr: [],
    floor2TitleImg: {},
    floor2ImgArr: [],
    floor3TitleImg: {},
    floor3ImgArr: [],
    currentPage : 1,
    goodsArr: [],
  },
  onLoad: function (options) {
    this.dataRequest();
    this.goodsRequest(1);
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
          floor1TitleImg: res.data.data.floor1Pic,
          floor1ImgArr: res.data.data.floor1,
          floor2TitleImg: res.data.data.floor2Pic,
          floor2ImgArr: res.data.data.floor2,
          floor3TitleImg: res.data.data.floor3Pic,
          floor3ImgArr: res.data.data.floor3,
        })
      }
    })
  },

  goodsRequest: function (page) {
    var that = this;
    wx.showToast({
      title: '数据加载中',
      icon: "loading",
    })

    if (page == 1) {
      this.setData({
        goodsArr: [],
      })
    }

    api.request({
      url: 'homePageBelowConten',
      data: {
        'page': page,
      },
      method: 'POST',
      success: function (res) {
        //结束下拉刷新
        wx.stopPullDownRefresh();
        //结束加载框
        wx.hideToast();

        that.setData({
          goodsArr: that.data.goodsArr.concat(res.data.data),
        })

        if (res.data.data.length > 0) {
          that.setData({
            currentPage: page
          })
        }
      },
    })
  },

  //列表滑动到最底部
  bindscrolltolower: function () {
    console.log('加载更多加载更多加载更多加载更多加载更多加载更多加载更多加载更多')
    this.goodsRequest(this.currentPage + 1);
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.dataRequest();
    this.goodsRequest(1);
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