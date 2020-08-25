import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {UploadFile} from 'ng-zorro-antd';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'add-text',
  templateUrl: './add.text.html',
  styleUrls: ['./add.text.css']
})
export class AddTextComponent extends AbstractComponent{

  //文件大小
  pictureSize:number = 1024*20;
  //文件类型
  pictureType:string = 'image/png,image/jpeg';
  //pictureexif-change对象
  picAddText:any = {};


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
  }

  /**
   * 保持永远只有一个图片
   * @param file
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    if(this.fileList.length > 1){
      this.fileList[0] = this.fileList[1];
      this.fileList.pop();
    }
    return false;
  };

  /**
   * 图片加文字
   */
  pictureAddText(){

    const formData = new FormData();
    //参数校验
    if(this.wzlutilService.isBlank(this.picAddText.text)){
      this.wzlNgZorroAntdMessage.warning('文字内容不能为空......');
      return;
    }
    //拼接表单参数
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    if(this.wzlutilService.isNotBlank(this.picAddText.text)){
      formData.append("text",this.picAddText.text);
    }
    this.commonService.doHttpPostForm(urls.picAddTextUrl,formData).then(rst =>{
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
