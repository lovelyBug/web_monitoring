const {ScreenShotInfoController,HttpErrorInfoController,BehaviorInfoController,DailyActivityController,EmailCodeController,ExtendBehaviorInfoController,FunnelController,IgnoreErrorController,InfoCountByHourController,LoadPageInfoController,FailController,LocationPointTypeController,LocationPointGroupController,LocationPointController,ResourceLoadInfoController,VideosInfoController,HttpLogInfoController,JavascriptErrorInfoController,ProjectController,UserController,CustomerPVController,CustomerPvLeaveController,TimerCalculateController,CustomerStayTimeController,AlarmController,TeamController,ConfigController,Common} = require("../controllers/controllers.js")


const createRoutes = (router) => {
      /**
     * 日志相关处理
     */
    // 用户上传日志（h5）
    router.post('/upLog', Common.upLog);
    // 用户上传日志 (小程序)
    router.post('/upMog', Common.upMog);
    // 用户上传debug日志
    router.post('/upDLog', Common.upDLog);
    // 上传拓展日志
    router.post('/uploadExtendLog', Common.uploadExtendLog);
    // 拓展行为日志
    router.post('/extendBehavior', ExtendBehaviorInfoController.create);

    // 修复当天数据
    router.get('/fixData', TimerCalculateController.fixData);

    // 添加team
    router.post('/config', ConfigController.create);

    /**
     * 登录相关逻辑
     */
    // 登录
    router.post('/login', UserController.login);
    // 获取用户列表
    router.post('/getUserList', UserController.getUserList);
    // 忘记密码
    router.post('/forgetPwd', UserController.forgetPwd);
    // 发送注册验证码
    router.post('/sendRegisterEmail', UserController.sendRegisterEmail);
    // 给管理员发送确认邮件
    router.post('/registerCheck', UserController.registerCheck);
    // 管理员注册接口
    router.post('/registerForAdmin', UserController.registerForAdmin);
    
    // 注册用户
    router.get('/register', UserController.register);

    // 更新激活码
    router.post('/createPurchaseCode', FailController.createPurchaseCode);
    /**
     * Common 逻辑接口
     */
    // 查询用户的行为列表
    router.post('/searchCustomerBehaviors', Common.searchBehaviorsRecord);
    // 查询用户的基本信息
    router.post('/searchCustomerInfo', Common.searchCustomerInfo);
    // 查询报错情况
    router.post('/getErrorInfo', Common.getErrorInfo);
    // 获取警报信息
    router.post('/getWarningMsg', Common.getWarningMsg);
    router.post("/getWarningList", Common.getWarningList)
    // 获服务并发日志量
    router.post('/getConcurrencyByMinuteInHour', Common.getConcurrencyByMinuteInHour);


    // 添加team
    router.post('/team', TeamController.create);
    // 获取团队列表
    router.post("/getTeamList", TeamController.getTeamList)
    router.post("/addTeamMember", TeamController.addTeamMember)
    router.post("/createNewTeam", TeamController.createNewTeam)
    router.post('/deleteTeam', TeamController.deleteTeam);
    router.post('/moveProToTeam', TeamController.moveProToTeam)
    router.post('/updateTeamProjects', TeamController.updateTeamProjects)
    // 获取所有团队列表
    router.post("/getAllTeamList", TeamController.getAllTeamList)
    

    /**
     * 应用接口
     */
    // 添加应用
    router.post('/project', ProjectController.create);
    // 删除应用
    router.get('/deleteProject', ProjectController.deleteProject);
    // 获取应用详细信息
    router.get('/projectDetail', ProjectController.detail);
    // 获取应用列表
    router.get('/project/list', ProjectController.getProjectList);
    // 获取应用列表
    router.get('/webMonitorIdList', ProjectController.getWebMonitorIdList);
    // 获取应用详情
    router.get('/project/detail', ProjectController.getProjectDetail);
    // 更新启动列表
    router.get('/project/updateStartList', ProjectController.updateStartList);
    // 更新探针代码
    router.get('/project/updateMonitorCode', ProjectController.updateMonitorCode);
    // 获取所有应用列表
    router.get('/project/list/all', ProjectController.getAllProjectList);
    // 获取所有应用列表详情
    router.get('/project/detailList', ProjectController.getProjectDetailList);
    // 查询所有项目的实时UV信息
    router.get('/project/getProjectInfoInRealTime', ProjectController.getProjectInfoInRealTime);
    // 创建新的监控项目
    router.post('/createNewProject', ProjectController.createNewProject);
    // 创建新的监控项目
    router.get('/checkProjectCount', ProjectController.checkProjectCount);
    // 暂停项目的日志上报
    router.post('/changeLogServerStatusByWebMonitorId', ProjectController.changeLogServerStatusByWebMonitorId)
    // 获取暂停日志上报的项目列表
    router.post('/getStopWebMonitorIdList', ProjectController.getStopWebMonitorIdList)
    // 获取userTags
    router.post('/getUserTags', ProjectController.getUserTags)
    // 保存userTags
    router.post('/saveUserTags', ProjectController.saveUserTags)
    /**
     * 用户访问信息接口
     */
    // 创建PV信息
    // router.post('/customerPV', CustomerPVController.create);
    // // 获取PV列表
    // router.get('/customerPV', CustomerPVController.getCustomerPVList);
    // // 获取PV详情
    // router.get('/customerPV/:id', CustomerPVController.detail);
    // // 删除PV
    // router.delete('/customerPV/:id', CustomerPVController.delete);
    // // 更改PV
    // router.put('/customerPV/:id', CustomerPVController.update);
    // 获取一个月内，每天的uv数量
    router.post('/uvCountForMonth', CustomerPVController.uvCountForMonth);
    // 获取每天的流量数据 
    router.post('/getTodayFlowDataByTenMin', CustomerPVController.getTodayFlowDataByTenMin);
    // 立即刷新每天的流量数据 
    router.post('/getTodayFlowData', CustomerPVController.getTodayFlowData);
    // 获取7天的平均pv数据 
    router.post('/getAvgPvInSevenDay', CustomerPVController.getAvgPvInSevenDay);
    // 获取日活量
    router.post('/getCustomerCountByTime', CustomerPVController.getCustomerCountByTime);
    // 获取24小时内每小时PV量
    router.post('/getPvCountByHour', CustomerPVController.getPvCountByHour);
    // 获取24小时内每小时新用户量
    router.post('/getNewCustomerCountByHour', CustomerPVController.getNewCustomerCountByHour);
    // 获取24小时内每小时用户的平均安装量
    router.post('/getInstallCountByHour', CustomerPVController.getInstallCountByHour);
    // 获取24小时内每小时UV量
    router.post('/getUvCountByHour', CustomerPVController.getUvCountByHour);
    // 获取24小时内每小时user数量
    router.post('/getUserCountByHour', CustomerPVController.getUserCountByHour);
    // 获取每秒钟的PV/UV量
    router.post('/getPvUvCountBySecond', CustomerPVController.getPvUvCountBySecond);
    // 获取每分钟的PV量
    router.post('/getPvCountByMinute', CustomerPVController.getPvCountByMinute);
    // 获取每分钟的PV量
    router.post('/getProvinceCountBySeconds', CustomerPVController.getProvinceCountBySeconds);
    // 获取每分钟的PV量
    router.post('/getProvinceCountBySeconds', CustomerPVController.getProvinceCountBySeconds);
    // 获取每分钟的PV量
    router.post('/getAliveCusInRealTime', CustomerPVController.getAliveCusInRealTime);
    // 获取城市top10数量列表
    router.post('/getVersionCountOrderByCount', CustomerPVController.getVersionCountOrderByCount);
    // 获取城市top10数量列表
    router.post('/getCityCountOrderByCount', CustomerPVController.getCityCountOrderByCount);
    // 获取城市top20数量列表
    router.post('/getCityCountOrderByCountTop20', CustomerPVController.getCityCountOrderByCountTop20);
    // 获取设备top10数量列表
    router.post('/getDeviceCountOrderByCount', CustomerPVController.getDeviceCountOrderByCount);
    // 获取系统版本top10数量列表
    router.post('/getOsCountOrderByCount', CustomerPVController.getOsCountOrderByCount);
    // 查询用户的访问列表，分页
    router.post('/getPvListByPage', CustomerPVController.getPvListByPage);
    // 根据时间查询用户的页面总数
    router.post('/getPvListTotalCountByTime', CustomerPVController.getPvListTotalCountByTime);
    
    // 获取七天留存数量
    router.post('/getSevenDaysLeftCount', CustomerPVController.getSevenDaysLeftCount);
    // 次日留存率
    router.post('/getYesterdayLeftPercent', CustomerPVController.getYesterdayLeftPercent);
    // 平均停留时长
    router.post('/getStayTimeForEveryDay', CustomerStayTimeController.getStayTimeForEveryDay);

    // 获取24小时内每小的跳出率
    router.post('/getCusLeavePercentByHour', CustomerPvLeaveController.getCusLeavePercentByHour);
    
    /**
     * 用户加载页面信息接口
     */
    // 创建加载信息
    router.post('/loadPage', LoadPageInfoController.create);
    // 获取加载信息详情
    router.get('/loadPage/:id', LoadPageInfoController.detail);
    // 删除加载信息
    router.delete('/loadPage/:id', LoadPageInfoController.delete);
    // 更改加载信息
    router.put('/loadPage/:id', LoadPageInfoController.update);
    // 查询当日页面加载的平均时间
    router.post('/getPageLoadTimeByDate', LoadPageInfoController.getPageLoadTimeByDate);
    // 根据页面加载时间分类
    router.post('/getPageCountForLoadTimeGroupByDay', LoadPageInfoController.getPageCountForLoadTimeGroupByDay);
    // 获取某一天加载耗时分类
    router.post('/getPageCountForLoadTimeByDay', LoadPageInfoController.getPageCountForLoadTimeByDay);
    // 获取分类列表
    router.post('/getPageUrlListForLoadTime', LoadPageInfoController.getPageUrlListForLoadTime);
    // 获取页面影响人数
    router.post('/getPageUrlUserCount', LoadPageInfoController.getPageUrlUserCount);
    router.post('/getDifferentKindAvgLoadTimeListByHour', LoadPageInfoController.getDifferentKindAvgLoadTimeListByHour);
    router.post('/getDifferentKindAvgLoadTimeByHourForPageUrl', LoadPageInfoController.getDifferentKindAvgLoadTimeByHourForPageUrl);
    
    // 获取24小时分布
    router.get('/getPageUrlCountListByHour', LoadPageInfoController.getPageUrlCountListByHour);
    // 获取24小时分布
    router.post('/getPageUrlCountForHourByMinutes', LoadPageInfoController.getPageUrlCountForHourByMinutes);

    /**
     * JS错误信息接口
     */
    // 创建JS错误
    router.post('/javascriptErrorInfo', JavascriptErrorInfoController.create);
    // 获取JS错误列表
    router.get('/javascriptErrorInfo', JavascriptErrorInfoController.getJavascriptErrorInfoList);
    // 获取JS错误详情
    router.get('/javascriptErrorInfo/:id', JavascriptErrorInfoController.detail);
    // 删除JS错误
    router.delete('/javascriptErrorInfo/:id', JavascriptErrorInfoController.delete);
    // 更改JS错误
    router.put('/javascriptErrorInfo/:id', JavascriptErrorInfoController.update);
    // 获取每分钟的js错误量
    router.post('/getJavascriptErrorCountByMinute', JavascriptErrorInfoController.getJavascriptErrorCountByMinute);
    // 查询一个月内每天的错误总量
    router.get('/getJavascriptErrorInfoListByDay', JavascriptErrorInfoController.getJavascriptErrorInfoListByDay);
    // 查询一个月内每天自定义的错误总量
    router.get('/getConsoleErrorInfoListByDay', JavascriptErrorInfoController.getConsoleErrorInfoListByDay);
    // 查询一个天内每小时的错误量
    router.get('/getJavascriptErrorInfoListByHour', JavascriptErrorInfoController.getJavascriptErrorInfoListByHour);
    // 查询一个天内某个错误每小时的错误量
    router.get('/getJavascriptErrorCountListByHour', JavascriptErrorInfoController.getJavascriptErrorCountListByHour);
    // 查询一个天内某个错误每小时的错误量
    router.get('/getJsErrorCountByHour', JavascriptErrorInfoController.getJsErrorCountByHour);
    // 查询一个天内每小时的自定义错误量
    router.get('/getJavascriptConsoleErrorInfoListByHour', JavascriptErrorInfoController.getJavascriptConsoleErrorInfoListByHour);
    // 根据JS错误数量进行分类排序
    router.post('/getJavascriptErrorSort', JavascriptErrorInfoController.getJavascriptErrorSort);
    // 根据JS错误获取相关信息
    router.post('/getJavascriptErrorSortInfo', JavascriptErrorInfoController.getJavascriptErrorSortInfo);
    router.post('/getConsoleErrorSort', JavascriptErrorInfoController.getConsoleErrorSort);
    // 获取最近24小时内，js错误发生数量
    router.get('/getJavascriptErrorCountByHour', JavascriptErrorInfoController.getJavascriptErrorCountByHour);
    // 获取各种平台js报错数量
    router.get('/getJavascriptErrorCountByOs', JavascriptErrorInfoController.getJavascriptErrorCountByOs);
    // 获取各种平台js分类报错数量
    router.get('/getJavascriptErrorCountByType', JavascriptErrorInfoController.getJavascriptErrorCountByType);
    // 根据ErrorMsg获取js错误列表
    router.post('/getJavascriptErrorListByMsg', JavascriptErrorInfoController.getJavascriptErrorListByMsg);
    // 根据ErrorMsg获取js错误列表
    router.post('/getJavascriptErrorAboutInfo', JavascriptErrorInfoController.getJavascriptErrorAboutInfo);
    // 根据页面获取js错误列表
    router.get('/getJavascriptErrorListByPage', JavascriptErrorInfoController.getJavascriptErrorListByPage);
    // 定位JS错误代码
    router.post('/getJavascriptErrorStackCode', JavascriptErrorInfoController.getJavascriptErrorStackCode);
    // 定位JS错误代码, 源码位置
    router.post('/getJavascriptErrorStackCodeForSource', JavascriptErrorInfoController.getJavascriptErrorStackCodeForSource);
    // 定位JS错误代码, url
    router.post('/getJavascriptErrorStackCodeForUrl', JavascriptErrorInfoController.getJavascriptErrorStackCodeForUrl);
    // 上传map文件
    router.post('/uploadMapFile', JavascriptErrorInfoController.uploadMapFile);
    /**
     * JS错误信息截屏接口
     */
    // 创建截屏信息
    router.post('/screenShotInfo', ScreenShotInfoController.create);
    // 获取忽略js截屏信息列表
    router.get('/getScreenShotInfoListByPage', ScreenShotInfoController.getScreenShotInfoListByPage);
    // 获取截屏详情
    router.get('/screenShotInfo/:id', ScreenShotInfoController.detail);
    // 删除截屏
    router.delete('/screenShotInfo/:id', ScreenShotInfoController.delete);
    /**
     * 忽略js错误信息接口
     */
    // 创建忽略js错误信息
    router.post('/ignoreError', IgnoreErrorController.create);
    // 获取忽略js错误信息列表
    router.get('/ignoreError', IgnoreErrorController.getIgnoreErrorList);
    // 获取应用忽略js错误信息列表
    router.get('/ignoreErrorByApplication', IgnoreErrorController.ignoreErrorByApplication);
    // 获取忽略js错误信息详情
    router.get('/ignoreError/:id', IgnoreErrorController.detail);
    // 删除忽略js错误信息
    router.delete('/ignoreError/:id', IgnoreErrorController.delete);
    // 更改忽略js错误信息
    router.put('/ignoreError/:id', IgnoreErrorController.update);

    /**
     * 静态资源加载状态接口
     */
    // 获取静态资源错误分类
    router.get('/getResourceErrorCountByDay', ResourceLoadInfoController.getResourceErrorCountByDay);
    router.post('/getResourceLoadInfoListByDay', ResourceLoadInfoController.getResourceLoadInfoListByDay);
    // 获取最近24小时内，静态资源加载错误发生数量
    router.get('/getResourceErrorCountByHour', ResourceLoadInfoController.getResourceErrorCountByHour);


    // 获取每分钟的http量
    router.post('/getHttpCountByMinute', HttpLogInfoController.getHttpCountByMinute);
    // 根据加载时间分类
    router.post('/getHttpCountForLoadTimeGroupByDay', HttpLogInfoController.getHttpCountForLoadTimeGroupByDay);
    
    // 获取分类列表
    router.post('/getHttpUrlListForLoadTime', HttpLogInfoController.getHttpUrlListForLoadTime);
    
    // 获取接口影响人数
    router.post('/getHttpUrlUserCount', HttpLogInfoController.getHttpUrlUserCount);
    
    // 获取接口发生的页面
    router.post('/getPagesByHttpUrl', HttpLogInfoController.getPagesByHttpUrl);
    // 获取24小时分布
    router.get('/getHttpUrlCountListByHour', HttpLogInfoController.getHttpUrlCountListByHour);
    // 获取24小时分布
    router.post('/getHttpUrlCountForHourByMinutes', HttpLogInfoController.getHttpUrlCountForHourByMinutes);

    /**
     * 埋点数据相关
     */
    // 创建埋点分组
    router.post('/createLocationPointGroup', LocationPointGroupController.create);
    router.post('/getGroupNameList', LocationPointGroupController.getGroupNameList);
    router.post("/getLocationPointGroupList", LocationPointGroupController.getLocationPointGroupList)
    router.post("/deleteLocationPointGroup", LocationPointGroupController.delete)


    // 创建埋点大分类
    router.post('/createLocationPointType', LocationPointTypeController.create);
    // 获取大分类列表
    router.post('/getLocationPointTypeList', LocationPointTypeController.getLocationPointTypeList)
    // 删除大分类
    router.post('/deleteLocationPointType', LocationPointTypeController.delete)
    // 获取一个月内，每天的埋点数量
    router.post('/locationPointCountForMonth', LocationPointController.locationPointCountForMonth);
    router.post("/getLocationPointForDay", LocationPointController.getLocationPointForDay)
    router.post("/getFunnelLeftCountForDay", LocationPointController.getFunnelLeftCountForDay)

    // 创建漏斗分类
    router.post('/createFunnelType', FunnelController.create);
    router.post('/getFunnelList', FunnelController.getFunnelList)
    router.post('/deleteFunnel', FunnelController.delete)
    

    // 埋点上报接口
    router.post('/upBp', LocationPointController.createLocationPoint)
    router.get('/upBp', LocationPointController.createLocationPointForGet)


    /**
     * 接口请求报错相关接口
     */
    // 获取接口请求出错的实时数据量
    router.get('/getHttpErrorCountByHour', HttpErrorInfoController.getHttpErrorInfoListByHour);
    // 获取每天的接口请求出错的数据量
    router.get('/getHttpErrorCountByDay', HttpErrorInfoController.getHttpErrorCountByDay);
    // 获取每天的出错的接口请求列表
    router.post('/getHttpErrorListByDay', HttpErrorInfoController.getHttpErrorListByDay);
    // 根据url获取的出错的接口请求列表
    router.post('/getHttpErrorListByUrl', HttpErrorInfoController.getHttpErrorListByUrl);


    // 获取服务器状态数据
    // router.get('/getServerStatus', Common.getServerStatus);

    /**
     * 用户访问录屏信息
     */
    // 创建录屏信息
    // router.post('/videosInfo', VideosInfoController.create);
    // 
    router.post('/getVideosEvent', VideosInfoController.getVideosEvent)

    //创建配置
    router.post('/changeLogServerStatus', Common.changeLogServerStatus)
    router.post('/changeWaitCounts', Common.changeWaitCounts)
    router.post('/changeSaveDays', Common.changeSaveDays)
    router.post('/saveMysqlConfigsForNew', Common.saveMysqlConfigs)
    router.get('/getLogServerStatusForNew', Common.getLogServerStatus)

    // 获取警报检查频率
    router.post('/getCheckTime', AlarmController.getCheckTime)
    // 设置警报检查频率
    router.post('/changeCheckTime', AlarmController.changeCheckTime)
    // 获取JsError报警参数
    router.post('/getJsErrorConfig', AlarmController.getJsErrorConfig)
    // 设置JsError报警参数
    router.post('/changeJsErrorConfig', AlarmController.changeJsErrorConfig)
    // 获取console Error报警参数
    router.post('/getConsoleErrorConfig', AlarmController.getConsoleErrorConfig)
    // 设置ConsoleError报警参数
    router.post('/changeConsoleErrorConfig', AlarmController.changeConsoleErrorConfig)
    // 获取Http Error报警参数
    router.post('/getHttpErrorConfig', AlarmController.getHttpErrorConfig)
    // 设置HttpError报警参数
    router.post('/changeHttpErrorConfig', AlarmController.changeHttpErrorConfig)
    // 获取Resource Error报警参数
    router.post('/getResourceErrorConfig', AlarmController.getResourceErrorConfig)
    // 设置ResourceError报警参数
    router.post('/changeResourceErrorConfig', AlarmController.changeResourceErrorConfig)

    // 连接线上用户
    router.get('/connectUser', Common.connectUser)
    router.get('/getDebugInfoForLocalInfo', Common.getDebugInfoForLocalInfo)
    router.get('/getDebugInfoForVideo', Common.getDebugInfoForVideo)

    /**
     * git stars 相关信息
     */
    router.get('/gitStars', Common.gitStars);

    /**
     * 推送信息相关
     */
    router.get('/pushInfo', Common.pushInfo);

    /**
     * 更新信息相关
     */
    router.get('/updateInfo', Common.updateInfo);

    /**
     * 版本校验
     */
    router.get('/monitorVersion', Common.monitorVersion);

    /**
     * 获取项目版本号
     */
    router.get('/projectVersion', Common.projectVersion);
    /**
     * 获取项目配置信息
     */
    router.get('/pf', Common.projectConfig);
    // 获取日志服务所有相关信息
    router.get('/getSysInfo', Common.getSysInfo);

    /**
     * mysql状态
     */
    router.get('/mysqlStatus', Common.checkMysqlStatus);

    
    /**
     * 给后台提供的接口
     */
    // 查询某一天的使用UV数量
    router.post('/getUvCountForDay', CustomerPVController.getUvCountForDay);

    /**
     * Docker 心跳检测
     */
    router.get('/health', Common.dockerHealth);

    /**
     * 废弃接口
     */
    router.post('/searchUserBehaviors', Common.abortApis);

    /**
     * 测试接口
     */
    router.post('/test', Common.test);

}

module.exports = {
    createRoutes
}