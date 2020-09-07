import {NgModule} from '@angular/core';
import {WebmenuComponent} from './webmenu.component';
import {WebmenuRouting} from './webmenu.routing';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {WebmenuMainComponent} from './main/webmenu.main.component';
import {WzlngzorroantdmessageService} from '../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {UseradviceModule} from '../../common/basemodel/advice/useradvice.module';
import {WzlutilService} from '../../common/service/wzlutil/wzlutil.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    /*用户建议模块*/
    UseradviceModule,
    //配置模块
    WebmenuRouting,
  ],
  declarations: [
    WebmenuComponent,
    WebmenuMainComponent,
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlngzorroantdmessageService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class WebMenuModule {

}
