const Router = require('koa-router')
const {
  JavascriptErrorInfoController,
  HttpErrorInfoController,
  UpLogController,
  ResourceErrorInfoController,
  HttpLogInfoController
} = require('../controllers/index.js')

const router = new Router()
// 数据上报
router.get('/upLog', UpLogController.index)
router.post('/upLog', UpLogController.index)
// JS错误统计
router.get('/getJsErrListByHour', JavascriptErrorInfoController.getJsErrListByHour)
router.get('/getJSErrInfoByHour', JavascriptErrorInfoController.getJSErrInfoByHour)
router.get('/getJsErrInfoByType', JavascriptErrorInfoController.getJsErrInfoByType)
router.get('/getJsErrInfoByID', JavascriptErrorInfoController.getJsErrInfoByID)
// 接口错误统计
router.get('/getApiErrListByHour', HttpErrorInfoController.getApiErrListByHour)
router.get('/getApiErrInfoByHour', HttpErrorInfoController.getApiErrInfoByHour)
// 资源加载错误统计
router.get('/getResourceErrListByHour', ResourceErrorInfoController.getResourceErrListByHour)
router.get('/getResourceErrInfoByHour', ResourceErrorInfoController.getResourceErrInfoByHour)
// API信息
router.get('/getApiLogListByHour', HttpLogInfoController.getApiLogListByHour)
router.get('/getApiLogInfoByHour', HttpLogInfoController.getApiLogInfoByHour)
module.exports = router
