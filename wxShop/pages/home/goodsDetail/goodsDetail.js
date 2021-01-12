import api from "../../../utils/api";
import manager from "../../../utils/cart-manager";
import util from "../../../utils/util";

Page({
  data: {
    goodsData:{},
    cartGoodsCount:0,
    bottomShow:false,
    addGoodsCount:1,
    tips_goods_detail:'',
  },
  onLoad:function(option){
    // var eventChannel = this.getOpenerEventChannel();
    // eventChannel.on('goodsId',function(data){
    //   console.log(data);
    // });
    console.log(option);
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
    this.data.addGoodsCount = event.detail
  },

  popAddCart:function(){
    let goods = this.data.goodsData.goodInfo;
    goods.count = this.data.addGoodsCount;
    goods.select = true;
    manager.saveCartGoods(goods);

    this.setData({
       bottomShow: false,
       cartGoodsCount: manager.getCartGoodsCount(),
      });
  }
})