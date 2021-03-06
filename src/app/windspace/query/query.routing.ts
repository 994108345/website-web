/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QueryMainComponent} from './main/query.main.component';
import {QueryComponent} from './query.component';
import {TranslationMainComponent} from './translation/translation.main.component';
import {QueryWeatherComponent} from './weather/query.weather.component';
import {PdfComponent} from './pdf/pdf.component';
import {LocationComponent} from './location/location.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: QueryComponent,
    children: [
      {
        path: 'pdf',
        component: PdfComponent,
      },
      {
        path: 'weather',
        component: QueryWeatherComponent,
      },
      {
        path: 'translation',
        component: TranslationMainComponent,
      },
      {
        path: 'location',
        component: LocationComponent,
      },
      {
        path: '',
        component: QueryMainComponent,
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
export class QueryRouting { }
