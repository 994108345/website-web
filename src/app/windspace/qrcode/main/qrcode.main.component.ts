import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey,  routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'web-qrcode',
  templateUrl: './qrcode.main.html',
  styleUrls: ['./qrcode.main.css']
})
export class QrcodeMainComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("QrcodeMainComponent界面");
  }

}
