/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthMenuMainComponent} from './main/auth.menu.main.component';

const menuRoutes: Routes = [
  {
    path: '',
    component: AuthMenuMainComponent,
    children: [
      {
        path: 'pushcard',
        loadChildren: 'src/app/windspace/pushcard/pushcard.module#PushcardModule',
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
export class AuthMenuRouting { }
