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
import {AddTextComponent} from './addtext/add.text.component';
import {PictureExifMainComponent} from './pictureexif/picture.exif.main.component';
import {PictureChangeMainComponent} from './picturechange/picture.change.main.component';
import {JoinPicComponent} from './joinpic/join.pic.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: PicComponent,
    children: [
      {
        path: 'joinpic',
        component: JoinPicComponent,
      },
      {
        path: 'addtext',
        component: AddTextComponent,
      },
      {
        path: 'exif',
        component: PictureExifMainComponent,
      },
      {
        path: 'picchange',
        component: PictureChangeMainComponent,
      },
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
