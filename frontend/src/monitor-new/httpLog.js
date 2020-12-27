import upLog from './upLog.js'
import setCommonProperty from './setCommonProperty'

// 监听ajax的状态
function ajaxEventTrigger(event) {
  if(event === 'ajaxLoadStart') {
    this.startTime = new Date().getTime()
  }
  if(event === 'ajaxLoadEnd') {
    this.endTime = new Date().getTime()
    this.loadTime = this.endTime - this.startTime
  }
  var ajaxEvent = new CustomEvent(event, {
    detail: this,
  })
  window.dispatchEvent(ajaxEvent)
}
var oldXHR = window.XMLHttpRequest
function newXHR() {
  var realXHR = new oldXHR()
  realXHR.addEventListener('abort', function () { ajaxEventTrigger.call(this, 'ajaxAbort') }, false)
  realXHR.addEventListener('error', function () { ajaxEventTrigger.call(this, 'ajaxError') }, false)
  realXHR.addEventListener('load', function () { ajaxEventTrigger.call(this, 'ajaxLoad') }, false)
  realXHR.addEventListener('loadstart', function () { ajaxEventTrigger.call(this, 'ajaxLoadStart') }, false)
  realXHR.addEventListener('progress', function () { ajaxEventTrigger.call(this, 'ajaxProgress') }, false)
  realXHR.addEventListener('timeout', function () { ajaxEventTrigger.call(this, 'ajaxTimeout') }, false)
  realXHR.addEventListener('loadend', function () { ajaxEventTrigger.call(this, 'ajaxLoadEnd') }, false)
  realXHR.addEventListener('readystatechange', function() { ajaxEventTrigger.call(this, 'ajaxReadyStateChange') }, false)
  return realXHR
}

window.XMLHttpRequest = newXHR
window.addEventListener('ajaxLoadStart', function(e) {
  setTimeout(function() {
    const { responseURL, status, statusText, startTime } = e.detail
    if(responseURL && responseURL.indexOf('upLog') === -1) {
      const logInfo = new HttpLogInfo('http_log', responseURL, status, statusText, '发起请求', startTime, 0)
      upLog(logInfo)
    }
  }, 100)
})

window.addEventListener('ajaxLoadEnd', function(e) {
  const { responseURL, status, statusText, endTime, loadTime, responseText } = e.detail
  if(responseURL && responseURL.indexOf('upLog') === -1) {
    const logInfo = new HttpLogInfo('http_log', responseURL, status, statusText, '请求返回', endTime, loadTime, responseText)
    upLog(logInfo)
  }
})

function HttpLogInfo(uploadType, httpUrl, status, statusText, statusResult, happenTime, loadTime, responseText) {
  this.uploadType = uploadType
  this.httpUrl = httpUrl
  this.status = status
  this.statusText = statusText
  this.statusResult = statusResult
  this.happenTime = happenTime
  this.loadTime = loadTime
  this.responseText = responseText
  setCommonProperty.apply(this)
}

// 接口请求日志，继承于日志基类MonitorBaseInfo
// function HttpLogInfo(uploadType, url, status, statusText, statusResult, currentTime) {
//   setCommonProperty.apply(this)
//   this.uploadType = uploadType
//   this.httpUrl = utils.b64EncodeUnicode(url)
//   this.status = status
//   this.statusText = statusText
//   this.statusResult = statusResult
//   this.happenTime = currentTime
// }
