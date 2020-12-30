
const cartInfo = 'cartInfo'

function getCartData(){
  wx.getStorage({
    key: cartInfo,
    success(res){
      return res.data;
    },
    fail(){
      return [];
    }
  })
}

function saveCartGoods(goods){
  var cartArr = this.getCartData();
  var isHave = false;
  cartArr.forEach((value,index) =>{
    if (value.goodsId == goods.goodsId){
      value.count += goods.count;
      isHave = true;
    }
  })
  if (!isHave){
    cartArr.concat([goods]);
  }
}

module.exports = {
  getCartData:getCartData,
  saveCartGoods:saveCartGoods,
}