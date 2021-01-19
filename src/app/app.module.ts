import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, en_US, zh_CN} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {CommonService} from './common/service/base/common.service';
import {WzlCacheService} from './common/service/wzlcache/wzlceche.service';
import {WzlngzorroantdmessageService} from './common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {WzlutilService} from './common/service/wzlutil/wzlutil.service';
import {LoginInterceptor} from "./common/interceptor/login.Interceptor";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /*动画支持模块*/
    BrowserAnimationsModule,
    /*浏览器模块*/
    BrowserModule,
    /*http请求模块*/
    HttpClientModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    /*自己建的路由模块*/
    AppRoutingModule,
    FormsModule,
  ],
  providers: [CommonService, WzlCacheService, WzlngzorroantdmessageService, WzlutilService,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
