/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PushcardComponent} from "./pushcard.component";
import {PushcardHistoryMainComponent} from "./history/pushcard.history.main.component";
import {PushcardHistoryAddComponent} from "./history/add/pushcard.history.add.component";
import {PushcardHistoryUpdateComponent} from "./history/update/pushcard.history.update.component";
import {PushcardRecordAddComponent} from "./record/add/pushcard.record.add.component";
import {PushcardRecordUpdateComponent} from "./record/update/pushcard.record.update.component";
import {PushcardRecordMainComponent} from "./record/pushcard.record.main.component";

const indexRoutes: Routes = [
  {
    path: '',
    component: PushcardComponent,
    children: [
      {
        path: 'history',
        component: PushcardHistoryMainComponent,
      },
      {
        path: 'history-add',
        component: PushcardHistoryAddComponent,
      },
      {
        path: 'history-update',
        component: PushcardHistoryUpdateComponent,
      },
      {
        path: 'record',
        component: PushcardRecordMainComponent,
      },
      {
        path: 'record-add',
        component: PushcardRecordAddComponent,
      },
      {
        path: 'record-update',
        component: PushcardRecordUpdateComponent,
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
export class PushcardRouting { }
