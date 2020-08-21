import {NgModule} from '@angular/core';
import {MotherGoodMenuComponent} from './mother.good.menu.component';
import {MotherGoodMenuRouting} from './mother.good.menu.routing';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {MotherGoodMenuMainComponent} from './main/mother.good.menu.main.component';
import {WzlCacheService} from '../../../common/service/wzlcache/wzlceche.service';
import {CommonService} from '../../../common/service/base/common.service';
import {WzlutilService} from '../../../common/service/wzlutil/wzlutil.service';
import {UseradviceModule} from '../../../common/basemodel/advice/useradvice.module';
import {WzlngzorroantdmessageService} from '../../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    /*用户建议模块*/
    UseradviceModule,
    //配置模块
    MotherGoodMenuRouting,
  ],
  declarations: [
    MotherGoodMenuComponent,
    MotherGoodMenuMainComponent,
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlngzorroantdmessageService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class MotherGoodMenuModule {

}
