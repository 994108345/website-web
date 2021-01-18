import {NgModule} from '@angular/core';
import {AuthMenuComponent} from './auth.menu.component';
import {AuthMenuRouting} from './auth.menu.routing';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {UseradviceModule} from "../../common/basemodel/advice/useradvice.module";
import {CommonService} from "../../common/service/base/common.service";
import {WzlutilService} from "../../common/service/wzlutil/wzlutil.service";
import {WzlngzorroantdmessageService} from "../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service";
import {WzlCacheService} from "../../common/service/wzlcache/wzlceche.service";
import {AuthMenuMainComponent} from "./main/auth.menu.main.component";

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    /*用户建议模块*/
    UseradviceModule,
    //配置模块
    AuthMenuRouting,
  ],
  declarations: [
    AuthMenuComponent,AuthMenuMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlngzorroantdmessageService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class AuthMenuModule {

}
