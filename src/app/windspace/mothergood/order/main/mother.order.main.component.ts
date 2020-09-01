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

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  setOfCheckedId = new Set<number>();

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
}
