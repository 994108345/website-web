/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FileshareMainComponent} from './main/fileshare.main.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: FileshareMainComponent,
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
export class FileshareRouting { }
