/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QrcodeComponent} from './qrcode.component';
import {QrcodeMainComponent} from './main/qrcode.main.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: QrcodeComponent,
    children: [
      {
        path: '',
        component: QrcodeMainComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(indexRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class QrcodeRouting { }
