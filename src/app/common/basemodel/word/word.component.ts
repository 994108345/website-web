import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';
import {asllCode, urls} from '../../../app.config';
import {successStatus} from '../../service/base/common.config';

@Component({
  selector: 'web-word',
  templateUrl: './word.html',
  styleUrls: ['./word.css']
})
export class WordComponent extends AbstractComponent{

  //彩虹屁
  rainbowFart:string = "";
  //鸡汤
  chickenSoup:string = "";
  //毒鸡汤
  taintedChickenSoup:string = "";

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit() {
    console.info("随机一句话模块");
  }

  /**
   * 获取彩虹屁
   */
  getRainbowFart() {
    let condition = {};
    this.commonService.doHttpPost(urls.getRainbowFartUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.rainbowFart = rst.data;
          this.wzlNgZorroAntdMessage.success('查询成功');
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally(() => {
    });
  }

  /**
   * 获取鸡汤
   */
  getChickenSoup() {
    let condition = {};
    this.commonService.doHttpPost(urls.getChickenSoupUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.chickenSoup = rst.data;
          this.wzlNgZorroAntdMessage.success('查询成功');
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally(() => {
    });
  }

  /**
   * 获取毒鸡汤
   */
  getTaintedChickenSoup() {
    let condition = {};
    this.commonService.doHttpPost(urls.getTaintedChickenSoupUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.taintedChickenSoup = rst.data;
          this.wzlNgZorroAntdMessage.success('查询成功');
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally(() => {
    });
  }

}
