import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {mail_send_status_conf} from '../main.config';

@Component({
  selector: 'web-mail',
  templateUrl: './mail.main.html',
  styleUrls: ['./mail.main.css']
})
export class MailMainComponent extends AbstractComponent{

  /**
   * 对象
   */
  emailTimer:any = {};

  /**
   * 消息列表
   */
  emailTimers:any[] = [];

  /**
   * 邮件发送状态
   */
  mailSendStatus = mail_send_status_conf;



  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("mail.main.component");
  }

  /**
   * 查询邮政编码
   */
  queryMail(){
    let condition = this.emailTimer;
    this.commonService.doHttpPost(urls.queryMailUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.emailTimers = rst.data;
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
}
