import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import { routers, urls} from '../../../../app.config';
import {successStatus} from '../../../../common/service/base/common.config';
import {UploadFile, UploadFileStatus} from 'ng-zorro-antd';
import {
  good_use_price_type_conf,
  mother_order_settlement_status_conf,
  mother_order_status_conf,
  mother_order_sub_status_conf
} from '../mother.order.config';


@Component({
  selector: 'mother-order-update',
  templateUrl: './mother.order.update.html',
  styleUrls: ['./mother.order.update.css']
})
export class MotherOrderUpdateComponent extends AbstractComponent{

  /**
   * 订单详情对象
   */
  motherOrderInfo:any = {order:{},goodList:[]};
  /**
   * 订单对象
   */
  motherOrder:any = {};
  /**
   * 订单商品信息
   */
  motherOrderGoods:any[] = [];

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
   * 商品使用价格类型
   */
  goodUsePriceType = good_use_price_type_conf;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("MotherOrderUpdateComponent");
    /**
     * 获取缓存值
     */
    let orderId = this.wzlCache.getCache("motherOrderId");
    //设置查询参数
    this.queryOrderInfoById(orderId);
  }

  /**
   * 更新订单的详情信息
   */
  updateMotherGood(){
    if(this.wzlutilService.isBlank(this.motherOrderInfo.goodName)){
      this.wzlNgZorroAntdMessage.warning("商品名称不能为空");
      return;
    }
    let condition = {};
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
  queryOrderInfoById(id) {
    let condition = {orderId:id};
    this.commonService.doHttpPost(urls.queryMotherOrderInfoUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.motherOrderInfo = rst;
          this.motherOrder = this.motherOrderInfo.order;
          this.motherOrderGoods = this.motherOrderInfo.goodList;
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

  /**
   * 添加数据
   * @param id
   */
  addGoodToOrder(data) {
    //循环数据，已存在则数量加1，不存在就直接添加到数据源中
    for (let obj of this.goodsList) {
      if(data.id === obj.id){
        obj.goodCount = obj.goodCount + 1;
        this.wzlNgZorroAntdMessage.info("添加商品:" + data.goodName + "成功");
        this.caculateAllPrice();
        return;
      }
    }
    data.goodCount = 1;
    this.goodsList = [ ...this.goodsList,data];
    this.wzlNgZorroAntdMessage.info("添加商品:" + data.goodName + "成功");
    this.caculateAllPrice();
  }

  /**
   * 计算总价
   */
  caculateAllPrice(){
    let price = 0;
    for (let obj of this.goodsList) {
      let goodAllPrice = this.wzlutilService.accMul(obj.goodCount , obj.originPrice);
      price = this.wzlutilService.accAdd(price, goodAllPrice);
    }
    this.allPrice = price;
  }

  /**
   * 数量减1
   * @param data
   */
  subOne(data){
    for(let obj of this.goodsList){
      if(data.id === obj.id){
        obj.goodCount = obj.goodCount - 1;
        if(obj.goodCount === 0){
          //如果数量已经删除到0则删除对应记录
          this.removeGoodOrder(obj.id);
        }
        this.wzlNgZorroAntdMessage.info("删除商品:" + data.goodName + "成功");
        this.caculateAllPrice();
        return;
      }

    }
  }

  /**
   * 删除数据
   * @param data
   */
  removeGoodOrder(i) {
    this.motherOrderGoods = this.motherOrderGoods.filter(d => d.id !== i);
  }

}
