/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {ChatMainComponent} from './main/chat.main.component';

const brandRoutes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {path: '', component: ChatMainComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(brandRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRouter { }
