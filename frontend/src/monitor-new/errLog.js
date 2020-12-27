import upLog from './upLog.js'
import setCommonProperty from './setCommonProperty'

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
  const logInfo = new ResourceLoadError('resourceLoadInfo', elementType, sourceUrl, status)
  upLog(logInfo)
}
function uploadJavaScriptError(err) {
  // 此处对于网络请求错误不予上报
  if('request' in err.error) {
    return
  }
  const { error: { message, stack }, filename } = err
  
  const logInfo = new JavaScriptError('jsError', stack, message, filename)
  upLog(logInfo)
}

function JavaScriptError(uploadType, errorStack, errorMessage, filename) {
  this.uploadType = uploadType
  this.errorStack = errorStack
  this.errorMessage = errorMessage
  this.filename = filename
  setCommonProperty.call(this, 'jsError')
}

function ResourceLoadError(uploadType, elementType, sourceUrl, status) {
  this.uploadType = uploadType
  this.elementType = elementType
  this.sourceUrl = sourceUrl
  this.status = status
}
