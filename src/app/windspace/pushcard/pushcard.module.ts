import {NgModule} from '@angular/core';
import { PushcardComponent} from './pushcard.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UseradviceModule} from '../../common/basemodel/advice/useradvice.module';
import {WzlutilService} from '../../common/service/wzlutil/wzlutil.service';
import {WordModule} from '../../common/basemodel/word/word.module';
import {QuillModule} from 'ngx-quill';
import {PushcardRouting} from "./pushcard.routing";
import {PushcardHistoryMainComponent} from "./history/pushcard.history.main.component";
import {PushcardRecordMainComponent} from "./record/pushcard.record.main.component";
import {PushcardHistoryAddComponent} from "./history/add/pushcard.history.add.component";
import {PushcardHistoryUpdateComponent} from "./history/update/pushcard.history.update.component";
import {PushcardRecordAddComponent} from "./record/add/pushcard.record.add.component";
import {PushcardRecordUpdateComponent} from "./record/update/pushcard.record.update.component";
import {PushcardRecordListComponent} from "./record/list/pushcard.record.list.component";
import {PushcardRecordCalendarComponent} from "./record/calendar/pushcard.record.calendar.component";
import {PushcardRecordCaculateComponent} from "./record/caculate/pushcard.record.caculate.component";

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
    //随机话模块
    WordModule,
    /*导入quil富文本编辑器模块*/
    QuillModule,
    PushcardRouting,
  ],
  exports:[
  ],
  declarations: [
    PushcardComponent,
    PushcardHistoryMainComponent,PushcardHistoryAddComponent,PushcardHistoryUpdateComponent,
    PushcardRecordMainComponent,PushcardRecordAddComponent,PushcardRecordUpdateComponent,
    PushcardRecordListComponent,PushcardRecordCalendarComponent,PushcardRecordCaculateComponent

  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class PushcardModule {

}
