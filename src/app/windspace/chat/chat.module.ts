import {NgModule} from '@angular/core';
import {NgZorroAntdModule, NZ_I18N, NzNotificationService, NzTableModule, zh_CN} from 'ng-zorro-antd';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import zh from '@angular/common/locales/zh';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {WzlngzorroantdmessageService} from '../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {ChatComponent} from './chat.component';
import {ChatMainComponent} from './main/chat.main.component';
import {ChatRouter} from './chat.router';
import {WebSocketService} from '../../common/service/websocket/websocket.service';
import {OptimisticMainComponent} from './optimistic/optimistic.main.component';
registerLocaleData(zh);
@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    /*表单模块，要使用ngModel，就要使用这个模块*/
    FormsModule,
    /*响应式表单*/
    ReactiveFormsModule,
    ChatRouter
  ],
  declarations: [
    ChatComponent,ChatMainComponent,OptimisticMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WebSocketService,{ provide: NZ_I18N, useValue: zh_CN },WzlngzorroantdmessageService],
})
export class ChatModule {

}
