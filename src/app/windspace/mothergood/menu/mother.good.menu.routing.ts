/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MotherGoodMenuMainComponent} from './main/mother.good.menu.main.component';

const menuRoutes: Routes = [
  {
    path: '',
    component: MotherGoodMenuMainComponent,
    children: [
      {
        path: 'mothergood',
        loadChildren: 'src/app/windspace/mothergood/good/mother.good.module#MotherGoodModule',
      },
      {
        path: 'motherorder',
        loadChildren: 'src/app/windspace/mothergood/order/mother.order.module#MotherOrderModule',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MotherGoodMenuRouting { }
