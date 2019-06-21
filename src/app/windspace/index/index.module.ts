import {NgModule} from '@angular/core';
import {IndexComponent} from './index.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {IndexMainComponent} from './main/index.main.component';
import {IndexRouting} from './index.routing';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    IndexRouting,
  ],
  declarations: [
    IndexComponent,IndexMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class IndexModule {

}
