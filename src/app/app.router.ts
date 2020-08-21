import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


export const appRoutes: Routes = [
  {
    path: 'menu',
    loadChildren: 'src/app/windspace/menu/webmenu.module#WebMenuModule',
  },
  {
    path: 'mothermenu',
    loadChildren: 'src/app/windspace/mothergood/menu/mother.good.menu.module#MotherGoodMenuModule',
  },
  {
    path: 'manage',
    loadChildren: 'src/app/windspace/manage/manage.module#ManageModule',
  },
  {
    path: 'study',
    loadChildren: 'src/app/windspace/study/study.module#StudyModule',
  },
  {
    path: '**',
    redirectTo:'/menu',
  },
];

@NgModule({
  imports: [
    /*如果你想要看到在导航的生命周期中发生过哪些事件，可以使用路由器默认配置中的 enableTracing 选项。
    它会把每个导航生命周期中的事件输出到浏览器的控制台。 这应该只用于调试。
    你只需要把 enableTracing: true 选项作为第二个参数传给 RouterModule.forRoot() 方法就可以了。*/
    RouterModule.forRoot(
      appRoutes,
      {
      //enableTracing: true,
      preloadingStrategy: PreloadAllModules
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
