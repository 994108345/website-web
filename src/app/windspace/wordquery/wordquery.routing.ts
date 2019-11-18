/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WordqueryMainComponent} from './main/wordquery.main.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: WordqueryMainComponent,
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
export class WordqueryRouting { }
