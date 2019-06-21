import {NgModule} from '@angular/core';
import {WebmenuComponent} from './webmenu.component';
import {WebmenuRouting} from './webmenu.routing';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {WebmenuMainComponent} from './main/webmenu.main.component';
import {WzlngzorroantdmessageService} from '../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    WebmenuRouting,
  ],
  declarations: [
    WebmenuComponent,
    WebmenuMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlngzorroantdmessageService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class WebMenuModule {

}
