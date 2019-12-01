import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, isLocal, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'qrcode-query',
  templateUrl: './qrcode.query.html',
  styleUrls: ['./qrcode.query.css']
})
export class QrcodeQueryComponent extends AbstractComponent{

  //发送邮件对象
  qrCode:any = {}
  //查询的邮件对象
  qrCodes:any[];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("QrcodeQueryComponent界面");
  }


  /**
   * 查询二维码
   */
  queryQrCode(){
    if(this.wzlutilService.isBlank(this.qrCode.secretKey)){
      this.wzlNgZorroAntdMessage.error("秘钥不能为空");
      return;
    }
    if(this.qrCode.secretKey.length > 50){
      this.wzlNgZorroAntdMessage.error("秘钥长度不能大于50");
      return;
    }
    let condition = this.qrCode;
    this.commonService.doHttpPost(urls.queryQrCodeUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.qrCodes = rst.data;
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
