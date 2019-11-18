import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {AbstractComponent} from '../../../service/abstract.component';
import {asllCode, urls} from '../../../../app.config';
import {successStatus} from '../../../service/base/common.config';

@Component({
  selector: 'six-face',
  templateUrl: './sixface.html',
  styleUrls: ['./sixface.css']
})
export class SixfaceComponent extends AbstractComponent{

  //图片src
  @Input()  imgSrcs:any = [];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit() {
    console.info("随机一句话模块");
  }

  /**
   * 获取鸡汤
   */
  getChickenSoup() {
    let condition = {};
    this.commonService.doHttpPost(urls.getChickenSoupUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {

          this.wzlNgZorroAntdMessage.success('查询成功');
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally(() => {
    });
  }
}
