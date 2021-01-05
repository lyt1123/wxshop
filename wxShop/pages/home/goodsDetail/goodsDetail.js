import api from "../../../utils/api";
import manager from "../../../utils/cart-manager";
import util from "../../../utils/util";

Page({
  data: {
    goodsData:{},
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
        goodsData:res
      })

      // let goodsInfo = res.goodInfo;
      // goodsInfo.count = 1;
      // goodsInfo.select = true;
      // saveCartGoods(goodsInfo);
    })
  },
  
  tabsOnChange:function(event){

  }
})