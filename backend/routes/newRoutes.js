const Router = require('koa-router');
// const Common = require("../controllers/newControllers.js")
const { JavascriptErrorInfoController } = require('../controllers/index.js')

const router = new Router()
router.get('/getJsErrListByHour', JavascriptErrorInfoController.getJsErrListByHour)
router.get('/getJSErrInfoByHour', JavascriptErrorInfoController.getJSErrInfoByHour)
router.get('/getJsErrInfoByType', JavascriptErrorInfoController.getJsErrInfoByType)
router.get('/getJsErrInfoByID', JavascriptErrorInfoController.getJsErrInfoByID)

module.exports = router
