import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls, websiteUrl} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'web-login',
  templateUrl: './login.main.html',
  styleUrls: ['./login.main.css']
})
export class LoginMainComponent extends AbstractComponent{

  validateForm: FormGroup;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private fb: FormBuilder){
    super(injector);
  }

  ngOnInit(){
    console.log("login.main.component");
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  //表单提交
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){
      this.login();
    }
  }

  /**
   * 登录
   */
  login(){
    let condition = {userName:this.validateForm.get('userName').value,password:this.validateForm.get('password').value};
    this.commonService.doHttpPost(urls.loginUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.routerPushCard();
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
   * 跳到打卡界面
   * @param id
   */
  routerPushCard(){
    //调到打卡界面
    this.router.navigate([routers.pushCardHistoryRouter]);
  }
}
