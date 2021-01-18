import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from "../../../../common/service/abstract.component";
import {routers, urls} from "../../../../app.config";

@Component({
  selector: 'pushcard-record-list',
  templateUrl: './pushcard.record.list.html',
  styleUrls: ['./pushcard.record.list.css']
})
export class PushcardRecordListComponent extends AbstractComponent{

  /**
   * 时间范围
   */
  dateRange:Date[];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
    //设置查询
    urls.queryUrl = urls.pushCardRecordQueryUrl;
    //默认查询
    this.queryBySearchParam();
  }

  ngOnInit(){
    console.log("PushcardRecordMainComponent");
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
  routerRecordAdd(){
    this.router.navigate([routers.pushCardRecordAddRouter]);
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
    this.router.navigate([routers.pushCardRecordUpdateRouter]);
  }

}
