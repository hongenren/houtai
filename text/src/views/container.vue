<template>
    <div>
        <gy-header></gy-header>
        <div class="userCenter">
            <div class="userCenter-side">
                <NavMenu/>
            </div>
            <div class="userCenter-content">
                <Breadcrumb/>
                <div class="userCenter-main">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gyHeader from '@/components/gyheader.vue';
import NavMenu from '@/components/navMenu.vue';
import Breadcrumb from '@/components/breadcrumb';

export default {
    name: 'container',
    components: {gyHeader, NavMenu, Breadcrumb}
};
</script>

<style lang="scss" scoped>
.userCenter {
    /*display: flex;*/
    /*display: -ms-flexbox;*/
    width: 1400px;
    min-height: calc(100vh - 50px);
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    .userCenter-side {
        position: absolute;
        left: 0;
        top: 0;
        width: 240px;
        /*flex: 0 0 240px;*/
        /*-ms-flex: 0 0 240px;*/
        padding: 15px 0;
        padding-bottom: 10000px;
        margin-bottom: -10000px;
        border-right: 1px solid $color-border;
        background: $color-white;
    }
    .userCenter-content {
        /*flex: 1;*/
        /*-ms-flex: 1;*/
        width: 1400px;
        padding-left: 247px;
        min-height: calc(100vh - 50px);
        /*overflow: hidden;*/
        .userCenter-main {
            margin-top: 7px;
            padding-bottom: 10000px;
            margin-bottom: -10000px;
            background: $color-white;
        }
    }
}
</style>
