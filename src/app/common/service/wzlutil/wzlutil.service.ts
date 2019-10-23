

import {Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
@Injectable()
export class WzlutilService {

  constructor() {
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
}

