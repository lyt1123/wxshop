const api = require("../../../utils/api")

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
    wx.showToast({
      title: '数据加载中',
      icon: "loading",
    })
    api.promiseRequest({
      url: 'getGoodDetailById',
      data: {
        'goodId': goodsId,
      }
    }).then((res)=>{
      wx.hideToast();
      this.setData({
        goodsData:res.data
      })
    })
  }
})