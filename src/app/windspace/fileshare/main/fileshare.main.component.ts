import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'file-share',
  templateUrl: './fileshare.main.html',
  styleUrls: ['./fileshare.main.css']
})
export class FileshareMainComponent extends AbstractComponent{

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
    let condition = {};
    this.commonService.doHttpPost(urls.getPostalUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let data = rst.data;
          if(data) {

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
}
