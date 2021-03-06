import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {en_US, NgZorroAntdModule, NZ_I18N, NzPopoverModule, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WordComponent} from './word.component';
import {CommonService} from '../../service/base/common.service';
import {WzlCacheService} from '../../service/wzlcache/wzlceche.service';
import {CommonModule} from '@angular/common';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  declarations: [
    WordComponent
  ],
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    /*表单模块，要使用ngModel，就要使用这个模块*/
    FormsModule,
    /*响应式表单*/
    ReactiveFormsModule,
    /*气泡卡片*/
    NzPopoverModule,
    /*复制到剪贴板*/
    ClipboardModule,
  ],
  //对外开放的组件
  exports:[
  //用户建议模块
  WordComponent,
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [WordComponent]
})
export class WordModule { }
