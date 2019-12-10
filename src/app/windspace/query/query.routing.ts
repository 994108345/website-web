/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QueryMainComponent} from './main/query.main.component';
import {QueryComponent} from './query.component';
import {PictureExifMainComponent} from './pictureexif/picture.exif.main.component';
import {PictureChangeMainComponent} from './picturechange/picture.change.main.component';
import {TranslationMainComponent} from './translation/translation.main.component';
import {QueryWeatherComponent} from './weather/query.weather.component';
import {PdfComponent} from './pdf/pdf.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: QueryComponent,
    children: [
      {
        path: 'exif',
        component: PictureExifMainComponent,
      },
      {
        path: 'pdf',
        component: PdfComponent,
      },
      {
        path: 'weather',
        component: QueryWeatherComponent,
      },
      {
        path: 'picchange',
        component: PictureChangeMainComponent,
      },
      {
        path: 'translation',
        component: TranslationMainComponent,
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
