import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'down-pic',
  templateUrl: './pic.down.html',
  styleUrls: ['./pic.down.css']
})
export class PicDownComponent extends AbstractComponent{

  /**
   * 对象
   */
  queryParam:any = {};

  /**
   * 消息列表
   */
  picSrcs:any[] = [];


  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("PicDownComponent");
  }

  /**
   * 添加下载图片队列
   */
  savePic(){
    if(this.wzlutilService.isBlank(this.queryParam.word)){
      this.wzlNgZorroAntdMessage.error("查询内容不能为空");
      return;
    }
    if(this.queryParam.word.length > 50){
      this.wzlNgZorroAntdMessage.error("查询内容长度不能大于50");
      return;
    }
    if(this.wzlutilService.isBlank(this.queryParam.count)){
      this.wzlNgZorroAntdMessage.error("数量不能为空");
      return;
    }
    if(this.queryParam.count > 200){
      this.wzlNgZorroAntdMessage.error("数量不能大于100");
      return;
    }
    if(this.wzlutilService.isBlank(this.queryParam.beginNum)){
      this.wzlNgZorroAntdMessage.error("页码不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.queryParam.queueName)){
      this.wzlNgZorroAntdMessage.error("队列名称不能为空");
      return;
    }
    if(this.queryParam.queueName.length > 50){
      this.wzlNgZorroAntdMessage.error("队列名称长度不能大于50");
      return;
    }
    //设置队列类型为下载图片压缩包
    this.queryParam.type = 1;
    let condition = this.queryParam;
    this.commonService.doHttpPost(urls.addQueueUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success("新增成功");
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
