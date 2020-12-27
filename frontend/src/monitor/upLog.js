import BrowserType from './browserType.js'
const browserInfo =  BrowserType()

export default function upLog(logInfo) {
  const addBroswerInfoList = ['jsError', 'pv']
  if(addBroswerInfoList.includes(logInfo.uploadType)) {
    logInfo = Object.assign(logInfo, browserInfo)
  }
  logInfo.simpleUrl =  window.location.host
  logInfo.completeUrl =  window.location.href
  logInfo.webMonitorId = 'test01'
  logInfo.customerKey = 'clf'
  logInfo.userId = 'userId'
  logInfo.happenTime = logInfo.happenTime || new Date().getTime()

  const str = window.btoa(encodeURIComponent(JSON.stringify(logInfo)))
  const host = 'http://192.168.2.182:7001/upLog'
  const url = `${host}?info=${str}`
  sendBeacon(url)
}

function sendBeacon (url) {
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    return navigator.sendBeacon(url);
  }

  try {
    var req = new window.XMLHttpRequest();
    req.open('GET', url, false);
    req.send();
  } catch (e) {
    // Fix IE9 cross-site error
    var img = new window.Image();
    img.src = url;
  }
}

// export default upLog