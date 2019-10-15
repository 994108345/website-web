import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';
import {asllCode, urls} from '../../../app.config';
import {successStatus} from '../../service/base/common.config';

@Component({
  selector: 'useradvice-root',
  templateUrl: './useradvice.html',
  styleUrls: ['./useradvice.css']
})
export class UseradviceComponent extends AbstractComponent{

  adviceObj:any = {};

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit() {
    console.info("用户建议模块");
  }

  /**
   * 新增用户建议
   */
  addAdvice() {
    let condition = this.adviceObj;
    this.commonService.doHttpPost(urls.insertAdviceUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.info("新增成功");
          //数据置空
          this.adviceObj.advice = null;
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally(() => {
    });
  }

  // 新增用户建议
  pressAdvice(event){
    if(event.which == asllCode.enter){
      this.addAdvice();
    }
  }
}
