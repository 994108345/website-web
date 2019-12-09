/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {buildPath} from 'selenium-webdriver/http';
import {PicComponent} from './pic.component';
import {PicQueryComponent} from './query/pic.query.component';
import {PicDownComponent} from './down/pic.down.component';
import {PicQueueComponent} from './queue/pic.queue.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: PicComponent,
    children: [
      {
        path: 'download',
        component: PicDownComponent,
      },
      {
        path: 'queue',
        component: PicQueueComponent,
      },
      {
        path: 'query',
        component: PicQueryComponent,
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
export class PicRouting { }
