import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'query-bdpic',
  templateUrl: './bdpic.query.html',
  styleUrls: ['./bdpic.query.css']
})
export class BdpicQueryComponent extends AbstractComponent{

  /**
   * 对象
   */
  queryParam:any = {};

  /**
   * 消息列表
   */
  picSrcs:any[] = [];


  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("PicDownComponent");
  }

  /**
   * 查询上传的文件
   */
  queryPic(){
    this.paging(this.queryParam);
    let condition = this.queryParam;
    this.commonService.doHttpPost(urls.queryPicUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.picSrcs = rst.data.data;
          this.totalRecords = rst.data.listNum;
          this.wzlNgZorroAntdMessage.success("查询成功");
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
   * 翻页
   * @param event
   */
  indexChange(event){
    this.nzPageIndex = event;
    this.queryPic();
  }


  /**
   * 每页条数变化
   */
  nzPasizeChange(event){
    this.nzPageSize = event;
    this.queryPic();
  }

}
