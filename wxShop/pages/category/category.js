var api = require('../../utils/api');
Page({
  data: {
    leftNavArr: [],
    leftNavSelIndex: 0,
    topNavArr: [],
    topNavSelIndex: 0,
    navGoodsArr: [],
    currentPage: 1,
    goodsScrollHeight: 550,
    canLoadMoreData: true,
  },
  onLoad: function () {
    this.requestLeftNav();
  },

  requestLeftNav: function () {
    wx.showToast({
      title: '数据加载中',
      icon: "loading",
    })
    api.promiseRequest({
      url: 'getCategory',
    }).then(res => {
      wx.hideToast();
      let tempArr = [{'mallSubId':'','mallSubName':'全部'}];
      this.setData({
        leftNavArr: res.data,
        topNavArr: tempArr.concat(res.data[0].bxMallSubDto),
      })
      this.requestNavGoods(1);
    })
  },

  leftNavTap:function(e){
    let index = e.target.dataset.index;
    let tempArr = [{'mallSubId':'','mallSubName':'全部'}];
    this.setData({
      leftNavSelIndex: index,
      topNavArr: tempArr.concat(this.data.leftNavArr[index].bxMallSubDto),
      topNavSelIndex: 0,
    })
    this.data.canLoadMoreData = true;
    this.requestNavGoods(1);
  },
  topNavTap:function(e){
    let index = e.target.dataset.index;
    this.setData({
      topNavSelIndex: index,
    })
    this.data.canLoadMoreData = true;
    this.requestNavGoods(1);
  },

  requestNavGoods:function(page){
    if (this.data.canLoadMoreData == false){
      wx.showToast({
        title: '没有更多数据了',
      })
      return;
    }
    wx.showToast({
      title: '数据加载中',
      icon: "loading",
    })
    if (page == 1){
      this.data.navGoodsArr = [];
    }
    let categoryId = this.data.leftNavArr[this.data.leftNavSelIndex].mallCategoryId;
    let categorySubId = this.data.topNavArr[this.data.topNavSelIndex].mallSubId;
    api.promiseRequest({
      url: 'getMallGoods',
      data: {
        'categoryId': categoryId,
        'categorySubId': categorySubId,
        'page': page
      }
    }).then(res => {
      wx.hideToast();
      if (res.data != null && res.data.length > 0) {
        this.setData({
          currentPage: page,
          navGoodsArr: this.data.navGoodsArr.concat(res.data),
        })
      }else{
        this.data.canLoadMoreData = false;
      }
    })
  },
  bindscrolltolower:function(){
    this.requestNavGoods(this.data.currentPage + 1);
  },

  goodsItemTap:function(e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
  },

  // getHeight: function() { 
  //   const that = this; 
  //   const windowHeight = wx.getSystemInfoSync().windowHeight
  //   wx.getSystemInfo({ 
  //     success: function(res) { 
  //       wx.createSelectorQuery().select('.topNavigatorView').boundingClientRect(function(rect) { 
  //         that.setData({ 
  //           goodsScrollHeight: windowHeight - rect.height 
  //         }) 
  //       }).exec() 
  //     }, 
  //   }) 
  // },
})