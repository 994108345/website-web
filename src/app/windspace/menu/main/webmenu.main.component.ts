import {Component, Injector, TemplateRef, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'web-menus',
  templateUrl: './webmenu.main.html',
  styleUrls: ['./webmenu.main.css']
})
export class WebmenuMainComponent extends AbstractComponent{

  //菜单是否内嵌
  isCollapsed:boolean = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("网站菜单主页进来了吗");
    //存储ip地址
    this.saveClientIp();
    //跳转到主页
    this.goHome()
  }

  /*内嵌菜单*/
  toggleCollapsed():void{
    this.isCollapsed  = !this.isCollapsed;
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  /**
   * 登出
   */
  loginOut(){}

  /**
   * 保存客户端的ip地址
   */
  saveClientIp(){
    let ip = this.wzlutilService.getIpAddress();
    let condition = {clientIp:ip.ip,ipAddress:ip.address,cardId:ip.id};
    this.commonService.doHttpPost(urls.addIpLog,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
        } else {
        }
      } else {
      }
    }).catch(rtc => {
    }).finally( () => {
    });
  }

}
