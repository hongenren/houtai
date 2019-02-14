'use strict';

// import CategoryModel from '../../models/shopping/category'

import BaseComponent from '../../prototype/baseComponent'

import productModel from '../../models/product/product'

class productgory extends BaseComponent{
	constructor(){
		super()
	}
	

	//获取配送方式
	async getproduct(req, res, next){
		try{
			const products = await productModel.find({});
			res.send(products)
		}catch(err){
			console.log('获取数据失败');
			res.send({
				status: 0,
				type: 'ERROR_DATA',
				message: '获取数据失败'
			})
		}
	}
	//获取活动列表
	async getActivity(req, res, next){
    console.log("aa");
    
		try{
			const activities = await ActivityModel.find({}, '-_id');
      res.send(activities)
      console.log(activities);
      
		}catch(err){
			console.log('获取活动数据失败');
			res.send({
				status: 0,
				type: 'ERROR_DATA',
				message: '获取活动数据失败'
			})
		}
	}
}

export default new productgory()