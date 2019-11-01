import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls, websiteUrl} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

// 一定要声明AMap，要不然报错找不到AMap
declare var  AMap: any;
@Component({
  selector: 'translation-damo',
  templateUrl: './translation.exif.main.html',
  styleUrls: ['./translation.exif.main.css']
})
export class TranslationMainComponent extends AbstractComponent{

  /**
   * 翻译对象
   */
  translation:any = {};

  /**
   * 结果
   */
  result:string = "";

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("translation-damo组件");
  }

  /**
   * 翻译
   */
  trans(){
    if(this.wzlutilService.isBlank(this.translation.from)){
      this.wzlNgZorroAntdMessage.error("原文类型不能为空")
      return;
    }
    if(this.wzlutilService.isBlank(this.translation.to)){
      this.wzlNgZorroAntdMessage.error("结果类型不能为空")
      return;
    }
    if(this.wzlutilService.isBlank(this.translation.q)){
      this.wzlNgZorroAntdMessage.error("翻译文本不能为空")
      return;
    }

    let condition = this.translation;
    this.commonService.doHttpPost(urls.tranUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let transList = rst.data;
          if(transList){
            if(transList.length > 0){
              let tran = transList[0];
              this.result = tran.dst;
            }else{
              this.result = "哪国鸟语，我既然无法翻译";
            }
          }else{
            this.result = "哪国鸟语，我既然无法翻译";
          }
          this.wzlNgZorroAntdMessage.success("翻译成功");
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

  //查询天气回车
  pressEnter(event){
    if(event.which == asllCode.enter){
      this.trans();
    }
  }
}
