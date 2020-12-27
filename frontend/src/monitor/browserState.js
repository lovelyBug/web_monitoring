import upLog from './upLog.js'
import saveBehaviorInfo from './savaBehaviorInfo'

var _wr = function(type) {
  var orig = history[type]
  return function() {
    var rv = orig.apply(this, arguments)
    var e = new Event(type)
    e.arguments = arguments
    window.dispatchEvent(e)
    return rv
  }
}

history.pushState = _wr('pushState')
history.replaceState = _wr('replaceState')

window.addEventListener('replaceState', function(e) {
  console.log('replaceState: ' + e)
});
window.addEventListener('pushState', function(e) {
  console.log('pushState: ' + e)
});

window.addEventListener('hashchange',function(e){
  console.log('hashchange: ' + e)
})

// window.addEventListener('popstate', function(e) {
//   console.log('popstate: ' + e)
// })

window.onload = function() {
  window.localStorage.setItem('initPage', new Date().getTime().toString())
  const happenTime = new Date().getTime()
  const behaviorInfo = {
    msg: '进入页面',
    happenTime,
    uploadType: 'traceLog',
    behaviorType: 'initPage'
  }
  const pvInfo = {
    msg: '进入页面',
    happenTime,
    uploadType: 'pv',
  }
  const lastBehaviorInfo = window.localStorage.getItem('behaviorInfo')
  if(lastBehaviorInfo) {
    const logInfo = {
      behaviorInfoList: JSON.parse(window.localStorage.getItem('behaviorInfo')) || [],
      uploadType: 'behaviorInfo'
    }
    upLog(logInfo)
    window.localStorage.removeItem('behaviorInfo')
  }
  saveBehaviorInfo(behaviorInfo)
  upLog(pvInfo)
}

window.onbeforeunload = function() {
  const stayTime = new Date().getTime() - +window.localStorage.getItem('initPage')
  const happenTime = new Date().getTime()
  const behaviorInfo =  {
    msg: '退出页面',
    happenTime,
    uploadType: 'traceLog',
    behaviorType: 'exitPage'
  }
  saveBehaviorInfo(behaviorInfo)
  const logInfo = {
    behaviorInfoList: JSON.parse(window.localStorage.getItem('behaviorInfo')) || [],
    uploadType: 'behaviorInfo'
  }
  const leaveInfo = {
    uploadType: 'leave',
    leaveType: 1,
    stayTime: stayTime
  }
  upLog(logInfo)
  upLog(leaveInfo)
  window.localStorage.removeItem('behaviorInfo')
}

window.addEventListener('visibilitychange', function() {
  const happenTime = new Date().getTime()
  const behaviorInfo = {
    happenTime,
    uploadType: 'traceLog',
    behaviorType: document.hidden ? 'pageHide' : 'pageShow'
  }
  saveBehaviorInfo(behaviorInfo)
})



// window.onpageshow = function() {
//   console.log('onpageshow')
// }

// window.onpagehide = function() {
//   console.log('onpagehide')
// }

// window.onblur = function() {
//   console.log('onblur')
// }

// window.onfocus = function() {
//   console.log('onfocus')
// }
