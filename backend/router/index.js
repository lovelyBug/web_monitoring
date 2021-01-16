const Router = require('koa-router');
const { JavascriptErrorInfoController, UpLogController } = require('../controllers/index.js')

const router = new Router()
router.get('/getJsErrListByHour', JavascriptErrorInfoController.getJsErrListByHour)
router.get('/getJSErrInfoByHour', JavascriptErrorInfoController.getJSErrInfoByHour)
router.get('/getJsErrInfoByType', JavascriptErrorInfoController.getJsErrInfoByType)
router.get('/getJsErrInfoByID', JavascriptErrorInfoController.getJsErrInfoByID)
router.get('/upLog', UpLogController.index)
router.post('/upLog', UpLogController.index)

module.exports = router
