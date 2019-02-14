'use strict';







import shopping from './shopping'
import product from './product'
import admin from './admin'
import menu from './menu'


export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });




	app.use('/shopping', shopping);
	app.use('/chanpin', product);
	app.use('/admin', admin);
	app.use('/menu', menu);

}