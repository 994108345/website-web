import {Component, Injector, TemplateRef, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';

@Component({
  selector: 'web-menus',
  templateUrl: './webmenu.main.html',
  styleUrls: ['./webmenu.main.css']
})
export class WebmenuMainComponent extends AbstractComponent{

  //菜单是否内嵌
  isCollapsed:boolean = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("网站菜单主页进来了吗");
  }

  /*内嵌菜单*/
  toggleCollapsed():void{
    this.isCollapsed  = !this.isCollapsed;
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  /**
   * 登出
   */
  loginOut(){}

}
