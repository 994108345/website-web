import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';
import {asllCode, urls} from '../../../app.config';
import {successStatus} from '../../service/base/common.config';

@Component({
  selector: 'login-web',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent extends AbstractComponent{

  userInfo:any = {};

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit() {
    console.info("用户建议模块");
  }

  /**
   * 新增用户建议
   */
  login() {
    if(this.wzlutilService.isBlank(this.userInfo.userName)){
      this.wzlNgZorroAntdMessage.error("用户名不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.userInfo.password)){
      this.wzlNgZorroAntdMessage.error("密码不能为空");
      return;
    }
    let condition = this.userInfo;
    this.commonService.doHttpPost(urls.loginUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.info("登陆成功");
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally(() => {
    });
  }

  /**
   * 其他操作
   */
  otherHandler(){
    let condition = {};
    this.commonService.doHttpPost(urls.otherHandlerUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.info("请求成功");
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
