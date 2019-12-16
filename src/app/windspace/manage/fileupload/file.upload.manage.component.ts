import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, isLocal, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'file-upload-manage',
  templateUrl: './file.upload.manage.html',
  styleUrls: ['./file.upload.manage.css']
})
export class FileUploadManageComponent extends AbstractComponent{

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
    console.log("FileUploadManageComponent");
  }

  /**
   * 上传文件
   */
  uploadFile(){
    const formData = new FormData();

    if(this.wzlutilService.isBlank(this.fileUpload.picType)){
      this.wzlNgZorroAntdMessage.error("图片类型不能为空");
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
    formData.append("picType",this.fileUpload.picType);
    this.uploading = true;
    this.commonService.doHttpPostForm(urls.upload_pic,formData).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success("添加成功");
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
    return false;
  };

  /**
   * 选择框单选
   */
  selectChange(){
    //清空上传文件
    this.fileList = [];
  }

}
