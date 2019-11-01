//网站项目路由
export const websiteUrl = "/website";
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
  /*------------------------------------------file upload--------------------------------------------------------*/
  uploadFile:websiteUrl + "/file/upload",
  /*---------------------------------------翻译---------------------------------------------------*/
  tranUrl:websiteUrl + "/unified/translationDaoImpl/translationByRequest"
};

/*跳转菜单页面路径*/
export const routers = {
  webRouter:"",
  homeRouter:"",
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

