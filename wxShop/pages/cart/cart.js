Page({
  data: {
    cartList: ["",""],
    allSelect: false,
  },
  onLoad: function (options) {
  },

  selectTap:function(e){
    let index = e.target.dataset.index
    console.log(index)
  },

  allSelectTap:function(){
    this.setData({
      allSelect: !this.data.allSelect,
    })
  }
})