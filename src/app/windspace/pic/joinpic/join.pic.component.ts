import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, baseConfig, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {UploadFile} from 'ng-zorro-antd';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'join-pic',
  templateUrl: './join.pic.html',
  styleUrls: ['./join.pic.css']
})
export class JoinPicComponent extends AbstractComponent{

  //文件大小
  pictureSize:number = 1024*20;
  //文件类型
  pictureType:string = 'image/png,image/jpeg';
  //pictureexif-change对象
  joinPic:any = {};
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

  ngOnInit(){
    console.log("JoinPicComponent");
    //设置图片缩放样式的默认值
    this.joinPic.stretchType = "fixed";
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  /**
   * 图片加文字
   */
  joinPicMethod(){

    const formData = new FormData();
    //参数校验
    if(this.wzlutilService.isBlank(this.joinPic.cols)){
      this.wzlNgZorroAntdMessage.warning('文字内容不能为空......');
      return;
    }
    if(this.wzlutilService.isBlank(this.joinPic.stretchType)){
      this.wzlNgZorroAntdMessage.warning('图片拉伸类型不能为空......');
      return;
    }
    //拼接表单参数
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    if(this.wzlutilService.isNotBlank(this.joinPic.cols)){
      formData.append("cols",this.joinPic.cols);
    }
    if(this.wzlutilService.isNotBlank(this.joinPic.stretchType)){
      formData.append("stretchType",this.joinPic.stretchType);
    }
    this.commonService.doHttpPostForm(urls.joinPicUrl,formData).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let data = rst.data;
          this.resultPicUrl = data;
          this.wzlNgZorroAntdMessage.success("处理成功");
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
    });
  }
}
