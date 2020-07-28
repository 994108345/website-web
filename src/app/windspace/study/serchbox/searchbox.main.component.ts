import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {WzlutilService} from '../../../common/service/wzlutil/wzlutil.service';

@Component({
  selector: 'searchbox-main',
  templateUrl: './searchbox.main.html',
  styleUrls: ['./searchbox.main.css']
})
export class SearchboxMainComponent extends AbstractComponent{

  /**
   * 菜品名称
   */
  goodName:string;
  /**
   * 模糊查询结果
   */
  goodList:any[] = [];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("searchbox.component");
  }

  goodNameChange(goodName){
    if(this.wzlutilService.isNotBlank(goodName)){
      this.fuzyQueryGoddaName();
    }
  }

  /**
   * 查询菜名
   */
  fuzyQueryGoddaName(){
    let condition = {"goodName":this.goodName};
    this.commonService.doHttpPost(urls.fuzzyQueryGoodNameUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.goodList = rst.listData;
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
