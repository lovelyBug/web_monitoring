const Utils = require('./utils.js')

const commonFunc = {
  decodeErrMsg(errMsgArr) {
    const data = errMsgArr.map(item => {
      item.errorMessage = Utils.b64DecodeUnicode(item.errorMessage)
      return item
    })
    return data
  }
}

module.exports = commonFunc
