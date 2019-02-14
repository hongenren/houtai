<template>
    <div>
        <template v-for="(item) in menuData">
            <el-submenu v-if="item.resourceAccessList && item.resourceAccessList.length > 0" :index="item.name" :key="item.name">
                    <template slot="title">
                        <i v-if="item.icon" :class="[item.icon]"></i>
                        <span slot="title">{{ item.name }}</span>
                    </template>
                    <gy-menu-item :menu-data="item.resourceAccessList"></gy-menu-item>
            </el-submenu>
            <el-menu-item :link="item.frontUrl" v-else :index="item.frontUrl" :key="item.name">
                <i v-if="item.icon" :class="[item.icon]"></i>&nbsp;<span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
    name: 'gyMenuItem',
    props: {
        menuData: Array,
        menuIndex: {
            type: String,
            default: ''
        }
    },
    methods: {
        goPage (data) {
            this.$router.push(data);
        }
    }
};
</script>

<style scoped>

</style>
