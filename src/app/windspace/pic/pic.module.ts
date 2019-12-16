import {NgModule} from '@angular/core';
import { PicComponent} from './pic.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import { PicRouting} from './pic.routing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UseradviceModule} from '../../common/basemodel/advice/useradvice.module';
import {WzlutilService} from '../../common/service/wzlutil/wzlutil.service';
import {PicDownComponent} from './down/pic.down.component';
import {PicQueryComponent} from './query/pic.query.component';
import {PicQueueComponent} from './queue/pic.queue.component';
import {FlowerpicQueryComponent} from './flowerpic/flowerpic.query.component';
import {BdpicQueryComponent} from './bdpic/bdpic.query.component';

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
    PicRouting,
  ],
  exports:[
  ],
  declarations: [
    PicComponent,PicDownComponent,PicQueryComponent,PicQueueComponent,FlowerpicQueryComponent,BdpicQueryComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class PicModule {

}
