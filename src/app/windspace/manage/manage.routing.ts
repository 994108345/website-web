/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ManageMainComponent} from './main/manage.main.component';
import {ManageComponent} from './manage.component';
import {WordManageComponent} from './word/word.manage.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      {
        path: '',
        component: ManageMainComponent,
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
export class ManageRouting { }
