import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {queue_status_conf} from '../pic.config';

@Component({
  selector: 'pic-queue',
  templateUrl: './pic.queue.html',
  styleUrls: ['./pic.queue.css']
})
export class PicQueueComponent extends AbstractComponent{

  /**
   * 对象
   */
  picQueue:any = {};

  /**
   * 消息列表
   */
  queueList:any[] = [];

  /**
   * 图片队列状态
   */
  queue_status = queue_status_conf;



  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("PicQueueComponent");
  }

  /**
   * 查询邮政编码
   */
  queryQueue(){
    //this.paging(this.picQueue)
    let condition = this.picQueue;
    console.log("请求参数！"+condition)
    this.commonService.doHttpPost(urls.queryPicQueueUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.queueList = rst.data;
          this.wzlNgZorroAntdMessage.success("查询成功");
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
   * 翻页
   * @param event
   */
  indexChange(event){
    this.nzPageIndex = event;
    this.queryQueue();
  }


  /**
   * 每页条数变化
   */
  nzPasizeChange(event){
    this.nzPageSize = event;
    this.queryQueue();
  }
}
