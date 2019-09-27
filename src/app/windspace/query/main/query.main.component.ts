import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'web-query',
  templateUrl: './query.main.html',
  styleUrls: ['./query.main.css']
})
export class QueryMainComponent extends AbstractComponent{

  //查询邮政编码返回的信息
  cityMessage:string;

  //查询邮政编码的城市名
  queryCity:string;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  @Output() private onDelete = new EventEmitter();

  ngOnInit(){
    console.log("query界面");


  }

  /**
   * 查询邮政编码
   */
  queryPostal(){
    let condition = {queryCity:this.queryCity};
    this.commonService.doHttpPost(urls.getPostalUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let data = rst.data;
          if(data.cityName == null && data.provinceName == null && data.areaName == null){
            this.cityMessage == null;
          }else{
            this.cityMessage = data.provinceName + data.cityName + data.areaName + ";邮政编码;" + data.postalCode;
          }
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
  // 查询邮政编码回车
  pressQueryPostal(event){
    if(event.which == asllCode.enter){
      this.queryPostal();
    }
  }


}
