import {NgModule} from '@angular/core';
import { QrcodeComponent} from './qrcode.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import { QrcodeRouting} from './qrcode.routing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UseradviceModule} from '../../common/basemodel/advice/useradvice.module';
import {WzlutilService} from '../../common/service/wzlutil/wzlutil.service';
import {WordModule} from '../../common/basemodel/word/word.module';
import {QuillModule} from 'ngx-quill';
import {QrcodeMainComponent} from './main/qrcode.main.component';
import {QrcodeTextComponent} from "./text/qrcode.text.component";
import {QrcodeAllComponent} from "./all/qrcode.all.component";

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
    QrcodeRouting,
  ],
  exports:[
  ],
  declarations: [
    QrcodeMainComponent,QrcodeComponent,QrcodeTextComponent,QrcodeAllComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class QrcodeModule {

}
