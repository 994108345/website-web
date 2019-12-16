import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'word-manage',
  templateUrl: './word.manage..html.main.html',
  styleUrls: ['./word.manage.css']
})
export class WordManageComponent extends AbstractComponent{

  wordMessage:any = {};

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("main.main.component");
  }

  /**
   * 提交
   */
  commitWord(){
    if(this.wzlutilService.isBlank(this.wordMessage.content)){
      this.wzlNgZorroAntdMessage.error("文本内容不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.wordMessage.type)){
      this.wzlNgZorroAntdMessage.error("文本类型不能为空");
      return;
    }
    if(this.wordMessage.content.length > 1000){
      this.wzlNgZorroAntdMessage.error("文本内容长度不能大于1000");
      return;
    }
    let condition = this.wordMessage;
    this.commonService.doHttpPost(urls.insertWordUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success("提交成功");
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
