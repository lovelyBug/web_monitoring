export default function upLog(logInfo) {
  const str = window.btoa(encodeURIComponent(JSON.stringify(logInfo)))
  const host = 'http://127.0.0.1:8011/upLog'
  const url = `${host}?info=${str}`
  var img = new window.Image()
    img.src = url
}

function sendBeacon (url) {
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    return navigator.sendBeacon(url)
  }

  try {
    var req = new window.XMLHttpRequest()
    req.open('GET', url, false)
    req.send()
  } catch (e) {
    // Fix IE9 cross-site error
    var img = new window.Image()
    img.src = url
  }
}

// export default upLog