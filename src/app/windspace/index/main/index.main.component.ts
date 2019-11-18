import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'web-menus',
  templateUrl: './index.main.html',
  styleUrls: ['./index.main.css']
})
export class IndexMainComponent extends AbstractComponent{

  /**
   * 图片的路由
   */
  imgSrcs:any[] = [];
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  @Output() private onDelete = new EventEmitter();

  ngOnInit(){
    console.log("index界面");
    let src = "http://wzl-sbc.oss-cn-shanghai.aliyuncs.com/oss_log_1573729457065_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191114190349.jpg?x-oss-process=image/resize,h_400";
    this.imgSrcs.push(src);
    this.imgSrcs.push(src);
    this.imgSrcs.push(src);
    this.imgSrcs.push(src);
    this.imgSrcs.push(src);
    this.imgSrcs.push(src);
  }
}
