<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-box">
        <div v-if="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="index">{{ item }}</el-breadcrumb-item>
        </div>
    </el-breadcrumb>
</template>

<script>
import routes from '@/router/router';
import {mapGetters} from 'vuex';
export default {
    data () {
        return {
            desc: 'breadcrumb component',
            breadcrumbData: []
        };
    },
    computed: mapGetters([
        'breadcrumb'
    ]),
    watch: {
        breadcrumb (newValue, oldValue) {
            this.breadcrumbFilter(newValue);
        }
    },
    created () {
        this.breadcrumbFilter(this.breadcrumb);
    },
    methods: {
        breadcrumbFilter (data) {
            this.getName(routes, data, 0, '');
        },
        getName (arr, data, level, ind) {
            level++;
            if (arr && arr.length > 0) {
                arr.map((item, index) => {
                    if (item.name === data) {
                        ind += ',' + index;
                        this.setBreadcrumb(ind, level);
                    } else if (item.children && item.children.length > 0) {
                        this.getName(item.children, data, level, ind + ',' + index);
                    }
                });
            }
        },
        setBreadcrumb (data) {
            console.log(data);
            let dataArr = data.split(',');
            let arr = [];
            let nameData = routes;
            dataArr.shift();
            for (let i = 0; i < dataArr.length; i++) {
                if (i === 0) {
                    nameData = nameData[dataArr[i]];
                } else {
                    nameData = nameData.children[dataArr[i]];
                }
                if (nameData && nameData.meta && nameData.meta.title) {
                    arr.push(nameData.meta.title);
                }
            }
            this.breadcrumbData = arr;
        }
    }};
</script>
<style lang="scss" scoped>
    .breadcrumb-box {
        background: #fff;
        width: 100%;
        height: 35px;
        display: flex;
        color: $color-minor;
        font-size: 14px;
        align-items: center;
        padding-left: 15px;
        border-bottom: 1px solid $color-border;
    }
    /deep/ .el-breadcrumb__inner {
        color: $color-minor;
    }
    /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
        color: $color-title;
    }
</style>
