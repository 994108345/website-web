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
}

