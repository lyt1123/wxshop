import api from "../../../utils/api";
import manager from "../../../utils/cart-manager";
import util from "../../../utils/util";
const app = getApp();

Page({
  data: {
    goodsData:{},
    cartGoodsCount:0,
    bottomShow:false,
    tips_content:'',
  },
  onLoad:function(option){
    // var eventChannel = this.getOpenerEventChannel();
    // eventChannel.on('goodsId',function(data){
    //   console.log(data);
    // });

    let goodsId = option.goodsId;
    this.requestGoodsDetail(goodsId);
  },
  requestGoodsDetail:function(goodsId){
    api.promiseRequest({
      url: 'getGoodDetailById',
      data: {
        'goodId': goodsId,
      }
    }).then((res)=>{
      wx.hideToast();
      res.goodComments.forEach((value,index) => {
        value.discussTime = util.timeStampToDate(value.discussTime);
      });
      
      this.setData({
        goodsData:res,
        cartGoodsCount: manager.getCartGoodsCount(),
        tips_content:app.globalData.tips_goods_detail.content,
      })
    })
  },
  
  tabsOnChange:function(event){

  },

  gotoCart:function(){
    wx.switchTab({
      url: "/pages/cart/cart",
    });
  },
  
  addCart:function(){
    this.setData({ bottomShow: true });
  },

  mustBuy:function(){

  },

  onPopupClose() {
    this.setData({ bottomShow: false });
  },

  goodsCountChange:function(event){
    let goods = this.data.goodsData.goodInfo;
    goods.count = event.detail;
  },

  popAddCart:function(){
    let goods = this.data.goodsData.goodInfo;
    goods.select = true;
    manager.saveCartGoods(goods);

    this.setData({
       bottomShow: false,
       cartGoodsCount: manager.getCartGoodsCount(),
      });
  }
})