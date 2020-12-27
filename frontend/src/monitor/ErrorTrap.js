import upLog from './upLog.js'

window.addEventListener('unhandledrejection', e => {
  throw e.reason
})
window.addEventListener('error', e => {
  const elementType = e.target.localName
  if(elementType) {
    handleResourceLoadingError(e, elementType)
  } else {
    uploadJavaScriptError(e)
  }
  return true
}, true)

// 捕获资源加载错误
function handleResourceLoadingError(e, elementType) {
  let sourceUrl = ''
  switch (elementType) {
    case 'link':
      sourceUrl = e.target.href
      break
    case 'script':
      sourceUrl = e.target.src
      break
    case 'img':
      sourceUrl = e.target.currentSrc
      break
    default:
  }
  uploadJResourceLoadingError(elementType, sourceUrl)
}
function uploadJavaScriptError(err) {
  const { error: { message, stack }, filename } = err
  // 此处对于网络请求错误不予上报
  if('request' in err.error) {
    return
  }
  const logInfo = { uploadType: 'jsError', errorStack: stack, errorMessage: message, filename }
  upLog(logInfo)
}
  
function uploadJResourceLoadingError(elementType, sourceUrl) {
  const logInfo = { uploadType: 'resourceLoadInfo', elementType, sourceUrl, status: 1 }
  upLog(logInfo)
}
