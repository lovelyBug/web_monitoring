'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/upLog', controller.upLog.index);
  router.post('/upLog', controller.upLog.index);
  router.get('/jsErrList', controller.errInfo.getJsErrList)
  router.get('/jsErrDetail', controller.errInfo.getJsErrorDetail)
  router.get('/jsDayError', controller.errInfo.getJsErrInfoByDay)
  router.get('/apiErrList', controller.errInfo.getApiErrList)
  router.get('/apiErrDetail', controller.errInfo.getApiErrorDetail)
  router.get('/apiDayError', controller.errInfo.getApiErrInfoByDay)
  router.get('/resourceErrList', controller.errInfo.getResourceErrList)
  router.get('/resourceErrDetail', controller.errInfo.getResourceErrorDetail)
  router.get('/resourceDayError', controller.errInfo.getResourceErrInfoByDay)
  // router.get('/monitor/error', controller.monitor.index);
  // router.post('/monitor/sourcemap', controller.monitor.upload);
};

