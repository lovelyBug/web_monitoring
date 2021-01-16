import BrowserInfo from './browserInfo.js'

export default function setCommonPropertity(logType) {
  const addBroswerInfoList = ['jsError', 'pv']
  if(logType && addBroswerInfoList.includes(logType)) {
    BrowserInfo.apply(this)
  }
  this.simpleUrl =  window.location.host
  this.completeUrl =  window.location.href
  this.webMonitorId = 'test01'
  this.customerKey = 'clf'
  this.userId = 'userId'
  this.happenTime = this.happenTime || new Date().getTime()
}
