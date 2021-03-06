import {Component, Injector} from '@angular/core';
import {AbstractComponent} from './common/service/abstract.component';
import {baseConfig, urls} from './app.config';
import {successStatus} from './common/service/base/common.config';
import {heartbeatTime} from './windspace/chat/chat.config';
import zh from "@angular/common/locales/zh";
import {registerLocaleData} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractComponent{
  title = 'website-web';

  /**
   * 是否加载中
   */
  isSpinning = false;


  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log("app");
    //查询配置
    this.queryConfig();
    //设置加载
    this.isSpinning = baseConfig.isSpinning;
    //开启定时器
    this.timerHeartbeat();
    //加入时间标准化
    registerLocaleData(zh);
  }

  /*定时器*/
  timer:any;
  /*设置定时器*/
  timerHeartbeat(){
    this.timer = setInterval(()=>{
      //定时刷新属性
      this.isSpinning = baseConfig.isSpinning;
    },100)
  }

  /**
   * 新增用户建议
   */
  queryConfig() {
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
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally(() => {
    });
  }
}
