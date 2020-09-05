import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {asllCode, routers, urls} from '../../../../app.config';
import {successStatus} from '../../../../common/service/base/common.config';
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

  /**
   * 导出文本
   */
  exportText:string = "";

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("MotherOrderUpdateComponent");
    this.init();
  }

  /**
   * 初始化数据
   */
  init(){
    //获取缓存值
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
      console.log("请求出现异常：" + rtc);
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
    for (let obj of this.motherOrderGoods) {
      if(data.id === obj.id){
        obj.goodCount = obj.goodCount + 1;
        this.wzlNgZorroAntdMessage.info("添加商品:" + data.goodName + "成功");
        this.caculateAllPrice();
        return;
      }
    }
    data.goodCount = 1;
    data.goodSettlementPrice = data.originPrice;
    data.goodUsePriceType = 1;
    this.motherOrderGoods = [ ...this.motherOrderGoods,data];
    this.wzlNgZorroAntdMessage.info("添加商品:" + data.goodName + "成功");
    this.caculateAllPrice();
  }

  /**
   * 计算总价
   */
  caculateAllPrice(){
    let price = 0;
    for (let obj of this.motherOrderGoods) {
      let goodAllPrice = this.wzlutilService.accMul(obj.goodCount , obj.originPrice);
      price = this.wzlutilService.accAdd(price, goodAllPrice);
    }
    price = this.wzlutilService.accSub(price,this.motherOrder.couponAllPrice);
    this.motherOrder.allPrice = price;
    this.motherOrder.settlementPrice = price;
  }

  /**
   * 数量减1
   * @param data
   */
  subOne(data){
    for(let obj of this.motherOrderGoods){
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

  /**
   * 展示弹窗并且查询
   */
  showDialog() {
    super.showDialog();
    urls.queryUrl = urls.queryMotherGoodUrl;
    //默认查询
    this.queryBySearchParam();
  }

  /**
   * 保存订单
   */
  saveOrderInfo(){
    if(this.motherOrderInfo.order == null){
      this.wzlNgZorroAntdMessage.warning("订单信息不能为空");
    }
    if(this.wzlutilService.arrayIsNull(this.motherOrderInfo.goodList)){
      this.wzlNgZorroAntdMessage.warning("商品信息列表不能为空");
    }
    urls.updateUrl = urls.updateMotherOrderUrl;
    this.nzSearchParams = {order:this.motherOrder,goodList:this.motherOrderGoods};
    this.updateBySearchParam();
    //跳转到主页
    this.router.navigate([routers.motherOrderMainRouter]);
  }

  /**
   * 取消订单
   */
  cancelOrderInfo(){
    this.router.navigate([routers.motherOrderMainRouter]);
  }

  /**
   * 更新指定的订单状态
   * @param status
   */
  orderStatusChange(status){
    urls.updateUrl = urls.updateMotherOrderByOrderIdUrl;
    this.nzSearchParams = {status:status,orderId:this.motherOrder.orderId};
    let orderId = this.motherOrder.orderId;
    this.updateBySearchParam();
  }

  /**
   * 重写更新方法钩子
   */
  updateMethodParam() {
    super.updateMethodParam();
    //重新查询界面
    this.queryOrderInfoById(this.motherOrder.orderId);
  }

  /**
   * 打开抽屉
   */
  openDrawer(){
    super.openDrawer();
    this.exportOrderText();
  }
  /**
   * 导出订单信息
   * @param id
   */
  exportOrderText() {
    let condition = {orderIds:[this.motherOrder.orderId]};
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

  /**
   * 回车查询
   */
  pressEnter(event){
    if(event.which == asllCode.enter){
      //调用指定方法
      this.queryBySearchParam()
    }
  }

}
