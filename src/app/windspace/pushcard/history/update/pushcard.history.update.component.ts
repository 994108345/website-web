import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AbstractComponent} from "../../../../common/service/abstract.component";
import {routers, urls} from "../../../../app.config";
import {successStatus} from "../../../../common/service/base/common.config";

@Component({
  selector: 'pushcard-history-update',
  templateUrl: './pushcard.history.update.html',
  styleUrls: ['./pushcard.history.update.css']
})
export class PushcardHistoryUpdateComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private fb: FormBuilder){
    super(injector);
  }

  id:number;

  validateForm: FormGroup;

  ngOnInit(): void {
    console.log("PushcardRecordUpdateComponent ...");
    //从缓存取值
    this.id = this.wzlCache.getCache("pushCardId");
    //查询
    this.queryPushCard(this.id);
    this.initFormValue();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){
      this.updatePushCard(this.validateForm.value);
    }
  }

  /**
   * 更新信息
   * @param data
   */
  updatePushCard(data){
    let condition = data;
    condition.id = this.id;
    this.commonService.doHttpPost(urls.pushCardHistoryUpdateUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("更新成功");
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
   * 查询打卡信息
   * @param data
   */
  queryPushCard(data){
    let condition = {id:data};
    this.commonService.doHttpPost(urls.pushCardHistoryQueryUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          let obj = rst.listData[0];
          //设置值
          this.setFormValue(obj);
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      console.log(rtc);
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
    });
  }

  setFormValue(data){
    //设置表单
    this.validateForm = this.fb.group({
      statisticTime: [new Date(data.statisticTime),[Validators.required]],
      clockTime: [new Date(data.clockTime),[Validators.required]],
      remark: [data.remark],
    });
  }
  //实例化表单
  initFormValue(){
    //设置表单
    this.validateForm = this.fb.group({
      statisticTime: [null,[Validators.required]],
      clockTime: [null,[Validators.required]],
      remark: [null],
    });
  }

  /**
   * 跳到打开主界面
   */
  routerPushCardMain(){
    this.router.navigate([routers.pushCardHistoryRouter]);
  }

}
