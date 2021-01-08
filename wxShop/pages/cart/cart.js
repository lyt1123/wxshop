import manager from "../../utils/cart-manager";

Page({
  data: {
    goodsList:[],
    allSelect: false,
    totalCount:0,
    totalPrice:0.00,
  },
  onLoad: function (options) {

  },
  onShow: function () {
    let totalMap = manager.getTotalPrice();
    this.setData({
      goodsList: manager.getCartData(),
      allSelect: manager.isAllSelect(),
      totalCount: totalMap.totalCount,
      totalPrice: totalMap.totalPrice,
    })
  },

  selectTap:function(e){
    let index = e.target.dataset.index
    manager.setGoodsSelect(this.data.goodsList[index]);
    let totalMap = manager.getTotalPrice();
    this.setData({
      goodsList: manager.getCartData(),
      allSelect: manager.isAllSelect(),
      totalCount: totalMap.totalCount,
      totalPrice: totalMap.totalPrice,
    })
  },

  goodsCountChange:function(event){
    let index = event.target.dataset.index;
    let goods = this.data.goodsList[index];
    goods.count = parseInt(event.detail);
    manager.setGoodsCount(goods);

    let totalMap = manager.getTotalPrice();
    this.setData({
      totalCount: totalMap.totalCount,
      totalPrice: totalMap.totalPrice,
    })
  },

  onDeleteTap:function(event){
    let index = event.target.dataset.index;
    manager.deleteGoods(this.data.goodsList[index]);
    let totalMap = manager.getTotalPrice();
    this.setData({
      goodsList: manager.getCartData(),
      allSelect: manager.isAllSelect(),
      totalCount: totalMap.totalCount,
      totalPrice: totalMap.totalPrice,
    })
  },

  allSelectTap:function(){
    let select = !this.data.allSelect;
    manager.setAllSelect(select);
    let totalMap = manager.getTotalPrice();
    this.setData({
      goodsList: manager.getCartData(),
      allSelect: select,
      totalCount: totalMap.totalCount,
      totalPrice: totalMap.totalPrice,
    })
  }
})