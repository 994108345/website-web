import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {asllCode, isLocal, pro_ip, routers, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';
import {
  heartbeatTime,
  messageSource,
  messageType,
  names,
  outHeartbeatTime,
  pickName,
  surnames,
  webSocketServerMsgCode
} from '../chat.config';
import {Server} from 'ws';
import {WebSocketService} from '../../../common/service/websocket/websocket.service';
import {$} from 'protractor';

@Component({
  selector: 'web-chat',
  templateUrl: './chat.main.html',
  styleUrls: ['./chat.main.css']
})
export class ChatMainComponent extends AbstractComponent{

  //删除弹出窗是否显示
  isDeleteVisible:boolean = false;
  //sessionId
  sessionId;number = 0;
  //删除的对象
  deleteObj:any;
  //数据
  items:any[] = [];

  //群聊消息
  groupChatData:any[] = [];
  //机器人聊消息
  robotChatData:any[] = [];

  //用户名
  userName:string;
  //是否加载
  load:boolean;

  /**
   * 心跳计数
   */
  webHeartbeatTag:number = 0;

  /**
   * 心跳计数
   */
  serverHeartbeatTag:number = 0;

  /**
   * 在线人数
   */
  onlineNum:number = 0;

  /**
   * 是否重连
   */
  reconnect:boolean = false;

  /*定时器*/
  timer:any;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private wsService:WebSocketService){
    super(injector);
  }

  ngOnInit(){
    console.log("群聊界面");
    //随机取一个名字
    this.pickName();
    //打开长连接
    this.openSocket();
    //打开定时器检查心跳
    this.timerHeartbeat();
  }

  ngOnDestroy() {
    /*删除定时器*/
    clearInterval(this.timer);
    //删除长连接
    this.closeWebsocket();
  }

  //关闭长连接
  closeWebsocket(){
    let url = "";
    if(isLocal){
      url = "ws://localhost:6001/websocket/";
    }else{
      url ="ws://"+ pro_ip +":6001/websocket/";
    }
    this.wsService.closeWebSocket(url);
  }

  /**
   * 用户手动打开长连接
   */
  openSocket(){
    if(!this.userName || this.userName.trim().length < 1){
      this.wzlNgZorroAntdMessage.error("用户名不能为空");
    }else{
      //获取sessionId,并且开启长连接
      if(!this.sessionId  || this.reconnect){
        this.getSessionId();
        this.reconnect = false;
      }
    }
  }


  /**
   * 打开长连接
   */
  openWebSocket(){
    console.log("打开长连接....")
    let url = "";
    if(isLocal){
      url = "ws://localhost:6001/websocket/";
    }else{
      url ="ws://"+ pro_ip +":6001/websocket/";
    }
    url = url+this.sessionId;
    this.wsService.createObservableSocket(url)
      .subscribe(
        data =>
          this.receiveData(data),
        err =>
          this.wzlNgZorroAntdMessage.error(err),
        () =>
          this.wzlNgZorroAntdMessage.info("长连接已经关闭"),
      )
  }

  /**
   * 接收消息
   */
  receiveData(message:string){
    let rst = this.toJsonObject(message);
    console.log("接收到信息："+message);
    //判断返回结果
    if(rst.status = successStatus){
      let obj = rst.data;
      switch (obj.messageType) {
        //聊天信息
        case messageType.CHAT_MESSAGE:
          let chatMessage = obj.chatMessage;
          this.receiveChatMessage(chatMessage)
          break;
        //在线人数
        case messageType.ON_LINE_NUMER:
          let onlineNums = obj.onlineNums;
          this.receiveOnlineNum(onlineNums)
          break;
        //服务信息
        case messageType.SERVICE_MSG:
          let serverMsgResult = obj.serverMsgResult;
          this.receiveServerMsg(serverMsgResult)
          break;
        //心跳信息
        case messageType.HEARTBEAT:
          let heartbeatResult = obj.heartbeatResult;
          this.heartbeatHandler(heartbeatResult);
          break;
        default:
          this.wzlNgZorroAntdMessage.error("长连接返回信息异常");
          break;
      }
    }else{
      this.wzlNgZorroAntdMessage.error("长连接消息接收失败" + rst.message);
    }
  }

  /**
   * 接收聊天信息
   */
  receiveChatMessage(msgObj:any){
    switch (msgObj.messageSource) {
      case messageSource.ROBOT_CHAT:
        //机器人聊
        this.robotChatData.push(msgObj)
        break;
      case messageSource.GROUP_CHAT:
        //群聊
        this.groupChatData.push(msgObj)
        break;
      default:
        break;
    }
  }

  /**
   * 心跳处理
   */
  heartbeatHandler(message:any){
    //设置心跳标签
    this.serverHeartbeatTag = message.heartbeatTag
  }

  /**
   * 接收在线人数
   */
  receiveOnlineNum(msgObj:any){
    this.onlineNum = msgObj.onlineNum;
  }

  /**
   * 接收服务信息
   */
  receiveServerMsg(msgObj:any){
    if(msgObj.code = webSocketServerMsgCode.CONNECTION_SUCCESS){
      this.wzlNgZorroAntdMessage.info("连接成功");
    }else if (msgObj.code = webSocketServerMsgCode.BREAKE_CONNECTION){
      this.wzlNgZorroAntdMessage.info("断开连接");
    }else {
      this.wzlNgZorroAntdMessage.info("长连接业务信息匹配异常")
      console.log("长连接业务信息匹配异常"+this.toJsonStr(msgObj));
    }
  }



  /**
   * 是我的信息吗
   * @param name
   */
  isMyMessage(name:string){
    if(name == this.userName){
      return true;
    }else{
      return false;
    }
  }

  /**
   * 获取sessionId
   */
  getSessionId(){
    if(urls.getSessionIdUrl){
      let condition = {name:this.userName};
      let url = urls.getSessionIdUrl;
      this.commonService.doHttpPost(url,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            this.sessionId = rst.data;
            //开启长连接
            this.openWebSocket();
          }
        }else{
          this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
        }
      }).catch(rtc =>{
        this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
      })
    }else{
      this.wzlNgZorroAntdMessage.error("路由没有配置，请联系管理员");
    }
  }

  //生成随机姓名
  createUsername(){
    let length = this.randomNum(2,4);
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

  /**
   * 直接挑一个姓名
   */
  pickName(){
    let length = pickName.length;
    let randomNum = this.randomNum(1,length+1);
    this.userName = pickName[randomNum];
  }

  /*设置定时器*/
  timerHeartbeat(){
    this.timer = setInterval(()=>{
      /*定时心跳*/
      this.sendHeartbeat();
    },heartbeatTime)
  }

  /**
   * 心跳处理
   */
  sendHeartbeat(){
    console.log("心跳服务" + "webHeartbeatTag:" + this.webHeartbeatTag + ";serverHeartbeatTag;" + this.serverHeartbeatTag);
    //如果超时时间大于阀值
    if(this.webHeartbeatTag != this.serverHeartbeatTag){
      this.reconnect = true;
      //如果标签不一样，说明已经断开连接，尝试重新连接
      this.openSocket();
      this.serverHeartbeatTag++;
    }else{
      //web心跳标记自增
      this.webHeartbeatTag++;
      //调用心跳
      let heartbeat = {"heartbeatTag":this.webHeartbeatTag};
      let item = {"heartbeatResult":heartbeat,"messageType":messageType.HEARTBEAT};
      this.wsService.sendMessage(item);
    }
  }
}
