import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {routers, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';
import {names, surnames} from '../chat.config';
import {Server} from 'ws';
import {WebSocketService} from '../../../common/service/websocket/websocket.service';

@Component({
  selector: 'web-chat',
  templateUrl: './chat.main.html',
  styleUrls: ['./chat.main.css']
})
export class ChatMainComponent extends AbstractComponent{

  //删除弹出窗是否显示
  isDeleteVisible:boolean = false;

  //删除的对象
  deleteObj:any;

  //用户名
  userName:string;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private wsService:WebSocketService){
    super(injector);
  }


  ngOnInit(){
    console.log("聊天窗口界面");

    this.wsService.createObservableSocket("ws://localhost:6001/websocket/1")
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log("流已经结束")
      )

    //生成随机姓名
    this.createUsername();
  }

  //生成随机姓名
  createUsername(){
    let length = this.randomNum(2,4);
    console.log(length);
    //取姓氏随机数
    let lenthA = surnames.length;
    let a = Math.floor(Math.random() * (lenthA-1));
    let surname = surnames[a];
    //取名字随机数
    let  lenthB = names.length;
    let b = Math.floor(Math.random() * (lenthB -1 ));
    let name = names[b];
    let name2 = "";
    if(length > 2){
      let lengthC = this.randomNum(0,lenthB-1);
      let name2 = names[lengthC]
      this.userName = surname + name + name2;
    }else{
      //拼接结果
      this.userName = surname + name;
    }
  }



  //发送信息
  sendMessageToserver(){
    this.wsService.sendMessage("Hello from client");
  }
}
