/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CoderutilMainComponent} from './main/coderutil.main.component';
import {CoderutilComponent} from './coderutil.component';
import {StudyMainComponent} from '../study/main/study.main.component';
import {CoderutilSqlComponent} from './sql/coderutil.sql.component';
import {StrhandlerMainComponent} from './strhandler/strhandler.main.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: CoderutilComponent,
    children: [
      {
        path: 'sql',
        component: CoderutilSqlComponent,
      },
      {
        path: 'strhandler',
        component: StrhandlerMainComponent,
      },
      {
        path: '',
        component: CoderutilMainComponent,
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
export class CoderutilRouting { }
