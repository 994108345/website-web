import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, strSpecialChar, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'str-handler-main',
  templateUrl: './strhandler.main.html',
  styleUrls: ['./strhandler.main.css']
})
export class StrhandlerMainComponent extends AbstractComponent{

  /**
   * 要处理的字符串
   */
  originStr:string;
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("StrhandlerMainComponent主界面");
  }
}
