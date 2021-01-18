import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from "../../../../common/service/abstract.component";
import {urls} from "../../../../app.config";
import {successStatus} from "../../../../common/service/base/common.config";

@Component({
  selector: 'pushcard-record-calendar',
  templateUrl: './pushcard.record.calendar.html',
  styleUrls: ['./pushcard.record.calendar.css']
})
export class PushcardRecordCalendarComponent extends AbstractComponent{

  /**
   * 选择的时间
   */
  selectDate:any;

  /**
   * 统计的数据
   */
  statisticData:any;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("PushcardRecordMainComponent");
    this.selectDate = new Date();
    this.queryData();
  }

  /**
   * 时间变化的时候
   */
  monthChange(){
    this.queryData();
  }

  queryData(){
    this.queryDataByTime();
    this.getStatisticData();
  }

  listDataMap:any[];

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  /**
   * 计算时间
   */
  queryDataByTime(){
    let condition = {selectTime:this.selectDate};
    this.commonService.doHttpPost(urls.pushCardRecordInSelectTimeUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.listDataMap = rst.listData;
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
   * 获取统计数据
   */
  getStatisticData(){
    let condition = {selectTime:this.selectDate};
    this.commonService.doHttpPost(urls.pushCardRecordGetStatisticDataUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.statisticData = rst.data;
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
