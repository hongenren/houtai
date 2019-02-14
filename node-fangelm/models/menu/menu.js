'use strict'
import mongoose from 'mongoose';
import menuData from '../../InitData/menu'


const Schema = mongoose.Schema;

const menuSchema = new Schema({
	data: Object
})

menuSchema.index({id: 1});

const Menu = mongoose.model('Menu', menuSchema);
Menu.findOne((err, data) => {
	if (!data) {
    // console.log(menuData)
		Menu.create(menuData);
	}
})

export default Menu