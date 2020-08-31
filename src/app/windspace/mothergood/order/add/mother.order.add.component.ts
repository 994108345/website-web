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
export class MotherOrderAddComponent extends AbstractComponent {

  /**
   * 订单对象
   * @type {{}}
   */
  motherOrder:any = {};

  /**
   * 订单信息，里面装着商品的信息
   * @type {Array}
   */
  goodsList:any = [];

  /**
   * 总价
   * @type {number}
   */
  allPrice:number = 0 ;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log("MotherOrderAddComponent");
    //设置查询
    urls.queryUrl = urls.queryMotherGoodUrl;
    //默认查询
    this.queryBySearchParam();
  }

  /**
   * 跳转到新增页面
   */
  routerAdd() {
    console.log("跳转：" + routers.motherOrderAddRouter);
    this.router.navigate([routers.motherOrderAddRouter]);
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
        price = price + obj.goodCount * obj.originPrice
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
    this.goodsList = this.goodsList.filter(d => d.id !== i);
  }

  /**
   * 提交数据
   */
  submitOrder(){
    if(this.wzlutilService.arrayIsNull(this.goodsList)){
      this.wzlNgZorroAntdMessage.warning("商品不能为空");
      return ;
    }
    if(this.wzlutilService.isBlank(this.motherOrder.userName)){
      this.wzlNgZorroAntdMessage.warning("用户名不能为空");
      return ;
    }
    if(this.wzlutilService.isBlank(this.motherOrder.address)){
      this.wzlNgZorroAntdMessage.warning("收获地址不能为空");
      return ;
    }
    this.showDialog();
  }


  addOrder(){
    //订单总价
    this.motherOrder.allPrice = this.allPrice;
    let condition = {motherOrderGoodRes:this.goodsList,order:this.motherOrder};
    this.commonService.doHttpPost(urls.insertMotherOrderUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success("新增成功");
          this.router.navigate([routers.motherOrderMainRouter]);
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
   * 重写弹框的确定放啊发
   * @param addOrder
   */
  dialogOk(){
    super.dialogOk();
    this.addOrder();
  }


}
