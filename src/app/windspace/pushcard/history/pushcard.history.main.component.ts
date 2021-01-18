import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls, websiteUrl} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'pushcard-history-main',
  templateUrl: './pushcard.history.main.html',
  styleUrls: ['./pushcard.history.main.css']
})
export class PushcardHistoryMainComponent extends AbstractComponent{
  /**
   * 时间范围
   */
  dateRange:Date[];
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
    //设置查询
    urls.queryUrl = urls.pushCardHistoryQueryUrl;
    //默认查询
    this.queryBySearchParam();
  }


  ngOnInit(){
    console.log("PushcardHistoryMainComponent");
  }

  /**
   * 查询
   */
  queryRequest(){
    if(!this.wzlutilService.arrayIsNull(this.dateRange)){
      if(this.dateRange.length > 1){
        this.nzSearchParams.startTime = this.dateRange[0];
      }
      if(this.dateRange.length > 1){
        this.nzSearchParams.endTime = this.dateRange[1];
      }
    }
    this.queryBySearchParam();
  }

  /**
   * 跳转到新增页面
   */
  routerHistoryAdd(){
    this.router.navigate([routers.pushCardHistoryAddRouter]);
  }

  /**
   * 跳到更新页面
   * @param id
   */
  routerUpdate(data){
    /**
     * 设置缓存值
     */
    this.wzlCache.setCache("pushCardId",data.id);
    this.router.navigate([routers.pushCardHistoryUpdateRouter]);
  }
}
