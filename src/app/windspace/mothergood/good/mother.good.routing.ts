/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MotherGoodComponent} from './mother.good.component';
import {MotherGoodMainComponent} from './main/mother.good.main.component';
import {MotherGoodAddComponent} from './add/mother.good.add.component';
import {MotherGoodUpdateComponent} from './update/mother.good.update.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: MotherGoodComponent,
    children: [
      {
        path: 'add',
        component: MotherGoodAddComponent,
      },
      {
        path: 'update',
        component: MotherGoodUpdateComponent,
      },
      {
        path: '',
        component: MotherGoodMainComponent,
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
export class MotherGoodRouting { }
