export default function saveBehaviorInfo(behaviorInfo) {
  let behaviorInfoList = JSON.parse(window.localStorage.getItem('behaviorInfo'))
  // console.log(behaviorInfoList)
  behaviorInfoList = behaviorInfoList || []

  behaviorInfo.simpleUrl =  window.location.host
  behaviorInfo.completeUrl =  window.location.href
  behaviorInfo.completeUrl =  window.location.href
  behaviorInfo.webMonitorId = 'test01'
  behaviorInfo.customerKey = 'clf'
  behaviorInfo.userId = 'userId'
  behaviorInfo.happenTime = behaviorInfo.happenTime || new Date().getTime()

  behaviorInfoList.push(behaviorInfo)
  window.localStorage.setItem('behaviorInfo', JSON.stringify(behaviorInfoList))
}