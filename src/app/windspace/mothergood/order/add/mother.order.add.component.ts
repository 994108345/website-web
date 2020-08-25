import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {routers, urls} from '../../../../app.config';
import {successStatus} from '../../../../common/service/base/common.config';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'mother-order-add',
  templateUrl: './mother.order.add.html',
  styleUrls: ['./mother.order.add.css']
})
export class MotherOrderAddComponent extends AbstractComponent{

  /**
   * 商品对象
   */
  motherGood:any = {};

  //上传文件
  fileList: UploadFile[] = [];

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
   * 插入商品信息
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
    if(this.wzlutilService.isBlank(this.uploadPicUrl)){
      this.wzlNgZorroAntdMessage.warning("上传图片url不能为空");
      return;
    }else{
      this.motherGood.goodPic = this.uploadPicUrl;
    }

    let condition = this.motherGood;
    this.commonService.doHttpPost(urls.insertMotherGoodUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success("新增成功");
          this.router.navigate([routers.motherGoodMainRouter]);
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
