import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'send-mail',
  templateUrl: './send.mail.html',
  styleUrls: ['./send.mail.css']
})
export class SendMailComponent extends AbstractComponent{

  //是否显示抽屉
  visible:boolean = false;
  //发送邮件对象
  sendEmail:any = {}

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("mail-send界面");
  }

  /**
   * 查询邮政编码
   */
  addEmail(){
    if(this.wzlutilService.isBlank(this.sendEmail.secretKey)){
      this.wzlNgZorroAntdMessage.error("秘钥不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.sendEmail.receiveMail)){
      this.wzlNgZorroAntdMessage.error("接收人邮箱不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.sendEmail.topic)){
      this.wzlNgZorroAntdMessage.error("邮件标题不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.sendEmail.postMessage)){
      this.wzlNgZorroAntdMessage.error("发送内容不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.sendEmail.actionTime)){
      this.wzlNgZorroAntdMessage.error("发送时间不能为空");
      return;
    }
    let condition = this.sendEmail;
    this.commonService.doHttpPost(urls.addMailUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success("添加成功");
          //跳转到查看页面
          this.router.navigate(["menu/mail"]);
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

  //自动输入框
  options: string[] = [];
  onChange(value: string): void {
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
  }

  /**
   * 显示抽屉
   */
  drawerShow(bool:boolean){
    this.visible = bool;
  }

}
