var api = require('../../utils/api');
Page({
  data: {
    homeData:{},
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
    api.request({
      url: 'homePageContent',
      data: {
        'lon': '115.02932',
        'lat': '35.76189'
      },
      success: function (res) {
        that.setData({
          homeData: res.data.data,
        })
      }
    })
  },

  goodsRequest: function (page) {
    if (!this.data.canLoadMoreData){
      wx.showToast({
        title: '没有更多数据了',
      })
      return;
    }
    var that = this;
    wx.showToast({
      title: '数据加载中',
      icon: "loading",
    })
    if (page == 1) {
      this.data.goodsArr = [];
    }
    api.request({
      url: 'homePageBelowConten',
      data: {
        'page': page,
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        wx.hideToast();
        if (res.data.data != null && res.data.data.length > 0) {
          that.setData({
            currentPage: page,
            goodsArr: that.data.goodsArr.concat(res.data.data),
          })
        }else{
          that.data.canLoadMoreData = false;
        }
      },
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

  saomaTap: function(){

  },

  integralMallTap: function(){

  },

  newUserTap: function(){

  },

  onRecommendTap: function(e){
    let goodsId = e.currentTarget.dataset.id;
    this.gotoGoodsDetail(goodsId);
  },

  gotoGoodsDetail:function(goodsId){
    if (!goodsId) {return;}
    wx.navigateTo({
      url: 'goodsDetail/goodsDetail?goodsId='+goodsId,
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