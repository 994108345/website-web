import {NgModule} from '@angular/core';
import { CoderutilComponent} from './coderutil.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import { CoderutilMainComponent} from './main/coderutil.main.component';
import { CoderutilRouting} from './coderutil.routing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UseradviceModule} from '../../common/basemodel/advice/useradvice.module';
import {WzlutilService} from '../../common/service/wzlutil/wzlutil.service';
import {CoderutilSqlComponent} from './sql/coderutil.sql.component';
import {StrhandlerMainComponent} from './strhandler/strhandler.main.component';
import {JavaAnnotationTranslationComponent} from './strhandler/javaannotationtranslation/java.annotation.translation.component';
import {LinetranferblankComponent} from './strhandler/linetranferblank/linetranferblank.component';

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
    CoderutilRouting,
  ],
  exports:[
  ],
  declarations: [
    CoderutilComponent,CoderutilMainComponent,CoderutilSqlComponent,StrhandlerMainComponent,JavaAnnotationTranslationComponent,LinetranferblankComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CoderutilModule {

}
