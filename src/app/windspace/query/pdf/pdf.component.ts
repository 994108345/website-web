import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {forEach} from '@angular/router/src/utils/collection';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';

// 一定要声明AMap，要不然报错找不到AMap
declare var  AMap: any;
@Component({
  selector: 'pdf-query',
  templateUrl: './pdf.html',
  styleUrls: ['./pdf.main.css']
})
export class PdfComponent extends AbstractComponent{

  //上传路由
  uploadUrl:string = urls.pdfToTextUrl;
  //文件大小
  pictureSize:number = 1024*50;
  //pictureexif-exif对象
  pictureExif:any = {};
  //地址nz-alert
  address:string = null;
  //上传文件大小
  fileList:any[] = [];

  //结果下载url
  resultPicUrl:string = "";

  //是否遮罩
  isSpinning:boolean = false;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("pictureexif-exif组件");
  }

  /**
   * 开始、上传进度、完成、失败都会调用这个函数。
   * status:uploading done error removed
   * 上传图片
   * @param event
   */
  uploadPicture(event){
    //遮罩
    this.isSpinning = true;
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
              this.resultPicUrl = response.data;
            }else{
              this.wzlNgZorroAntdMessage.error("上传图片发送异常" + response.message)
            }
          }else{
            console.log("没有返回信息" + this.toJsonStr(event));
          }
          //遮罩
          this.isSpinning = false;
        }else if(status == "error"){
          this.wzlNgZorroAntdMessage.error("Web error :" + this.toJsonStr(event))
          //遮罩
          this.isSpinning = false;
        }else if(status == "removed"){

        }
      }else{
        console.log("file is null ..." + this.toJsonStr(event))
      }
    }
  }

}
