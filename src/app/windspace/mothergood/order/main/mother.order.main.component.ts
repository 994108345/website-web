import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {routers, urls} from '../../../../app.config';
import {successStatus} from '../../../../common/service/base/common.config';
import {mother_order_settlement_status_conf, mother_order_status_conf, mother_order_sub_status_conf} from '../mother.order.config';

@Component({
  selector: 'mother-order-main',
  templateUrl: './mother.order.main.html',
  styleUrls: ['./mother.order.main.css']
})
export class MotherOrderMainComponent extends AbstractComponent{

  /**
   * 商品查询对象
   */
  goodQueryRequest:any = {};

  /**
   * 订单主状态
   */
  motherOrderStatus = mother_order_status_conf;
  /**
   * 订单子状态
   */
  motherOrderSubStatus = mother_order_sub_status_conf;
  /**
   * 订单结算状态
   */
  motherOrderSettlementStatus = mother_order_settlement_status_conf;

  /**
   * 导出文本
   */
  exportText:string = "";

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    //设置查询
    urls.queryUrl = urls.queryMotherOrderUrl;
    //默认查询
    this.queryBySearchParam();
    console.log("MotherOrderMainComponent");
  }

  /**
   * 跳转到新增页面
   */
  routerAdd(){
    console.log("跳转：" + routers.motherOrderAddRouter);
    this.router.navigate([routers.motherOrderAddRouter]);
  }

  /**
   * 跳到更新页面
   * @param id
   */
  routerUpdate(data){
    //设置缓存值
    this.wzlCache.setCache("motherOrderId",data.orderId);
    this.router.navigate([routers.motherOrderUpdateRouter]);
  }

  /**
   * 打开抽屉
   */
  openDrawer(){
    if(this.wzlutilService.arrayIsNull(this.listOfDisplayData)){
      this.wzlNgZorroAntdMessage.warning("请选择需要生成文本的数据");
      return;
    }
    super.openDrawer();
    this.exportOrderText();
  }

  /**
   * 导出订单信息
   * @param id
   */
  exportOrderText() {
    let orderIds:any[] = [];
    console.log(this.mapOfCheckedId);
    for(let obj of this.listOfDisplayData){
      if(this.mapOfCheckedId[obj.id]){
        orderIds.push(obj.orderId);
      }
    }
    let condition = {orderIds:orderIds};
    this.commonService.doHttpPost(urls.exportOrderTextUrl,condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.exportText = rst.data;
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
      console.log("请求出现异常：" + rtc);
    }).finally( () => {
      this.isFirst = false;
    });
  }
}
