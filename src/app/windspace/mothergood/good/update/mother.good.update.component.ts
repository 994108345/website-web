import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import { routers, urls} from '../../../../app.config';
import {successStatus} from '../../../../common/service/base/common.config';
import {UploadFile, UploadFileStatus} from 'ng-zorro-antd';


@Component({
  selector: 'mother-good-update',
  templateUrl: './mother.good.update.html',
  styleUrls: ['./mother.good.update.css']
})
export class MotherGoodUpdateComponent extends AbstractComponent{


  goodPic:string = "";
  /**
   * 商品对象
   */
  motherGood:any = {};

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("MotherGoodUpdateComponent");
    /**
     * 获取缓存值
     */
    let id = this.wzlCache.getCache("motherGoodId");
    this.goodPic = this.wzlCache.getCache("goodPic");
    //设置查询参数
    this.queryGoodById(id);
  }

  /**
   * 查询商品信息
   */
  updateMotherGood(){
    if(this.wzlutilService.isBlank(this.motherGood.goodName)){
      this.wzlNgZorroAntdMessage.warning("商品名称不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.motherGood.id)){
      this.wzlNgZorroAntdMessage.warning("商品id不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.motherGood.status)){
      this.wzlNgZorroAntdMessage.warning("商品状态不能为空");
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
    this.motherGood.lastModifiedTime = null;
    this.motherGood.createTime = null;

    let condition = this.motherGood;
    this.commonService.doHttpPost(urls.updateMotherGoodUrl,condition).then(rst =>{
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

  /**
   * 根据商品id查询商品详情
   * @param id
   */
  queryGoodById(id) {
    let condition = {id:id};
    this.commonService.doHttpPost(urls.queryMotherGoodUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          if(rst.listData && rst.listData.length > 0){
            this.motherGood = rst.listData[0];
            this.motherGood.status = this.motherGood.status.toString();
            this.motherGood.category = this.motherGood.category.toString();
            this.uploadPicUrl = this.motherGood.goodPic;
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
