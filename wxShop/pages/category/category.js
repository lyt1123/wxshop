import { promiseRequest } from '../../utils/api';
const app = getApp();

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

  onShow:function(){
    if (app.globalData.categoryIndex != null && this.data.leftNavArr.length){
      this.leftNavTapAction(app.globalData.categoryIndex);
      app.globalData.categoryIndex = null;
    }
  },

  requestLeftNav: function () {
    wx.showToast({
      title: '数据加载中',
      icon: "loading",
    })
    promiseRequest({
      url: 'getCategory',
    }).then(res => {
      wx.hideToast();
      this.setData({
        leftNavArr: res,
      })
      if (app.globalData.categoryIndex != null){
        this.leftNavTapAction(app.globalData.categoryIndex);
        app.globalData.categoryIndex = null;
      }
    }).catch(res=>{

    })
  },

  leftNavTap:function(e){
    let index = e.target.dataset.index;
    this.leftNavTapAction(index);
  },

  leftNavTapAction:function(index){
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
    promiseRequest({
      url: 'getMallGoods',
      data: {
        'categoryId': categoryId,
        'categorySubId': categorySubId,
        'page': page
      }
    }).then(res => {
      wx.hideToast();
      if (res != null && res.length > 0) {
        this.setData({
          currentPage: page,
          navGoodsArr: this.data.navGoodsArr.concat(res),
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

  onPullDownRefresh:function(){
    this.requestLeftNav();
  },

  goodsItemTap:function (event) {
    let index = event.currentTarget.dataset.index;
    let goodsId = this.data.navGoodsArr[index].goodsId;
    if (!goodsId) {
      return;
    }
    wx.navigateTo({
      url: '/pages/home/goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
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