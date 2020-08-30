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
   * 订单信息，里面装着商品的信息
   * @type {Array}
   */
  goodsList = [];
  editCache: { [key: string]: { edit: boolean; data: any } } = {};

  /**
   * 是否展示
   * @type {boolean}
   */
  isHidder = true;

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

    const data = [];
    for (let i = 0; i < 2; i++) {
      data.push({
        id: `${i}`,
        goodName: `Edrward ${i}`,
        status: 1,
      });
    }
    this.goodsList = data;
  }

  /**
   * 跳转到新增页面
   */
  routerAdd() {
    console.log("跳转：" + routers.motherOrderAddRouter);
    this.router.navigate([routers.motherOrderAddRouter]);
  }

  /**
   * 跳到更新页面
   * @param id
   */
  addGoodToOrder(data) {
    let copyData = this.goodsList;
    copyData.push(data);
    this.goodsList = copyData;
   //将list数据防止到editCache
   //this.updateEditCache();
   console.log(this.goodsList);
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.goodsList.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.goodsList[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.goodsList.findIndex(item => item.id === id);
    Object.assign(this.goodsList[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.goodsList.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  freshGoodsList(){
    this.goodsList.push({
      id:11,goodName:"测试"
    });
    console.log(this.goodsList);
  }

  showData(){
    this.isHidder = false;
  }
}
