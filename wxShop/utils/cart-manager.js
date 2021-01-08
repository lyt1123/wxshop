import util from "../utils/util";

const cartInfo = 'cartInfo'

function getCartData(){
  let cartArr = wx.getStorageSync(cartInfo);
  if (util.isArrayFn(cartArr)){
    return cartArr;
  }
  return [];
}

function saveCartGoods(goods){
  var cartArr = getCartData();
  var isHave = false;
  cartArr.forEach((value,index) =>{
    if (value.goodsId == goods.goodsId){
      value.count += goods.count;
      isHave = true;
    }
  })
  if (!isHave){
    cartArr.push(goods);
  }
  wx.setStorageSync(cartInfo, cartArr)
}

function getCartGoodsCount(){
  var cartArr = getCartData();
  let totalCount = 0;
  cartArr.forEach((value,index) =>{
    totalCount += value.count;
  })
  return totalCount;
}

function setAllSelect(select){
  var cartArr = getCartData();
  cartArr.forEach((value,index) =>{
    value.select = select;
  })
  wx.setStorageSync(cartInfo, cartArr)
}

function isAllSelect(){
  var cartArr = getCartData();
  var isAllSelect = true;
  cartArr.forEach((value,index) =>{
    if (!value.select){
      isAllSelect = false;
    }
  })
  return isAllSelect;
}

function setGoodsSelect(goods){
  var cartArr = getCartData();
  cartArr.forEach((value,index) =>{
    if (value.goodsId == goods.goodsId){
      value.select = !value.select;
    }
  })
  wx.setStorageSync(cartInfo, cartArr)
}

function setGoodsCount(goods){
  var cartArr = getCartData();
  cartArr.forEach((value,index) =>{
    if (value.goodsId == goods.goodsId){
      value.count = goods.count;
    }
  })
  wx.setStorageSync(cartInfo, cartArr)
}

function deleteGoods(goods){
  var cartArr = getCartData();
  for (let index in cartArr) {
    if (cartArr.hasOwnProperty(index)) {
      let element = cartArr[index];
      if (goods.goodsId == element.goodsId){
        cartArr.splice(index,1);
        break;
      }
    }
  }

  wx.setStorageSync(cartInfo, cartArr)
}

function getTotalPrice() {
  var cartArr = getCartData();
  var totalCount = 0;
  var totalPrice = 0.00;
  cartArr.forEach((value,index) =>{
    if (value.select){
      totalCount += value.count;
      totalPrice += (value.presentPrice * value.count);
    }
  })
  return {'totalCount':totalCount,'totalPrice':totalPrice.toFixed(2)};
} 

module.exports = {
  getCartData: getCartData,
  saveCartGoods: saveCartGoods,
  getCartGoodsCount: getCartGoodsCount,
  setAllSelect: setAllSelect,
  isAllSelect: isAllSelect,
  setGoodsSelect: setGoodsSelect,
  setGoodsCount: setGoodsCount,
  deleteGoods: deleteGoods,
  getTotalPrice: getTotalPrice,
}