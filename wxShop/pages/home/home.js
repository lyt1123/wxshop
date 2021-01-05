import api from "../../utils/api";
Page({
  data: {
    homeData: {},
    currentPage: 1,
    goodsArr: [],
    canLoadMoreData: true,
  },
  onLoad: function (options) {
    this.dataRequest();
    this.goodsRequest(1);
  },

  dataRequest: function () {
    var that = this;
    api.promiseRequest({
      url: 'homePageContent',
      data: {
        'lon': '115.02932',
        'lat': '35.76189'
      },
    }).then(res => {
      that.setData({
        homeData: res,
      })
    })
  },

  goodsRequest: function (page) {
    if (!this.data.canLoadMoreData) {
      wx.showToast({
        title: '没有更多数据了',
      })
      return;
    }
    var that = this;
    if (page == 1) {
      this.data.goodsArr = [];
    }

    api.promiseRequest({
      url: 'homePageBelowConten',
      data: {
        'page': page,
      },
    }).then(res => {
      wx.stopPullDownRefresh();
      wx.hideToast();
      if (res != null && res.length > 0) {
        that.setData({
          currentPage: page,
          goodsArr: that.data.goodsArr.concat(res),
        })
      } else {
        that.data.canLoadMoreData = false;
      }
    })
  },

  //列表滑动到最底部
  onReachBottom: function () {
    this.goodsRequest(this.data.currentPage + 1);
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.data.canLoadMoreData = true;
    this.dataRequest();
    this.goodsRequest(1);
  },

  onSwiperTap: function (event) {
    let id = event.target.dataset.id;
    this.gotoGoodsDetail(id)
  },

  // saomaTap: function(){

  // },

  // integralMallTap: function(){

  // },

  // newUserTap: function(){

  // },


  onRecommendTap: function (e) {
    let goodsId = e.currentTarget.dataset.id;
    this.gotoGoodsDetail(goodsId);
  },

  goodsClickTap: function (e) {
    let goodsId = e.currentTarget.dataset.id;
    this.gotoGoodsDetail(goodsId);
  },

  gotoGoodsDetail: function (goodsId) {
    if (!goodsId) {
      return;
    }
    wx.navigateTo({
      url: 'goodsDetail/goodsDetail?goodsId=' + goodsId,
      // success:function(res){
      //   res.eventChannel.emit('goodsId',{data: goodsId});
      // }  
    })
  },

  onShareAppMessage() {
    return {
      title: '首页',
      path: 'page/home/home'
    }
  }
})