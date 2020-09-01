//网站项目路由
export const websiteUrl = "/website";
export const zuulUrl = "/zuul";

/**
 * 配置
 */
export const baseConfig = {
  //是否是本地环境
  isLocal:true,
  //websocket的服务器地址
  websocketServer:"",
  //是否加载中
  isSpinning:false,
};

/*请求后端路径*/
export const urls = {
  /*-----------------------------------基础路径-------------------------------*/
  // 新增url
  addUrl:"",
  // 修改url
  editUrl:"",
  // 删除url
  deleteUrl:"",
  // 查询url
  queryUrl:"",
  // 查看明细url
  detailUrl:"",
  // 重传url
  retryUrl:"",
  // 下载url
  downUrl:"",
  /*-----------------------------------baseComponent--------------------------------------------*/
  insertAdviceUrl:websiteUrl + "/unified/userAdviceServiceImpl/insertAdvice",
  /*-----------------------------------chat--------------------------------------------*/
  //test接口
  sayHelloUrl: websiteUrl + "/chat/say-hello",
  //获取sessionId
  getSessionIdUrl: websiteUrl + "/chat/get-session-id",
  /*-----------------------------------query--------------------------------------------*/
  //查询邮政编码
  getPostalUrl:websiteUrl + "/unified/postalServiceImpl/queryCrawlerPostalService",
  //查询天气信息
  queryWeatherUrl:websiteUrl + "/unified/weatherServiceImpl/queryWeatherByCityName",
  //pdf转化成text信息
  pdfToTextUrl:websiteUrl + "/pdf/pdf-to-text",
  /*---------------------------------------------pic--------------------------------------------------*/
  //查询图片
  queryPicUrl:websiteUrl + "/unified/crawlerTaskServiceImpl/queryBdPic",
  //查询花瓣图片
  queryFlowerPicUrl:websiteUrl + "/unified/flowerServiceImpl/queryPicByRequest",
  //添加下载队列
  addQueueUrl:websiteUrl + "/unified/downloadQueueServiceImpl/addQueue",
  //查询图片的下载队列
  queryPicQueueUrl:websiteUrl + "/unified/downloadQueueServiceImpl/queryQueueByRequest",
  //查询图片exif信息
  queryPictureExifUrl:websiteUrl + "/exif/get-picture-exif",
  //改变图片
  changePictureUrl:websiteUrl + "/picturechange/change-picture",
  //图片加文字
  picAddTextUrl:websiteUrl + "/pictaddtext/add-text",
  //图片拼接
  joinPicUrl:websiteUrl + "/joinpic/join-pic",
  /*------------------------------------------file upload--------------------------------------------------------*/
  uploadFile:websiteUrl + "/file/upload",
  /*---------------------------------------翻译---------------------------------------------------*/
  tranUrl:websiteUrl + "/unified/translationDaoImpl/translationByRequest",
  /*------------------------------------------main--------------------------------------------*/
  //添加一个发送邮件任务
  addMailUrl:websiteUrl + "/unified/emailTimerServiceImpl/addOne",
  //查询一个邮件任务的信息
  queryMailUrl:websiteUrl + "/unified/emailTimerServiceImpl/queryByRequest",
  //上次图片获取url
  getUrlByUploadUrl:websiteUrl + "/uploadfile/get-url-by-upload",
  /*------------------------------------------ipLog--------------------------------------------*/
  //新增一个iplog(通过前端获取)
  addIpLog:websiteUrl + "/unified/ipLogServiceImpl/insertOne",
  //新增一个iplog(通过后端获取)
  addIpLogByServerUrl:websiteUrl + "/iplog/save-ip-log",

  /*--------------------------------------------fileUpload----------------------------------------------*/
  //上传文件
  upload_File:websiteUrl + "/uploadfile/upload-file",
  //查询文件
  queryFileUrl:websiteUrl + "/unified/ossFileLogServiceImpl/queryByRequest",
  /*---------------------------------------------获取随机话-----------------------------------------------------*/
  //获取彩虹屁
  getRainbowFartUrl:websiteUrl + "/unified/wordServiceImpl/getRainbowFart",
  //获取鸡汤
  getChickenSoupUrl:websiteUrl + "/unified/wordServiceImpl/getChickenSoup",
  //获取毒鸡汤
  getTaintedChickenSoupUrl:websiteUrl + "/unified/wordServiceImpl/getTaintedChickenSoup",
  //获取古诗词
  getAncientChinesePoetryUrl:websiteUrl + "/unified/wordServiceImpl/getAncientChinesePoetry",
  /*-----------------------------------------------二维码------------------------------------------------------*/
  //获取二维码（可以带图片）
  getQrCodeUrl:websiteUrl + "/unified/qrCodeServiceImpl/createQrCode",
  //获取二维码（纯文本）
  getQrCodeTextUrl:websiteUrl + "/unified/qrCodeServiceImpl/createQrCodeAllTest",
  //查询二维码
  queryQrCodeUrl:websiteUrl + "/unified/qrCodeServiceImpl/queryQrCodeByRequest",
  /*----------------------------------------------管理项目------------------------------------------------------*/
  //插入语句
  insertWordUrl:websiteUrl + "/unified/wordServiceImpl/insertWordByType",
  //上传图片
  upload_pic:websiteUrl + "/uploadfile/upload-pic",
  //上传图片
  query_ip_log_Url:websiteUrl + "/unified/ipLogServiceImpl/queryEarly20IpLog",

  /*-----------------------------------------------学习-------------------------------------------------------*/
  //模糊查询菜品名
  fuzzyQueryGoodNameUrl:websiteUrl + "/unified/goodQueryServiceImpl/getSearchBoxWord",
  /*-----------------------------------------------程序员工具---------------------------------------------------------*/
  //获取更新语句
  getUpdateSqlUrl:websiteUrl + "/unified/coderUtilServiceImpl/getUpdateSql",
  //将换行符替换成空格
  lineTransferBlankUrl:websiteUrl + "/unified/coderUtilServiceImpl/lineTransferBlank",
  //将java注解快速翻译
  javaAnnotationTransUrl:websiteUrl + "/unified/coderUtilServiceImpl/javaAnnotationHandler",
  /*----------------------------------------------------登陆------------------------------------------------------*/
  //上传图片
  loginUrl:zuulUrl + "/login",
  otherHandlerUrl:zuulUrl + "/other",
  /*----------------------------------------------------配置------------------------------------------------------*/
  //查询指定type的配置
  queryConfigUrl:websiteUrl + "/unified/wsConfigServiceImpl/queryConfig",
  //查询对外配置
  queryOutConfigUrl:websiteUrl + "/unified/wsConfigServiceImpl/queryOutConfig",
  /*---------------------------------------------------mothergood-------------------------------------------------*/
  //查询mothergood的列表
  queryMotherGoodUrl:websiteUrl + "/unified/motherGoodServiceImpl/queryByRequest",
  //插入mothergood
  insertMotherGoodUrl:websiteUrl + "/unified/motherGoodServiceImpl/insertOne",
  //更新mothergood
  updateMotherGoodUrl:websiteUrl + "/unified/motherGoodServiceImpl/updateByRequest",
  /*---------------------------------------------------motherorder-------------------------------------------------*/
  //查询motherorder的列表
  queryMotherOrderUrl:websiteUrl + "/unified/motherOrderServiceImpl/queryByRrequest",
  //插入motherorder
  insertMotherOrderUrl:websiteUrl + "/unified/motherOrderServiceImpl/insertOne",
  //更新motherorder
  updateMotherOrderUrl:websiteUrl + "/unified/motherOrderServiceImpl/updateByRequest",
  //查询订单的详情信息
  queryMotherOrderInfoUrl:websiteUrl + "/unified/motherOrderServiceImpl/queryOrderInfoByRequest",

  /*----------------------------------------------通用接口--------------------------------------------------------------*/
  getUrlByUploadPic:websiteUrl + "/file/get_url_by_upload_pic",

};

/*跳转菜单页面路径*/
export const routers = {
  /*网站的主页面*/
  homeRouter:"menu/index",
  /*-------------------------mother_good--------------------------------------*/
  /*mothreGood的主页面*/
  motherGoodMainRouter: "mothermenu/mothergood",
  /*mothreGood的add页面*/
  motherGoodAddRouter: "mothermenu/mothergood/add",
  /*mothreGood的update页面*/
  motherGoodUpdateRouter: "mothermenu/mothergood/update",
  /*-------------------------mother_order--------------------------------------*/
  /*mothreOrder的主页面*/
  motherOrderMainRouter: "mothermenu/motherorder",
  /*mothreOrder的add页面*/
  motherOrderAddRouter: "mothermenu/motherorder/add",
  /*mothreOrder的update页面*/
  motherOrderUpdateRouter: "mothermenu/motherorder/update",
};

//缓存key
export const cacheKey = {
}

//传输事件名
export const  emitKey ={
}

/**
 * 键盘的输入的asll码
 */
export const asllCode = {
  enter:13,//回车
}

/**
 * 字符串的特殊符号
 */
export const strSpecialChar = {
  new_line:"&#10",//换行
}

