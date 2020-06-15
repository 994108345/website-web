import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  ws: WebSocket;
  constructor() { }
  // 返回一个可观测的流，包括服务器返回的消息
  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        //什么时候发生下一个元素
        this.ws.onmessage = (event) => observer.next(event.data);
        //什么时候抛一个异常
        this.ws.onerror = (event) => observer.error(event);
        //什么时候发出流结束的信号
        this.ws.onclose = (event) => observer.complete();
      })
  }

  // 关闭长连接
  closeWebSocket(url: string){
    this.ws = new WebSocket(url);
    this.ws.close();
  }

  // 向服务器端发送消息
  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
