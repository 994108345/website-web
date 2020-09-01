/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MotherOrderComponent} from './mother.order.component';
import {MotherOrderMainComponent} from './main/mother.order.main.component';
import {MotherOrderAddComponent} from './add/mother.order.add.component';
import {MotherOrderUpdateComponent} from './update/mother.order.update.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: MotherOrderComponent,
    children: [
      {
        path: 'add',
        component: MotherOrderAddComponent,
      },
      {
        path: 'update',
        component: MotherOrderUpdateComponent,
      },
      {
        path: '',
        component: MotherOrderMainComponent,
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
export class MotherOrderRouting { }
