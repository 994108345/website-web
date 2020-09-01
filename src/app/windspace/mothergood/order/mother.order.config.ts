/*订单主状态*/
export const mother_order_status_conf = [
  {value:'0',label:'创建订单'},
  {value:'10',label:'发送商家'},
  {value:'20',label:'商家发货'},
  {value:'30',label:'用户收到货物'},
  {value:'40',label:'订单异常'},
]

/*订单子状态*/
export const mother_order_sub_status_conf = [
  {value:'0',label:'没有子状态'},
]

/*订单结算状态*/
export const mother_order_settlement_status_conf = [
  {value:'1',label:'没有结算'},
  {value:'2',label:'已经结算'},
]

/*商品价使用的格类型*/
export const good_use_price_type_conf = [
  {value:'1',label:'原价'},
  {value:'2',label:'折扣价'},
]
