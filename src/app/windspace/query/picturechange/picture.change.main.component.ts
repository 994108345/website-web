import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {UploadFile} from 'ng-zorro-antd';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter} from 'rxjs/operators';

// 一定要声明AMap，要不然报错找不到AMap
declare var  AMap: any;
@Component({
  selector: 'picture-change',
  templateUrl: './picture.change.main.html',
  styleUrls: ['./picture.change.main.css']
})
export class PictureChangeMainComponent extends AbstractComponent{
  //上传文件集合
  uploadedFiles: any[] = [];
  //上传路由
  uploadUrl:string = urls.uploadFile + '?type=pictureChange';
  //是否启用上传
  isUpload:boolean = false;
  //要上传的文件
  uploadingFiles:File[] = [];
  //上传文件容量超出提示文本
  invalidFileSizeMessageDetail:string = 'maximum upload size is 50M';
  //文件大小
  pictureSize:number = 1024*50;
  //文件类型
  pictureType:string = 'image/png,image/jpeg';
  //pictureexif-change对象
  pictureChange:any = {};
  //上传文件
  fileList: UploadFile[] = [];

  //选择框的默认文字
  nzPlaceHolder:string = '请选择';

  //结果图片处理url
  resultPicUrl:string;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private http: HttpClient){
    super(injector);
  }
//是否上传中
  @Output() uploading = new EventEmitter<boolean>();

  ngOnInit(){
    console.log('pictureexif-exif组件');
  }

  beforeUpload = (file: UploadFile): boolean => {
    console.log("beforeUpload:" + this.toJsonStr(file));
    this.fileList = this.fileList.concat(file);
    if(this.fileList.length > 1){
      this.fileList[0] = this.fileList[1];
      this.fileList.pop();
    }
    return false;
  };

  handleUpload(): void {
    //遮罩
    this.uploading.emit(true);
    const formData = new FormData();
    //参数校验
    if(this.wzlutilService.isBlank(this.pictureChange.changeType)){
      this.wzlNgZorroAntdMessage.warning('图片改变类型不能为空......');
      return;
    }
    if(this.pictureChange.changeType === '1'){
      if(this.wzlutilService.isBlank(this.pictureChange.rate)){
        this.wzlNgZorroAntdMessage.warning('图片比例不能为空');
        return;
      }
      if(this.pictureChange.rate === 0){
        this.wzlNgZorroAntdMessage.warning("图片比例不能为0");
        return;
      }
    }
    if(this.pictureChange.changeType === '2'){
      if(this.wzlutilService.isBlank(this.pictureChange.height)){
        this.wzlNgZorroAntdMessage.warning('图片高不能为空');
        return;
      }
      if(this.wzlutilService.isBlank(this.pictureChange.width)){
        this.wzlNgZorroAntdMessage.warning('图片宽不能为空');
        return;
      }
    }
    if(this.pictureChange.type === ''){
      this.pictureChange.type = null;
    }
    //拼接表单参数
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    if(this.wzlutilService.isNotBlank(this.pictureChange.width)){
      formData.append("width",this.pictureChange.width);
    }
    if(this.wzlutilService.isNotBlank(this.pictureChange.height)){
      formData.append("height",this.pictureChange.height);
    }
    if(this.wzlutilService.isNotBlank(this.pictureChange.rate)){
      formData.append("rate",this.pictureChange.rate);
    }
    if(this.wzlutilService.isNotBlank(this.pictureChange.changeType)){
      formData.append("changeType",this.pictureChange.changeType);
    }
    if(this.wzlutilService.isNotBlank(this.pictureChange.type)){
      formData.append("type",this.pictureChange.type);
    }
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', urls.changePictureUrl, formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        res  => {
          //遮罩
          this.uploading.emit(false);
          console.log("请求参数"+this.toJsonStr(res))
          this.wzlNgZorroAntdMessage.success('upload successfully.');
        },
        () => {
          //遮罩
          this.uploading.emit(false);
          this.wzlNgZorroAntdMessage.error('upload failed.');
        }
      );
  }

  /**
   * 开始、上传进度、完成、失败都会调用这个函数。
   * status:uploading done error removed
   * 上传图片
   * @param event
   */
  uploadPicture(event){
    console.log("event:"+this.toJsonStr(event));
    if(event){
      let file = event.file;
      if(file){
        let status = event.file.status;
        if(status === 'uploading'){
          //往父组件传递参数
          this.uploading.emit(true);
          //删除老的文件，每次只显示一个文件
          this.fileList = [file];
        }else if(status == 'done'){
          let response = file.response;
          if(response){
            let status = response.status;
            if(status === successStatus){
              this.pictureChange.pictureKey = response.data;
              this.wzlNgZorroAntdMessage.info('上传图片成功');
            }else{
              this.wzlNgZorroAntdMessage.error('上传图片发送异常' + response.message);
            }
          }else{
            console.log('没有返回信息' + this.toJsonStr(event));
          }
          //往父组件传递参数
          this.uploading.emit(false);
        }else if(status == 'error'){
          //往父组件传递参数
          this.uploading.emit(false);
          this.wzlNgZorroAntdMessage.error('Web error :' + this.toJsonStr(event));
        }else if(status == 'removed'){

        }
      }else{
        console.log('file is null ...' + this.toJsonStr(event));
      }
    }
  }

  /**
   * 下拉框改变
   * @param $event
   */
  selectChange(event){
    console.log(this.toJsonStr(event));
  }

  /**
   * 改变图片
   */
  changePicture(){
    //遮罩
    this.uploading.emit(true);
    const formData = new FormData();
    //参数校验
    if(this.wzlutilService.isBlank(this.pictureChange.changeType)){
      this.wzlNgZorroAntdMessage.warning('图片改变类型不能为空......');
      //遮罩
      this.uploading.emit(false);
      return;
    }
    if(this.pictureChange.changeType === '1'){
      if(this.wzlutilService.isBlank(this.pictureChange.rate)){
        this.wzlNgZorroAntdMessage.warning('图片比例不能为空');
        //遮罩
        this.uploading.emit(false);
        return;
      }
    }
    if(this.pictureChange.changeType === '2'){
      if(this.wzlutilService.isBlank(this.pictureChange.height)){
        this.wzlNgZorroAntdMessage.warning('图片高不能为空');
        //遮罩
        this.uploading.emit(false);
        return;
      }
      if(this.wzlutilService.isBlank(this.pictureChange.width)){
        this.wzlNgZorroAntdMessage.warning('图片宽不能为空');
        //遮罩
        this.uploading.emit(false);
        return;
      }
    }
    if(this.pictureChange.type === ''){
      this.pictureChange.type = null;
    }
    //拼接表单参数
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    if(this.wzlutilService.isNotBlank(this.pictureChange.width)){
      formData.append("width",this.pictureChange.width);
    }
    if(this.wzlutilService.isNotBlank(this.pictureChange.height)){
      formData.append("height",this.pictureChange.height);
    }
    if(this.wzlutilService.isNotBlank(this.pictureChange.rate)){
      formData.append("rate",this.pictureChange.rate);
    }
    if(this.wzlutilService.isNotBlank(this.pictureChange.changeType)){
      formData.append("changeType",this.pictureChange.changeType);
    }
    if(this.wzlutilService.isNotBlank(this.pictureChange.type)){
      formData.append("type",this.pictureChange.type);
    }
    this.commonService.doHttpPostForm(urls.changePictureUrl,formData).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let data = rst.data;
          this.resultPicUrl = data;
          this.wzlNgZorroAntdMessage.success("上传成功");
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
      //遮罩
      this.uploading.emit(false);
    });
  }
}
