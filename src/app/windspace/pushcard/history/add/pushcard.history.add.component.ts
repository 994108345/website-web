import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AbstractComponent} from "../../../../common/service/abstract.component";
import {routers, urls} from "../../../../app.config";
import {successStatus} from "../../../../common/service/base/common.config";

@Component({
  selector: 'pushcard-history-add',
  templateUrl: './pushcard.history.add.html',
  styleUrls: ['./pushcard.history.add.css']
})
export class PushcardHistoryAddComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private fb: FormBuilder){
    super(injector);
  }

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){
      this.addPushCard(this.validateForm.value);
    }
  }


  ngOnInit(): void {
    console.log("pushCardHistoryAdd ...");
    this.validateForm = this.fb.group({
      statisticTime: [null,[Validators.required]],
      clockTime: [null,[Validators.required]],
      remark: [null],
    });
  }

  addPushCard(data){
    let condition = data;
    this.commonService.doHttpPost(urls.pushCardHistoryAddUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("插入成功");
          this.routerPushCardMain();
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
   * 跳到打开主界面
   */
  routerPushCardMain(){
    this.router.navigate([routers.pushCardHistoryRouter]);
  }

}
