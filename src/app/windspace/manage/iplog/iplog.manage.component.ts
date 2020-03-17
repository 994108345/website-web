import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'iplog-manage',
  templateUrl: './iplog.manage.main.html',
  styleUrls: ['./iplog.manage.css']
})
export class IplogManageComponent extends AbstractComponent{

  //ipLog数据源
  ipLogs:any[];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("main.main.component");
    this.queryIpLog();
  }

  /**
   * 提交
   */
  queryIpLog(){
    let condition = {};
    this.commonService.doHttpPost(urls.query_ip_log_Url,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
            this.ipLogs = rst.data;
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

  getColor(): string {
    let num = super.randomNum(1, 5);
    let result = "blue";
    if(num === 1){
      result = "red";
    }else if(num === 2){
      result = "green";
    }else if(num === 3){
      result = "gray";
    }else{
      result = "blue";
    }
    return result;
  }
}
