/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StudyComponent} from './study.component';
import {StudyMainComponent} from './main/study.main.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: StudyComponent,
    children: [
      {
        path: '',
        component: StudyMainComponent,
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
export class StudyRouting { }
