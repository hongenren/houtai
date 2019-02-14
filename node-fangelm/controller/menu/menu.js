'use strict';

// import CategoryModel from '../../models/shopping/category'

import BaseComponent from '../../prototype/baseComponent'

import menuModel from '../../models/menu/menu'

class menugory extends BaseComponent{
	constructor(){
		super()
	}
	

	//获取菜单列表
	async getmenu(req, res, next){
		try{
			const menus = await menuModel.find({});
      res.send(menus)
      console.log(menus)
		}catch(err){
			console.log('获取数据失败');
			res.send({
				status: 0,
				type: 'ERROR_DATA',
				message: '获取数据失败'
			})
		}
	}
}

export default new menugory()