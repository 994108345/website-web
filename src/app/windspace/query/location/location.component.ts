import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'location-query',
  templateUrl: './location.html',
  styleUrls: ['./location.css']
})
export class LocationComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("LocationComponent");
  }

  /**
   * 查询经纬度
   */
  getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.showPosition,this.showError);
    }else{
      this.wzlNgZorroAntdMessage.warning("定位失败");
    }
  }

  showPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    alert("我当前经度为" + position.coords.longitude + ",纬度为"+ position.coords.latitude );
  }

  showError(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("定位失败,用户拒绝请求地理定位");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("定位失败,位置信息是不可用");
        break;
      case error.TIMEOUT:
        alert("定位失败,请求获取用户位置超时");
        break;
      case error.UNKNOWN_ERROR:
        alert("定位失败,定位系统失效");
        break;
    }
  }

}
