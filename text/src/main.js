// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import api from './config/api';
import stores from './store/index';
import elementUi from './config/element-ui';
import axios from './config/axios';
import filters from './config/filter';
Vue.config.productionTip = false;
// API
Vue.prototype.$api = api;
// Filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    axios,
    elementUi,
    store: stores,
    components: { App },
    template: '<App/>'
});
