import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, strSpecialChar, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'coder-util-sql',
  templateUrl: './coderutil.sql.html',
  styleUrls: ['./coderutil.sql.css']
})
export class CoderutilSqlComponent extends AbstractComponent{

  sqlData:any = {};

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
    //参数家宴
    if(this.wzlutilService.isBlank(this.sqlData.tableName)){
      this.wzlNgZorroAntdMessage.warning("表明不能为空");
      return;
    }else if(this.wzlutilService.isBlank(this.sqlData.updateType)){
      this.wzlNgZorroAntdMessage.warning("类型不能为空");
      return;
    }else if(this.wzlutilService.isBlank(this.sqlData.setField)){
      this.wzlNgZorroAntdMessage.warning("字段名不能为空");
      return;
    }else if(this.sqlData.setValue == null){
      this.wzlNgZorroAntdMessage.warning("字段值不能为空");
      return;
    }else if(this.wzlutilService.isBlank(this.sqlData.whereField)){
      this.wzlNgZorroAntdMessage.warning("条件字段不能为空");
      return;
    }else if(this.wzlutilService.isBlank(this.sqlData.whereValue)){
      this.wzlNgZorroAntdMessage.warning("条件字段值不能为空");
      return;
    }
    //请求后台
    this.getUpdateSql();
  }

  /**
   * 请求获取更新语句
   */
  getUpdateSql(){
    this.commonService.doHttpPost(urls.getUpdateSqlUrl,this.sqlData).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let data = rst.data;
          if(data){
            this.wzlNgZorroAntdMessage.info("生成成功");
            //跳出新页面，展示数据
            data = data.replace("\n",strSpecialChar.new_line);
            this.wzlutilService.newTxtPage(data);
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





}
