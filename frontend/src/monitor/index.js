import ajax from './ajax.js'
import ErrorTrap from './ErrorTrap'
import browserState from './browserState'
import onclick from './onclick'

// import BrowserType from './browserType.js'
// const browserType =  BrowserType()
// console.log(browserType)

// var first = document.body.firstChild;
// var oScript = document.createElement("script");
// oScript.src = "http://pv.sohu.com/cityjson?ie=utf-8";
// document.body.insertBefore(oScript, first);
// setTimeout(()=> {
//   console.log(window.returnCitySN)
// }, 500)

export {
  ajax,
  ErrorTrap,
  browserState,
  onclick
}

