import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from "../../../../common/service/abstract.component";
import {routers, urls} from "../../../../app.config";
import {successStatus} from "../../../../common/service/base/common.config";

@Component({
  selector: 'pushcard-record-caculate',
  templateUrl: './pushcard.record.caculate.html',
  styleUrls: ['./pushcard.record.caculate.css']
})
export class PushcardRecordCaculateComponent extends AbstractComponent{

  /**
   * 时间范围
   */
  dateRange:Date[];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("PushcardRecordMainComponent");
  }

  /**
   * 计算时间
   */
  caculate(){
    let condition = {startTime:this.dateRange[0],endTime:this.dateRange[1]};
    this.commonService.doHttpPost(urls.pushCardRecordCaculateUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("计算成功");
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

}
