export class ChatMessageResult {
  /**
   * 姓名
   */
  name:string;

  /**
   * 消息内容
   */
  message:string;

  /**
   * 消息创建的时间
   */
  createDate:Date;

  /**
   * 接收者id
   */
  receiveId:string;

  /**
   * 消息来源
   * {@link messageSource }
   */
  messageSource:number;

  /**
   * 消息类型
   * {@link MessageType }
   */
  messageType:number;

}
