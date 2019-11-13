import {NgModule} from '@angular/core';
import { FileComponent} from './file.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import { FileMainComponent} from './main/file.main.component';
import { FileRouting} from './file.routing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UseradviceModule} from '../../common/basemodel/advice/useradvice.module';
import {WzlutilService} from '../../common/service/wzlutil/wzlutil.service';
import {FileUploadComponent} from './upload/file.upload.component';

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
    FileRouting,
  ],
  exports:[
  ],
  declarations: [
    FileMainComponent,FileComponent,FileUploadComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlCacheService,WzlutilService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class FileModule {

}
