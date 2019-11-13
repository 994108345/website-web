/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FileMainComponent} from './main/file.main.component';
import {FileUploadComponent} from './upload/file.upload.component';
import {FileComponent} from './file.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: FileComponent,
    children: [
      {
        path: 'upload',
        component: FileUploadComponent,
      },
      {
        path: '',
        component: FileMainComponent,
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
export class FileRouting { }
