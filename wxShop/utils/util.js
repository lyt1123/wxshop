function timeStampToDate(timeStamp) {
  var date = new Date(timeStamp);
  var y = date.getFullYear();
  var m = formatNumber(date.getMonth() + 1);
  var d = formatNumber(date.getDate());
  var h = formatNumber(date.getHours());
  var minute = formatNumber(date.getMinutes());
  var second = formatNumber(date.getSeconds());
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isArrayFn(value){
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);    
	}else{
		return Object.prototype.toString.call(value) === "[object Array]";    
	}
}

module.exports = {
  timeStampToDate:timeStampToDate,
  formatTime:formatTime,
  isArrayFn:isArrayFn,
}
