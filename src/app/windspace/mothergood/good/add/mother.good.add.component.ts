import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {appRouters, urls} from '../../../../app.config';
import {successStatus} from '../../../../common/service/base/common.config';

@Component({
  selector: 'mother-good-add',
  templateUrl: './mother.good.add.html',
  styleUrls: ['./mother.good.add.css']
})
export class MotherGoodAddComponent extends AbstractComponent{

  /**
   * 商品对象
   */
  motherGood:any = {};

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("MotherGoodMainComponent");
    //初始化默认值
    //品类默认选中海鲜
    this.motherGood.category = "1";
    this.motherGood.discountPrice = 0;
  }

  /**
   * 查询商品信息
   */
  insertMotherGood(){
    if(this.wzlutilService.isBlank(this.motherGood.goodName)){
        this.wzlNgZorroAntdMessage.warning("商品名称不能为空");
        return;
    }
    if(this.wzlutilService.isBlank(this.motherGood.category)){
      this.wzlNgZorroAntdMessage.warning("商品品类不能为空");
      return;
    }
    if(!this.motherGood.originPrice){
      this.wzlNgZorroAntdMessage.warning("原价不能为空");
      return;
    }
    if(!this.motherGood.discountPrice){
      this.wzlNgZorroAntdMessage.warning("折扣价不能为空");
      return;
    }

    let condition = this.motherGood;
    this.commonService.doHttpPost(urls.insertMotherGoodUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
          this.router.navigate([appRouters.motherGoodMainRouter]);
        } else {
          this.wzlNgZorroAntdMessage.success("查询成功");
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
    });
  }
}
