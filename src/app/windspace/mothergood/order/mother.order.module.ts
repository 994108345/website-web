import {NgModule} from '@angular/core';
import { MotherOrderComponent} from './mother.order.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import { MotherOrderRouting} from './mother.order.routing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {UseradviceModule} from '../../../common/basemodel/advice/useradvice.module';
import {LoginModule} from '../../../common/basemodel/login/login.module';
import {WordModule} from '../../../common/basemodel/word/word.module';
import {CommonService} from '../../../common/service/base/common.service';
import {WzlCacheService} from '../../../common/service/wzlcache/wzlceche.service';
import {WzlutilService} from '../../../common/service/wzlutil/wzlutil.service';
import {WzlngzorroantdmessageService} from '../../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {MotherOrderMainComponent} from './main/mother.order.main.component';
import {MotherOrderAddComponent} from './add/mother.order.add.component';
import {MotherGoodModule} from '../good/mother.good.module';
import {MotherGoodMainComponent} from '../good/main/mother.good.main.component';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    /*表单模块，要使用ngModel，就要使用这个模块*/
    FormsModule,
    /*响应式表单*/
    ReactiveFormsModule,
    //用户建议模块
    UseradviceModule,
    //随机话模块
    WordModule,
    /*导入quil富文本编辑器模块*/
    QuillModule,
    /*登陆测试模块*/
    LoginModule,
    MotherOrderRouting,
  ],
  exports:[
  ],
  declarations: [
    MotherOrderComponent,MotherOrderMainComponent,MotherOrderAddComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlutilService,WzlngzorroantdmessageService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class MotherOrderModule {

}
