// 引入子路由
// import Sub from '@/frame/subroute.vue';

import login from '@/views/login.vue';
import container from '@/views/container.vue';
import workbenchPersonal from '@/views/workbench/workbench-personal.vue';
import architecture from '@/views/role/organizational-structure.vue';

// 配置路由
export default [
    {
        path: '*',
        redirect: login
    },
    {
        path: '/my',
        name: 'container',
        component: container,
        meta: {
            title: ''
        },
        children: [
            {
                path: '/workbenchPersonal',
                name: 'workbenchPersonal',
                component: workbenchPersonal,
                meta: {
                    title: '工作台',
                    unLogin: true
                }
            },
            {
                path: '/architecture',
                name: 'architecture',
                component: architecture,
                meta: {
                    title: '组织架构'
                }
            }
        ]

    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录',
            unLogin: true
        }
    }
];
