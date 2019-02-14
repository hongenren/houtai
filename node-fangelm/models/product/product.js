'use strict';

import mongoose from 'mongoose'
import productData from '../../InitData/product'

const Schema = mongoose.Schema;

const productSchema = new Schema({
	regular: String,
	name: String,
	year: Number,

	yearadd: Number,
	id: Number,
	productname: String,
	money: Number
})

productSchema.index({index: 1});

const product = mongoose.model('product', productSchema);

product.findOne((err, data) => {
	console.log(data);
	
	if (!data) {
		productData.forEach(item => {
			product.create(item);
		})
	}
})

export default product