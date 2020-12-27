import setCommonProperty from './setCommonProperty'
import upLog from './upLog.js'

window.onload = function() {
  window.localStorage.setItem('initPage', new Date().getTime().toString())
  const happenTime = new Date().getTime()
  const behaviorInfo = new BehaviorInfo('traceLog', 'initPage')
  const pvInfo = new PvInfo('pv', happenTime)
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
  const behaviorInfo = new BehaviorInfo('traceLog', 'exitPage')
  saveBehaviorInfo(behaviorInfo)
  const logInfo = {
    behaviorInfoList: JSON.parse(window.localStorage.getItem('behaviorInfo')) || [],
    uploadType: 'behaviorInfo'
  }
  const leaveInfo = new LeaveInfo('leave', stayTime)
  upLog(logInfo)
  upLog(leaveInfo)
  window.localStorage.removeItem('behaviorInfo')
}

window.addEventListener('visibilitychange', function() {
  const behaviorType = document.hidden ? 'pageHide' : 'pageShow'
  const behaviorInfo = new BehaviorInfo('traceLog', behaviorType)
  saveBehaviorInfo(behaviorInfo)
})

document.onclick = function (e) {
  if(e.target.tagName === 'HTML') return
  var className = "";
  var placeholder = "";
  var inputValue = "";
  var tagName = e.target.tagName;
  var innerText = "";
  if (e.target.tagName != "svg" && e.target.tagName != "use") {
    className = e.target.className;
    placeholder = e.target.placeholder || "";
    inputValue = e.target.value || "";
    innerText = e.target.innerText.replace(/\s*/g, "");
    // 如果点击的内容过长，就截取上传
    if (innerText.length > 200) innerText = innerText.substring(0, 100) + "... ..." + innerText.substring(innerText.length - 99, innerText.length - 1);
    innerText = innerText.replace(/\s/g, '');
  }
  
  const logInfo = new BehaviorInfo('traceLog', 'click', className, placeholder, inputValue, tagName, innerText)
  saveBehaviorInfo(logInfo)
}

function BehaviorInfo(uploadType, behaviorType, className, placeholder, inputValue, tagName, innerText) {
  this.uploadType = uploadType
  this.behaviorType = behaviorType
  this.className = className
  this.placeholder = placeholder
  this.inputValue = inputValue
  this.tagName = tagName
  this.innerText = innerText
  this.happenTime = new Date().getTime()
  setCommonProperty.apply(this)
}

function PvInfo(uploadType) {
  this.uploadType = uploadType
  this.happenTime = new Date().getTime()
  setCommonProperty.call(this, 'pv')
}

function LeaveInfo(uploadType, stayTime) {
  this.uploadType = uploadType
  this.stayTime = stayTime
  this.happenTime = new Date().getTime()
  setCommonProperty.apply(this)
}

function saveBehaviorInfo(behaviorInfo) {
  let behaviorInfoList = JSON.parse(window.localStorage.getItem('behaviorInfo'))
  behaviorInfoList = behaviorInfoList || []
  behaviorInfoList.push(behaviorInfo)
  window.localStorage.setItem('behaviorInfo', JSON.stringify(behaviorInfoList))
}