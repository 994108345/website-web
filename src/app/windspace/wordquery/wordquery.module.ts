import {NgModule} from '@angular/core';
import { WordqueryComponent} from './wordquery.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import { WordqueryMainComponent} from './main/wordquery.main.component';
import { WordqueryRouting} from './wordquery.routing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UseradviceModule} from '../../common/basemodel/advice/useradvice.module';
import {WzlutilService} from '../../common/service/wzlutil/wzlutil.service';
import {WordModule} from '../../common/basemodel/word/word.module';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    /*表单模块，要使用ngModel，就要使用这个模块*/
    FormsModule,
    /*响应式表单*/
    ReactiveFormsModule,
    /*网络热语模块*/
    WordModule,
    WordqueryRouting,
  ],
  exports:[
  ],
  declarations: [
    WordqueryComponent,WordqueryMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class WordqueryModule {

}
