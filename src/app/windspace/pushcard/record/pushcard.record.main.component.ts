import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls, websiteUrl} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';

@Component({
  selector: 'pushcard-record',
  templateUrl: './pushcard.record.main.html',
  styleUrls: ['./pushcard.record.main.css']
})
export class PushcardRecordMainComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("PushcardRecordMainComponent");
  }

}
