import { promiseRequest } from "../../../utils/api"

Page({
  data: {
    content:'',
  },

  onLoad: function () {
    promiseRequest({
      url: 'aboutUs'
    }).then(res=>{
      this.setData({
        content:res,        
      })
    })
  },

})