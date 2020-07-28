import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'test-manage',
  templateUrl: './test.manage.main.html',
  styleUrls: ['./test.manage.css']
})
export class TestManageComponent extends AbstractComponent{

  /**
   * 数据
   */
  testMessages:any[];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("TestManageComponent");
  }

  /**
   * 提交
   */
  hystrixTest(){
    let condition = {};
    this.commonService.doHttpPost("/website/hystrix/isolation",condition).then(rst =>{
      if (rst) {
        console.log("返回结果："+rst)
        let object = {id:1,message:rst};
        this.testMessages.push(object);
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
    });
    for (let i = 0; i < 100; i++) {

    }
  }
}
