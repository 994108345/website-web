import {Component, Injector, Input, Output} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {asllCode, isLocal, pro_ip, routers, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';
import {messageSource, messageType, names, pickName, surnames, webSocketServerMsgCode} from '../chat.config';
import {Server} from 'ws';
import {WebSocketService} from '../../../common/service/websocket/websocket.service';
import {$} from 'protractor';

@Component({
  selector: 'group-chat',
  templateUrl: './group.main.html',
  styleUrls: ['./group.main.css']
})
export class GroupMainComponent extends AbstractComponent{

  //sessionId
  sessionId;number = 0;
  //发送信息
  sendMessage:string ="";

  /**
   * 在线人数
   */
  onlineNum:number = 0;

  @Input() private name:string ;
  //聊天数据
  @Input() private data:any[] ;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private wsService:WebSocketService){
    super(injector);
  }

  ngOnInit(){
    console.log("群聊界面");
  }

  /**
   * 是我的信息吗
   * @param name
   */
  isMyMessage(name:string){
    if(name == this.name){
      return true;
    }else{
      return false;
    }
  }

  /**
   * 键盘回车事件
   * @param event
   */
  pressSendMessage(event){
    if(event.which == asllCode.enter){
      this.sendMessageToserver();
    }
  }

  //发送信息
  sendMessageToserver(){
    if(this.sendMessage.trim().length < 1){
      this.wzlNgZorroAntdMessage.error("输入信息不能为空");
      return;
    }
    let chat = {"name":this.name,"message":this.sendMessage,"createDate":new Date(),"messageSource":messageSource.GROUP_CHAT};
    let item = {"chatMessage":chat,"messageType":messageType.CHAT_MESSAGE};
    this.wsService.sendMessage(item);
    //输入框置空
    this.sendMessage = "";
  }
}
