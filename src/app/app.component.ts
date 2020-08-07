import {Component, Injector} from '@angular/core';
import {AbstractComponent} from './common/service/abstract.component';
import {baseConfig, urls} from './app.config';
import {successStatus} from './common/service/base/common.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractComponent{
  title = 'website-web';


  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log("app");
    //查询配置
    this.queryConfig();
  }

  /**
   * 新增用户建议
   */
  queryConfig() {
    let runSuccess = false;
    let condition = {};
    this.commonService.doHttpPost(urls.queryOutConfigUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          //设置参数
          baseConfig.isLocal = rst.data.local;
          baseConfig.websocketServer = rst.data.websocketServer;
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
      runSuccess = true;
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally(() => {
    });
  }
}
