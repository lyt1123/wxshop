const cartInfo = 'cartInfo'

function getCartData(){
  let cartArr = wx.getStorageSync('cartInfo');
  if (cartArr == undefined){
    return [];
  }
  return cartArr;
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

  wx.setStorage({
    data: cartArr,
    key: cartInfo,
  })
  console.log(cartArr);
}

module.exports = {
  getCartData:getCartData,
  saveCartGoods:saveCartGoods,
}