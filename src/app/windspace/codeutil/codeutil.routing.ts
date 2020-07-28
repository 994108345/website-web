/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CodeutilMainComponent} from './main/codeutil.main.component';
import {CodeutilComponent} from './codeutil.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: CodeutilComponent,
    children: [

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
export class CodeutilRouting { }
