import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../common/service/base/common.service';
import {WzlCacheService} from '../common/service/wzlcache/wzlceche.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {IndexModule} from './index/index.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IndexModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    /*功能模块*/
  ],
  declarations: [
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class WebSiteModule {

}
