/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MailMainComponent} from './main/mail.main.component';
import {SendMailComponent} from './send/send.mail.component';
import {MailComponent} from './mail.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: MailComponent,
    children: [
      {
        path: 'send',
        component: SendMailComponent,
      },
      {
        path: '',
        component: MailMainComponent,
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
export class MailRouting { }
