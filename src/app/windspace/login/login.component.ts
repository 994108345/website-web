import {Component, Injector, OnInit} from '@angular/core';
import {AbstractComponent} from '../../common/service/abstract.component';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class LoginComponent extends AbstractComponent implements  OnInit{
  constructor(injector:Injector){
    super(injector);
  }
  ngOnInit() {
    console.log("Login.component");
  }
}
