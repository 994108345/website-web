import {ElementRef, Injector, OnDestroy} from '@angular/core';
import {CommonService} from './base/common.service';
import {Router} from '@angular/router';
import {AppGuardService} from '../guard/app.gurad.service';
import {WzlCacheService} from '../service/wzlcache/wzlceche.service';
import {WzlngzorroantdmessageService} from './wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {successStatus} from './base/common.config';
import {FormBuilder, FormGroup} from '@angular/forms';
import {asllCode, routers, urls} from '../../app.config';
import {WzlutilService} from './wzlutil/wzlutil.service';
import {UploadFile} from 'ng-zorro-antd';

/**
 * Created by wenzailong on 2017/12/21.
 */
export class AbstractComponent implements OnDestroy {
  /*屏幕的宽度*/
  //screnWidth:number = screnWidth;
  /*屏幕的长度*/
  //screnHeight:number = screnHeight;
  order: any = {};//一个记录
  orders: any[] = [];//一个记录列表
  commonRouters: any;//页面路由管理
  commonUrls: any;//页面内基本操作的url
  status: any;//后台返回信息的状态
  totalRecords: number;//总共记录数
  searchParams: any = {};//查询条件
  table: any;//查询表格
  selectOrder: any;//选择的表单
  msgsDialog: any;//弹出窗的报错信息

  /*------------------------------图片上传默认配置--------------------------*/
  //上传文件
  fileList: UploadFile[] = [];
  //文件大小
  pictureSize:number = 1024*20;
  //文件类型
  pictureType:string = 'image/png,image/jpeg';
  //图片上传后的url
  uploadPicUrl:string = "";

  userInfo: any = {};//用户信息

  /*ng-zorro------------------------------------b表单--*/
  nzPageIndex: number = 1;//当前页码
  nzSearchParams: any = {};//请求参数
  nzPageSize: number = 10;//一页多少条数据
  dataSet = [];//数据
  selectData = [];//选择的数据
  isPaging: boolean = true;//是否分页
  isFirst: boolean = true;//是否首次加载
  tabName:string = "";//窗体tab的名称
  isEdit:boolean = false;//是否为编辑页面
  ordersInfo: FormGroup;//表单验证实体

  /*-----------------单选框--------------------------*/
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  isOperating = false;
  numberOfChecked = 0;
  /*===================tag================================*/
  tags = [  ];
  inputVisible = false;
  inputValue = '';
  inputElement: ElementRef;

  /*-----------------------对话框-------------------------------*/
  //对话框是否显示
  isVisible = false;
  /*-------------------------抽屉--------------------------------*/
  //抽屉是否显示
  drawerIsVisible = false;
  /**
   * 结果图片的url
   */
  resultPicUrl:string = "";

  /*oss获取上传文件的url*/
  ossUploadUrl:string;

  /*后端返回信息*/
  rst: any = {dat: {}, message: '', status: -10000};

  constructor(public injector: Injector) {
  }

  ngOnInit() {
    console.log("基类");
  }

  /*当页面销毁时*/
  ngOnDestroy() {
    /*localStorage.clear();*/
  }

  /*刷新当前页*/
  refresh() {
    if (this.table) {
      this.table.reset();
    }
  }

  /*将对象转化成json字符串对象*/
  toJsonStr(obj: any) {
    let jsonStr = JSON.stringify(obj);
    return jsonStr;
  }

  /*将json字符串转成json对象
  * 注意！转化成是一个json对象数组
  * */
  toJsonObject(json: any) {
    let jsonObj = JSON.parse(json);
    return jsonObj;
  }

  /*将json字符串转成json对象
   * 注意！转化成是一个json对象数组,这里取第一个
   * */
  toJsonObjs(json: any) {
    let jsonObj = JSON.parse(json);
    return jsonObj[0];
  }

  //超时执行
  /*
  setTimeout(() => {
   this.blockedDocument = false;
   }, 3000);
   */

  /*对象转换，防止引用传递*/
  changeObject(a: any) {
    if (!(a instanceof Object) || (a instanceof Array)) {
      return a;
    }
    let b = {};
    for (let attr in a) {
      b[attr] = this.changeObject(a[attr]);
    }
    return b;
  }

  /*是否为大于0的数字*/
  isNumber(data: any) {
    if (!(data >= 0 || data <= 0)) {
      return false;
    }
    return true;
  }

  /**
   * 文本框验证
   * @param value 输入框的值
   * @param valueName 值的中文名
   * @param type 值的类型，默认不传是string，date：时间，number：数字
   */
  inputVerify(value: any, valueName: string, type?: string) {
    if (type) {
      type = 'string';
    }

  }


  /** ----------从DI构造器中手动获取服务-----------*/
  get commonService(): CommonService {
    return this.injector.get(CommonService);
  }

  /*路由服务*/
  get router(): Router {
    return this.injector.get(Router);
  }

  /*路由守卫服务*/
  get appGuard(): AppGuardService {
    return this.injector.get(AppGuardService);
  }
  /*缓存服务*/
  get wzlCache(): WzlCacheService {
    return this.injector.get(WzlCacheService);
  }

  /*消息服务*/
  get wzlNgZorroAntdMessage(): WzlngzorroantdmessageService {
    return this.injector.get(WzlngzorroantdmessageService);
  }

  /**
   * 工具类服务
   */
  get wzlutilService(): WzlutilService {
    return this.injector.get(WzlutilService);
  }

  /*初始化require*/
  /*  requireInstance(){
      var System: any;
      System.import('/assets/js/regular-expresions.js').then(file => {
        file.test();
      });
    }*/

  /*将循环依赖的json对象数组，转换成json字符串*/
  toJsonByRequest(arr: any[]) {
  }

  /*时间格式转换成字符串*/
  dateTostr(date: any): string {
    //let result = moment(date).format('YYYY-MMMM-DD , hh:mm:ss ');
    //return result;
    return null;
  }

  /**
   * 设置分页参数
   */
  ngZorroSearParam() {
    this.nzSearchParams.curPage = this.nzPageIndex;
    this.nzSearchParams.pageSize = this.nzPageSize;
    this.nzSearchParams.isPaging = true;
    return this.nzSearchParams;
  }

  /*每页数据数目改变*/
  sizeChange(event) {
    if (!this.isFirst) {
      this.nzPageSize = event;
      this.queryBySearchParam();
    }
  }

  /*页码改变*/
  indexChange(event) {
    console.info("页面变化进来了吗");
    this.nzPageIndex = event;
    this.queryBySearchParam();
  }

  /**
   * 每页数据数量变化
   * @param event
   */
  pageSizeChange(event) {
    console.info("每页数据数量变化进来了吗");
    this.nzPageSize = event;
    this.queryBySearchParam();
  }

  /*数据改变*/
  dataChange(event) {
    console.log('数据改变' + event);
  }

  /**
   * 通用查询方法
   */
  queryBySearchParam() {
    let condition = this.ngZorroSearParam();
    this.commonService.doHttpPost(urls.queryUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success('查询成功');
          this.dataSet = rst.listData;
          this.totalRecords = rst.total;
          //调用查询方法钩子
          this.queryMethodParam();
          //将数据复制给选择器使用的数据
          this.listOfDisplayData = this.dataSet;
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
    });
  }

  /**
   * 插入方法钩子
   */
  queryMethodParam(){

  }

  /**
   * 通用插入方法
   */
  insertBySearchParam() {
    let condition = this.ngZorroSearParam();
    this.commonService.doHttpPost(urls.insertUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success('插入成功');
          //调用插入方法钩子
          this.insertMethodParam();
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
    });
  }

  /**
   * 插入方法钩子
   */
  insertMethodParam(){

  }

  /**
   * 通用更新方法
   */
  updateBySearchParam() {
    let condition = this.ngZorroSearParam();
    this.commonService.doHttpPost(urls.updateUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success('更新成功');
          //更新方法的钩子
          this.updateMethodParam();
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      console.log("请求出现异常：" + rtc);
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
    });
  }

  /**
   * 更新方法钩子
   */
  updateMethodParam(){

  }

  /**
   * 通用删除方法
   */
  deleteBySearchParam() {
    let condition = this.ngZorroSearParam();
    this.commonService.doHttpPost(urls.deleteUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success('删除成功');
          //删除方法钩子
          this.deleteMethodParam();
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
    });
  }

  /**
   * 删除方法钩子
   */
  deleteMethodParam(){

  }
  /*单选框*/
  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.selectData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 !== 0));
        this.refreshStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.selectData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 === 0));
        this.refreshStatus();
      }
    }
  ];

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => this.mapOfCheckedId[ item.id ] = false);
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }

  /*--------小tag-----------*/
  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [ ...this.tags, this.inputValue ];
    }
    this.inputValue = '';
    this.inputVisible = false;

    this.tagsChange();
  }
  /**
   * 标签改变
   * @param event
   */
  tagsChange(){
  }

  statusChange(value,list):string{
    for (let status of list){
      if(status.value == value){
        return status.label;
      }
    }
    return '';
  }

  /**
   * 数组删除指定元素
   * @param dataArr 原数组
   * @param deleteMap 需要删除的数组元素集合,用map表示，value和key一样
   */
  arrRemoveDatas(dataArr, deleteMap){
    let result= new Array();
    for(let data of dataArr){
      if(deleteMap.get(data)){

      }else{
        result.push(data);
      }
    }
    return result;
  }

  arrRemoveOneData(dataArr,value){
    let result= new Array();
    for(let data of dataArr){
      if(value != data){
        result.push(data);
      }
    }
    return result;
  }

  /*数组转成map*/
  arrToMap(arr){
    let map = new Map();
    if(arr){
      for(let ar of arr){
        map.set(ar,ar);
      }
    }
    return map;
  }

  /*重置查询参数*/
  reSetParam(){

  }

  /*跳转主页*/
  goHome(){
    this.router.navigate([routers.homeRouter]);
  }

  /*查询文章列表*/
  getArticleAllInfos(){

  }

  /**
   * 取 start--start 之间的随机整数 (包前不包后)
   * @param start 开始
   * @param end 结束
   */
  randomNum (start,end){
    let num = Math.floor(Math.random()*(end - start) + start);
    return num;
  }

  /**
   * 分页参数授予
   * @param param
   */
  paging(param:any){
    param.pageSize = this.nzPageSize;
    param.curPage = this.nzPageIndex;
    param.paging = true;
  }

  /**
   * 回车查询
   */
  pressEnter(event,method){
    if(event.which == asllCode.enter){
      //调用指定方法
      method();
    }
  }

  /**
   * 保持永远只有一个图片
   * @param file
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    if(this.fileList.length > 1){
      this.fileList[0] = this.fileList[1];
      this.fileList.pop();
    }
    //上传图片获取url
    this.getUrlByUploadFile();
    return false;
  };

  /**
   * 上传图片获取图片url
   */
  getUrlByUploadFile(){
    const formData = new FormData();
    //拼接表单参数
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.commonService.doHttpPostForm(urls.getUrlByUploadPic,formData).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.uploadPicUrl = rst.data;
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
    });
  }

  /**
   * 上传文件时的状态胖段(暂时没用到)
   * @param info
   */
  uploadHandleChange(info): void {
    console.log("上传进来了吗");
    if (info.file.status !== 'uploading') {
        console.log("上传中");
    }
    if (info.file.status === 'done') {
      console.log("上传成功");
      //上传文件
      this.getUrlByUploadFile();
    } else if (info.file.status === 'error') {
      console.log("上传报错");
    }
  }

  /**
   * 传进来url，根据url查询
   * @param url
   */
  queryByUrl(url){
    urls.queryUrl = url;
    this.queryBySearchParam();
  }
  /*------------------------弹窗图片预览 begin-------------------------*/
  //预览图片的url
  previewImage: string | undefined = '';
  //是否预览
  previewVisible = false;
  //预览的方法
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
  /**
   * 设置各种参数
   */
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  /*------------------------弹窗图片预览 end-------------------------*/


  /*----------------------------对话框------------------------------------*/

  /**
   * 展示对话框
   */
  showDialog(){
    this.isVisible = true;
  }
  /**
   * 对话框点确定
   * @param mothod
   */
  dialogOk(){
    this.isVisible = false;
  }

  /**
   * 对话框点取消
   */
  dialogCancel(){
    this.isVisible = false;
  }
/*--------------------------------抽屉-------------------------------*/
  //开启抽屉
  openDrawer(): void {
    this.drawerIsVisible = true;
  }

  /**
   * 关闭抽屉
   */
  closeDrawer(): void {
    this.drawerIsVisible = false;
  }

  /*--------------------------------备注处理------------------------------------*/
  /**
   * 备注处理
   * @param remark
   * @param index
   */
  remarkHandler(remark:string,index:number){
    let result = "";
    let length = remark.length;
    if(length > index){
      result = remark.substring(0,index) + "...";
    }else{
      result = remark;
    }
   return result;
  }
  /*-------------------------------折叠面板--------------------------------*/
  panels = [
    {
      active: false,
      name: '用户建议',
      disabled: false,
    }
  ];
}


