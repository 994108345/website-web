import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {routers, urls} from '../../../../app.config';
import {successStatus} from '../../../../common/service/base/common.config';

@Component({
  selector: 'mother-good-main',
  templateUrl: './mother.good.main.html',
  styleUrls: ['./mother.good.main.css']
})
export class MotherGoodMainComponent extends AbstractComponent{

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  setOfCheckedId = new Set<number>();

  /**
   * 商品查询对象
   */
  goodQueryRequest:any = {};

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
    //设置查询
    urls.queryUrl = urls.queryMotherGoodUrl;
    //默认查询
    this.queryBySearchParam();
  }

  ngOnInit(){
    console.log("MotherGoodMainComponent");
  }

  /**
   * 跳转到新增页面
   */
  addMotherGood(){
    this.router.navigate([routers.motherGoodAddRouter]);
  }

  /**
   * 跳到更新页面
   * @param id
   */
  routerUpdate(data){
    /**
     * 设置缓存值
     */
    this.wzlCache.setCache("motherGoodId",data.id);
    this.wzlCache.setCache("goodPic",data.goodPic);
    this.router.navigate([routers.motherGoodUpdateRouter]);
  }
}
