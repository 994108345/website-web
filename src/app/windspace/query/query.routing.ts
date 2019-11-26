/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QueryMainComponent} from './main/query.main.component';
import {buildPath} from 'selenium-webdriver/http';
import {QueryComponent} from './query.component';
import {BdpicComponent} from './bdpic/bdpic.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: QueryComponent,
    children: [
      {
        path: 'querypic',
        component: BdpicComponent,
      },
      {
        path: '',
        component: QueryMainComponent,
      }
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
export class QueryRouting { }
