import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {asllCode, routers, urls} from '../../../app.config';
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
  //sessionId
  sessionId;number = 0;
  //删除的对象
  deleteObj:any;
  //数据
  items:any[] = [];
  //标题
  data:any[] = [];
  //用户名
  userName:string;
  //是否加载
  load:boolean;
  //发送信息
  sendMessage:string ="";

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private wsService:WebSocketService){
    super(injector);
  }


  ngOnInit(){
    console.log("群聊界面");
    this.wsService.createObservableSocket("ws://localhost:6001/websocket/1")
      .subscribe(
        data =>
          this.receiveData(data),
        err =>
          console.log(err),
        () =>
          console.log("长连接已经结束")
      )

    //生成随机姓名
    this.createUsername();
    //获取sessionId
    this.getSessionId();
  }

  /**
   * 接收消息
   */
  receiveData(message:string){
    let rst = this.toJsonObject(message);
    console.log("接收到信息："+message);
    //判断返回结果
    if(rst.status = successStatus){
      let obj = JSON.parse(rst.data);
      this.data.push(obj);
    }else{
      this.wzlNgZorroAntdMessage.error("长连接消息接收失败" + rst.message);
    }
  }

  sayHello(){
    if(urls.sayHelloUrl){
      let condition = {};
      this.commonService.doHttpPost(urls.sayHelloUrl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            console.log(rst.data);
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


  /**
   * 键盘回车事件
   * @param event
   */
  pressSendMessage(event){
    console.log(event);
    if(event.which == asllCode.enter){
      this.sendMessageToserver();
    }
  }

  //发送信息
  sendMessageToserver(){
    if(this.sendMessage.trim().length < 1){
      this.wzlNgZorroAntdMessage.error("输入信息不能为空");
    }else{
      let item = {"name":this.userName,"message":this.sendMessage,"createDate":new Date()};
      this.wsService.sendMessage(item);
    }
  }
}
