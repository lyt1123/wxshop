function promiseRequest(params) {
  checkParams(params);
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: params.url,
      data: params.data,
      method: params.method,
      header: params.header,
      success: res => {
        resolve(res.data);
      },
      fail: res => {
        reject(res.data)
      }
    })
  })
  return promise;
}

function request(params) {
  checkParams(params);
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
  request,
  promiseRequest,
}