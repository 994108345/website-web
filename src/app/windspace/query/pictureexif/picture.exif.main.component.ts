import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {forEach} from '@angular/router/src/utils/collection';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';

// 一定要声明AMap，要不然报错找不到AMap
declare var  AMap: any;
@Component({
  selector: 'picture-exif',
  templateUrl: './picture.exif.main.html',
  styleUrls: ['./picture.exif.main.css']
})
export class PictureExifMainComponent extends AbstractComponent{

  //上传文件集合
  uploadedFiles: any[] = [];
  //上传路由
  uploadUrl:string = urls.queryPictureExifUrl;
  //是否启用上传
  isUpload:boolean = false;
  //要上传的文件
  uploadingFiles:File[] = [];
  //上传文件容量超出提示文本
  invalidFileSizeMessageDetail:string = "maximum upload size is 50M";
  //文件大小
  pictureSize:number = 1024*50;
  //文件类型
  pictureType:string = "image/png,image/jpeg";
  //pictureexif-exif对象
  pictureExif:any = {};
  //地址
  address:string = null;
  //上传文件大小
  fileList:any[] = [];

  //是否上传中
  @Output() uploading = new EventEmitter<boolean>();

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
    if(event){
      let file = event.file;
      if(file){
        let status = event.file.status;
        if(status === "uploading"){
          //往父组件传递参数
          this.uploading.emit(true);
          //删除老的文件，每次只显示一个文件
          this.fileList = [file];
        }else if(status == "done"){
          let response = file.response;
          if(response){
            let status = response.status;
            if(status === successStatus){
              this.pictureExif = response.data;
              this.getMap();
              this.wzlNgZorroAntdMessage.info("解析图片成功");
            }else{
              this.wzlNgZorroAntdMessage.error("上传图片发送异常" + response.message)
            }
          }else{
            console.log("没有返回信息" + this.toJsonStr(event));
          }
          //往父组件传递参数
          this.uploading.emit(false);
        }else if(status == "error"){
          //往父组件传递参数
          this.uploading.emit(false);
          this.wzlNgZorroAntdMessage.error("Web error :" + this.toJsonStr(event))
        }else if(status == "removed"){

        }
      }else{
        console.log("file is null ..." + this.toJsonStr(event))
      }
    }
  }

  // 获取地图
  getMap(){
    let map = new AMap.Map('container', {
      zoom:17,
      center: [this.pictureExif.lon,this.pictureExif.lat]
    });
  }

  //根据经纬度获取地址(无法使用，不知道原因)
  getAddressByCoordinate(){
    let a = this.pictureExif;
    /*AMap.plugin('AMap.Geocoder', function() {
      var geocoder = new AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: '010'
      })

      var lnglat = [121.498940700955 ,31.116640896268]
      geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          this.address = result;
          // result为对应的地理位置详细信息
        }
      })
    })*/
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    var geocoder = new AMap.Geocoder({
      radius: 1000 //范围，默认：500
    });
    var marker = new AMap.Marker();
    function regeoCode() {
      var lnglat  = this.pictureExif.lon +"," + this.pictureExif.lat;
      map.add(marker);
      marker.setPosition(lnglat);
      geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete'&&result.regeocode) {
          var address = result.regeocode.formattedAddress;
          this.address = address;
        }else{
          this.wzlNgZorroAntdMessage.error('根据经纬度查询地址失败')
        }
      });
    }
  }

}
