import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey,  routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'send-mail',
  templateUrl: './send.mail.html',
  styleUrls: ['./send.mail.css']
})
export class SendMailComponent extends AbstractComponent{

  /**
   * 上传的url
   */
  uploadUrl = urls.getUrlByUploadUrl;
  //是否显示抽屉
  visible:boolean = false;
  //发送邮件对象
  sendEmail:any = {}
  //quill富文本编辑器的配置
  quillConfig:any;
  //文件大小
  pictureSize:number = 1024*50;
  //发送邮件对象
  fileUpload:any = {}
  //上传文件
  fileList: UploadFile[] = [];
  //文件类型
  pictureType:string = "image/png,image/jpeg";

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("mail-send界面");
    //设置配置
    this.setQuillConfig();
  }

  /**
   * 设置quill的配置
   */
  setQuillConfig(){
    this.quillConfig = [
      // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],               // custom button values
      // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction
      //
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      //
      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      // [{ 'align': [] }],
      // ['clean'],                         // remove formatting button
      // ['link', 'image', 'video']                         // link and image, video
    ]
  }

  /**
   * 开始、上传进度、完成、失败都会调用这个函数。
   * status:uploading done error removed
   * 上传图片
   * @param event
   */
  uploadPicture(event){
    if(event){
      let file = event.file;
      if(file){
        let status = event.file.status;
        if(status === "uploading"){
          //删除老的文件，每次只显示一个文件
          this.fileList = [file];
        }else if(status == "done"){
          let response = file.response;
          if(response){
            let status = response.status;
            if(status === successStatus){
              if(this.wzlutilService.isBlank(this.sendEmail.postMessage)){
                this.sendEmail.postMessage = "";
              }
              let img = "<img class='camera' src=" + response.data + " alt=''>";
              this.sendEmail.postMessage = this.sendEmail.postMessage + img;
              this.wzlNgZorroAntdMessage.info("上传图片成功");
            }else{
              this.wzlNgZorroAntdMessage.error("上传图片发送异常" + response.message)
            }
          }else{
            console.log("没有返回信息" + this.toJsonStr(event));
          }
        }else if(status == "error"){
          this.wzlNgZorroAntdMessage.error("Web error :" + this.toJsonStr(event))
        }else if(status == "removed"){

        }
      }else{
        console.log("file is null ..." + this.toJsonStr(event))
      }
    }
  }

  /**
   * 查询邮政编码
   */
  addEmail(){
    if(this.wzlutilService.isBlank(this.sendEmail.secretKey)){
      this.wzlNgZorroAntdMessage.error("秘钥不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.sendEmail.receiveMail)){
      this.wzlNgZorroAntdMessage.error("接收人邮箱不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.sendEmail.topic)){
      this.wzlNgZorroAntdMessage.error("邮件标题不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.sendEmail.postMessage)){
      this.wzlNgZorroAntdMessage.error("发送内容不能为空");
      return;
    }
    if(this.wzlutilService.isBlank(this.sendEmail.actionTime)){
      this.wzlNgZorroAntdMessage.error("发送时间不能为空");
      return;
    }
    let condition = this.sendEmail;
    this.commonService.doHttpPost(urls.addMailUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success("添加成功");
          //跳转到查看页面
          this.router.navigate(["menu/mail"]);
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
    });
  }

  //自动输入框
  options: string[] = [];
  onChange(value: string): void {
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
  }

  /**
   * 显示抽屉
   */
  drawerShow(bool:boolean){
    this.visible = bool;
  }

}
