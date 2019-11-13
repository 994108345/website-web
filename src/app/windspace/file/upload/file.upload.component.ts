import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'file-upload',
  templateUrl: './file.upload.html',
  styleUrls: ['./file.upload.css']
})
export class FileUploadComponent extends AbstractComponent{

  //文件大小
  pictureSize:number = 1024*50;

  //发送邮件对象
  fileUpload:any = {}
  //上传文件
  fileList: UploadFile[] = [];
  //遮罩
  uploading:boolean = false;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("FileUploadComponent");
  }

  /**
   * 查询邮政编码
   */
  uploadFile(){
    const formData = new FormData();

    if(this.wzlutilService.isBlank(this.fileUpload.secretKey)){
      this.wzlNgZorroAntdMessage.error("秘钥不能为空");
      return;
    }
    if(this.fileList.length < 1){
      this.wzlNgZorroAntdMessage.error("文件不能为空");
      return;
    }
    //拼接表单参数
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    formData.append("secretKey",this.fileUpload.secretKey);
    this.uploading = true;
    this.commonService.doHttpPostForm(urls.upload_File,formData).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success("添加成功");
          //跳转到查看页面
          this.router.navigate(["menu/file"]);
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
      this.uploading = false;
    });
  }


  /**
   * 上传前
   * @param file
   */
  beforeUpload = (file: UploadFile): boolean => {
    console.log("beforeUpload:" + this.toJsonStr(file));
    this.fileList = this.fileList.concat(file);
    if(this.fileList.length > 1){
      this.fileList[0] = this.fileList[1];
      this.fileList.pop();
    }
    return false;
  };

}
