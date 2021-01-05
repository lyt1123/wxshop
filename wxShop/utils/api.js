function promiseRequest(params) {
  checkParams(params);
  let promise = new Promise(function (resolve, reject) {
    wx.showToast({
      title: '数据加载中',
      icon: "loading",
    })
    wx.request({
      url: params.url,
      data: params.data,
      method: params.method,
      header: params.header,
      success: res => {
        let responds = res.data;
        if (responds.code == 0 && responds.message == 'success'){
          resolve(responds.data);
        }else{
          wx.stopPullDownRefresh();
          console.log(res.errMsg);
          wx.showToast({
            title: res.errMsg?res.errMsg:'网络请求失败，稍后再试!',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: res => {
        wx.stopPullDownRefresh();
        console.log(res.errMsg);
        wx.showToast({
          title: res.errMsg?res.errMsg:'网络请求失败，稍后再试!',
          icon:'none',
          duration: 2000
        })
      }
    })
  })
  return promise;
}

function request(params) {
  checkParams(params);
  wx.showToast({
    title: '数据加载中',
    icon: "loading",
  })
  wx.request(params);
}

function checkParams(params) {
  var path = params.path;
  if (typeof (path) == 'undefined') {
    params.url = checkUrl(params.url);
  } else {
    params.url = checkUrl(path);
  }
  //默认method为POST
  if (typeof (params.method) == "undefined" || params.method.length == 0) {
    params.method = "POST";
  }
  params.header = {
      'content-type': 'application/x-www-form-urlencoded'
    },
    console.log(params);
}

function checkUrl(path) {
  if (typeof (path) == "undefined") {
    return "";
  }
  if (path.substr(0, 4) == "http") {
    return path;
  }
  if (path.length && path.charAt(0) == '/') {
    return 'https://wxmini.baixingliangfan.cn/baixing/wxmini' + path;
  }
  return 'https://wxmini.baixingliangfan.cn/baixing/wxmini/' + path;
}

// const API_HOST = "";

module.exports = {
  request: request,
  promiseRequest:promiseRequest
}