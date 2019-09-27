/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QueryMainComponent} from './main/query.main.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: QueryMainComponent,
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
export class QueryRouting { }
