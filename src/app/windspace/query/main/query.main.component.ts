import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {asllCode, cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'web-query',
  templateUrl: './query.main.html',
  styleUrls: ['./query.main.css']
})
export class QueryMainComponent extends AbstractComponent{

  //查询邮政编码返回的信息
  cityMessage:string;
  //查询邮政编码的城市名
  queryCity:string;


  //查询天气的城市名
  weatherCity:string;
  //天气城市信息
  weatherCityMessage:string;
  //近几天的天气预报
  weatherReposts:any[];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  @Output() private onDelete = new EventEmitter();

  ngOnInit(){
    console.log("query界面");


  }

  /**
   * 查询邮政编码
   */
  queryPostal(){
    let condition = {queryCity:this.queryCity};
    this.commonService.doHttpPost(urls.getPostalUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let data = rst.data;
          if(data){
            if(this.wzlutilService.isBlank(data.cityName)
              && this.wzlutilService.isBlank(data.provinceName)
              && this.wzlutilService.isBlank(data.areaName)){
              this.cityMessage = "未查到匹配的数据";
            }else{
              this.cityMessage = data.provinceName + data.cityName + data.areaName + ";邮政编码;" + data.postalCode;
            }
          }else{
            this.cityMessage = null;
          }
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
  // 查询邮政编码回车
  pressQueryPostal(event){
    if(event.which == asllCode.enter){
      this.queryPostal();
    }
  }

  //查询天气
  queryWeather(){
    let condition = {cityName:this.weatherCity};
    this.commonService.doHttpPost(urls.queryWeatherUrl,condition).then(rst =>{
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          let data = rst.data;
          if(data){
            let forecasts = data.forecasts;
            if(forecasts){
              for(let forecast of forecasts){
                let city = forecast.city;
                let province = forecast.province;
                let reportTime = forecast.reporttime;
                if(!city){
                  city = "";
                }
                if(!province){
                  province = "";
                }

                this.weatherCityMessage = "省份："+ province + "  城市：" +city + "  发布时间：" + reportTime;
                this.weatherReposts = forecast.casts;
              }
            }
          }
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

  //查询天气回车
  pressQueryWeather(event){
    if(event.which == asllCode.enter){
      this.queryWeather();
    }
  }


}
