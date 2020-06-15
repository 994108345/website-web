import {Component, Injector, Input} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {asllCode, routers, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';
import {messageSource, messageType, names, pickName, surnames, webSocketServerMsgCode} from '../chat.config';
import {Server} from 'ws';
import {WebSocketService} from '../../../common/service/websocket/websocket.service';
import {$} from 'protractor';

@Component({
  selector: 'robot-chat',
  templateUrl: './robot.main.html',
  styleUrls: ['./robot.main.css']
})
export class RobotMainComponent extends AbstractComponent{

  //删除弹出窗是否显示
  isDeleteVisible:boolean = false;
  //sessionId
  sessionId;number = 0;
  //删除的对象
  deleteObj:any;
  //数据
  items:any[] = [];
  //是否加载
  load:boolean;
  //发送信息
  sendMessage:string ="";

  /**
   * 在线人数
   */
  onlineNum:number = 0;

  //用户名
  @Input()  name:string ;
  //聊天数据
  @Input()  data:any[] ;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private wsService:WebSocketService){
    super(injector);
  }

  ngOnInit(){
    console.log("机器人聊天界面");
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
    let chat = {"name":this.name,"message":this.sendMessage,"createDate":new Date(),"messageSource":messageSource.ROBOT_CHAT};
    let item = {"chatMessage":chat,"messageType":messageType.CHAT_MESSAGE};
    //给自己添加消息
    this.data.push(chat);
    this.wsService.sendMessage(item);
    //输入框置空
    this.sendMessage = "";
  }
}
