//网站项目路由
export const websiteUrl = "/website";

//是否是本地环境
export const isLocal = false;
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
  //查询图片exif信息
  queryPictureExifUrl:websiteUrl + "/exif/get-picture-exif",
  //改变图片
  changePictureUrl:websiteUrl + "/picturechange/change-picture",
  //查询图片
  queryPicUrl:websiteUrl + "/unified/crawlerTaskServiceImpl/queryBdPic",
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
  //新增一个iplog
  addIpLog:websiteUrl + "/unified/ipLogServiceImpl/insertOne",
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
};

/*跳转菜单页面路径*/
export const routers = {
  homeRouter:"menu/index",
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

