/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WebmenuMainComponent} from './main/webmenu.main.component';

const menuRoutes: Routes = [
  {
    path: '',
    component: WebmenuMainComponent,
    children: [
      {
        path: 'index',
        loadChildren: 'src/app/windspace/index/index.module#IndexModule',
      },
      {
        path: 'chat',
        loadChildren: 'src/app/windspace/chat/chat.module#ChatModule',
      },
      {
        path: 'query',
        loadChildren: 'src/app/windspace/query/query.module#QueryModule',
      },
      {
        path: 'mail',
        loadChildren: 'src/app/windspace/mail/mail.module#MailModule',
      },
      {
        path: 'file',
        loadChildren: 'src/app/windspace/file/file.module#FileModule',
      },
      {
        path: 'wordquery',
        loadChildren: 'src/app/windspace/wordquery/wordquery.module#WordqueryModule',
      },
      {
        path: 'qrcode',
        loadChildren: 'src/app/windspace/qrcode/qrcode.module#QrcodeModule',
      },
      {
        path: 'pic',
        loadChildren: 'src/app/windspace/pic/pic.module#PicModule',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WebmenuRouting { }
