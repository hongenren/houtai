
import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
import { MessageBox } from 'element-ui';
import store from '@/store';

Vue.use(Router);

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title);
    if (!to.meta.unLogin && !localStorage.getItem('userInfo')) {
        MessageBox.alert('请先登录', '提示')
            .then(() => {
                location.href = `./#/login`;
            });
        return;
    }
    next();
});

router.afterEach((to, from, next) => {
    store.commit('updateBreadcrumb', to.name);
});

router.afterEach((to, from, next) => {
});

export default router;
