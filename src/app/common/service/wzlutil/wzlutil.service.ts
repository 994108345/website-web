import {Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HeapProfiler} from 'inspector';
import {strSpecialChar} from '../../../app.config';

declare var returnCitySN: any;

@Injectable()
export class WzlutilService {

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
  }


  /**
   * 验证字符串是否为空
   * @param str
   */
  isBlank(str:any):boolean{
    let bol = false;
    if(str === undefined){
      return true;
    }
    if(!str){
      return true;
    }
    if(str === ""){
      return true;
    }
    return bol;
  }

  /**
   * 验证字符串是否为空
   * @param str
   */
  isNumBlank(str:any):boolean{
    let bol = false;
    if(str === undefined){
      return true;
    }
    if(!str){
      return true;
    }
    if(str === ""){
      return true;
    }
    return bol;
  }

  /**
   * 是否不为空
   * @param str
   */
  isNotBlank(str:any):boolean{
    let bol = false;
    if(str && str !== "" && str !== undefined){
      return true;
    }
    return bol;
  }

  /**
   * 去空格
   * @param str
   */
  trim(str){
    str.replace(/(^\s*)|(\s*$)/g, "");
    return str;
  }

  /**
   * 获取ip地址
   */
  getIpAddress() {
    console.log("ip_json：" + JSON.stringify(returnCitySN));
    let data = {ip:"",address:"",id:""};
    data.ip = returnCitySN["cip"];
    data.address = returnCitySN["cname"];
    data.id = returnCitySN["cid"];
    return data
  }

  /**
   * 相对比当前时间，超出多少时间戳
   * @param time 时间戳
   */
  outTimeOfNow(time:number):number{
    let nowDate = new Date();
    let timeNum = nowDate.getTime() - time;
    return timeNum;
  }

  /**
   * 打开新页面
   * @param str 新页面的数据
   */
  newTxtPage(str:string){
    console.log("newTxtPage---util")
    let winSave = window.open();
    winSave.document.open("html","utf-8");
    //替换换行符，换成标签，让数据换行
    str = str.replace(strSpecialChar.new_line,"<br>");
    winSave.document.write(str);
  }

  /*------------------------------------集合操作----------------------------------------*/
  /**
   *  数组是否为空
   * @param data
   * @returns {boolean}
   */
  arrayIsNull(data){
    let result = false;
    if(data === undefined){
      return true;
    }
    if(data == null){
      return true;
    }
    if(data.length == 0){
      return true;
    }
    return false;
  }

  /**
   * 数据是否不为空
   * @param data
   * @returns {boolean}
   */
  arrayIsNotNull(data){
    return !this.arrayIsNull(data);
  }

  /*---------------------------------------------浮点型的计算方法----------------------------------------------------*/
  /**
   * 加法
   * @param a
   * @param b
   */
  accAdd(a, b) {
    var c, d, e;
    try {
      c = a.toString().split(".")[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split(".")[1].length;
    } catch (f) {
      d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.accMul(a, e) + this.accMul(b, e)) / e;
  }

  /**
   * 减法
   * @param a
   * @param b
   */
  accSub(a, b) {
    var c, d, e;
    try {
      c = a.toString().split(".")[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split(".")[1].length;
    } catch (f) {
      d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.accMul(a, e) - this.accMul(b, e)) / e;
  }

  /**
   * 乘法
   * @param a
   * @param b
   */
  accMul(a, b) {
    var c = 0,
      d = a.toString(),
      e = b.toString();
    try {
      c += d.split(".")[1].length;
    } catch (f) { }
    try {
      c += e.split(".")[1].length;
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
  }

  /**
   * 除法
   * @param a
   * @param b
   */
  accDiv(a, b) {
    var c, d, e = 0,
      f = 0;
    try {
      e = a.toString().split(".")[1].length;
    } catch (g) { }
    try {
      f = b.toString().split(".")[1].length;
    } catch (g) { }
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.accMul(c / d, Math.pow(10, f - e));
  }
  /*-----------------number判断----------------------*/
  /**
   * 数字是否为空
   * @param a
   */
  numberIsBlank(a){
    if(a === undefined){
      return true;
    }
    if(a == null){
      return true;
    }
    return false;
  }
}

