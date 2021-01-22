import api from "../../../utils/api"

Page({
  data: {
    couponTopDic:{},
    couponList:["","","",""],
  },
  onLoad: function (options) {
    this.requestCouponPic();
    // this.requestCouponList();
  },

  requestCouponPic:function(){
    api.promiseRequest({
      url: "fujiCouponsPic",
    }).then(res=>{
      this.setData({
        couponTopDic:res,
      })
    }) 
  },

  requestCouponList:function(){
    api.promiseRequest({
      url: "fujiCouponsGetByself",
        data: {
          "userId": "",
          "scene": "",
          "page": 1,
          "qrcode": "0"
        }
    }).then(res=>{
      this.setData({
        couponList:res,
      })
    })
  },
})