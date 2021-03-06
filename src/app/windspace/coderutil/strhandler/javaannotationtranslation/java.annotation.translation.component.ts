import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, strSpecialChar, urls} from '../../../../app.config';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';

@Component({
  selector: 'java-annotation-transaction',
  templateUrl: './java.annotation.translation.html',
  styleUrls: ['./java.annotation.translation.css']
})
export class JavaAnnotationTranslationComponent extends AbstractComponent{

  /**
   * 要处理的字符串
   */
  originStr:string;
  /**
   * 翻译的结果字符串
   */
  resultStr:string;
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("codeUtil主界面");
  }

  /**
   * 提交数据
   */
  submit(){
    //参数校验
    if(this.wzlutilService.isBlank(this.originStr)){
      this.wzlNgZorroAntdMessage.warning("数据不能为空");
      return;
    }
    //请求后台
    this.getJavaAnnotationTranslation();
  }

  /**
   * 请求获取更新语句
   */
  getJavaAnnotationTranslation(){
    let condition = {originStr:this.originStr};
    this.commonService.doHttpPost(urls.javaAnnotationTransUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let data = rst.data;
          if(data){
            this.wzlNgZorroAntdMessage.info("生成成功");
            //设置结果数据
            this.resultStr = data;
          }
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
   * 回车查询
   */
  pressEnter(event){
    if(event.which == asllCode.enter){
      //调用指定方法
      this.submit();
    }
  }




}
