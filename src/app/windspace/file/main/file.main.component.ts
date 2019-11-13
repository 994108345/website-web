import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {mail_send_status_conf} from '../file.config';

@Component({
  selector: 'web-file',
  templateUrl: './file.main.html',
  styleUrls: ['./file.main.css']
})
export class FileMainComponent extends AbstractComponent{

  /**
   * 对象
   */
  fileUpload:any = {};

  /**
   * 消息列表
   */
  fileUploads:any[] = [];

  /**
   * 邮件发送状态
   */
  mailSendStatus = mail_send_status_conf;



  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("FileMainComponent");
  }

  /**
   * 查询上传的文件
   */
  queryFile(){
    let condition = this.fileUpload;
    this.commonService.doHttpPost(urls.queryFileUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.fileUploads = rst.data;
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
