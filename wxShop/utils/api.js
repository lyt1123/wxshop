function request(params) {
  var path = params.path;
  if (typeof (path) == 'undefined') {
    params.url = url(params.url);
  }
  else {
    params.url = url(path);
  }
  //默认method为POST
  if (typeof (params.method) == "undefined" || params.method.length == 0) {
    params.method = "POST";
  }
  console.log(params);
  wx.request(params);
}
function url(path) {
  if (typeof (path) == "undefined") {
    return "";
  }
  if (path.substr(0, 4) == "http") {
    return path;
  }
  if (path.length && path.charAt(0) == '/') {
    return 'https://wxmini.baixingliangfan.cn/baixing/wxmini' + path;
  }
  //path没有/开头自动补全
  return 'https://wxmini.baixingliangfan.cn/baixing/wxmini/' + path;
}
module.exports = {
  request: request
}