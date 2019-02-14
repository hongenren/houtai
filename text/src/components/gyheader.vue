<template>
    <div class="gy-header">
        <div class="content">
            <div class="logo"><img src="../assets/images/gy-logo.png" height="69" width="292"/><span>CRM</span></div>
            <ul class="user-msg">
                <li><a href="javascript:;"><i class="iconfont icon-header-user"></i>{{userInfo.account}}</a></li>
                <!--<li><a href="javascript:;" @click="msg"><i class="iconfont icon-header-msg"></i></a></li>-->
                <li><a href="javascript:;" @click="logout"><i class="iconfont icon-header-layout"></i>退出</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userInfo: null
        };
    },
    created () {
        let user = localStorage.getItem('userInfo');
        if (user) {
            this.userInfo = JSON.parse(user);
        }
    },
    methods: {
        logout () {
            this.$confirm('确定退出登录吗？', '提示')
                .then(() => {
                    this.$http.post(this.$api.login.logout)
                        .then(res => {
                            if (res.data.code === 0) {
                                localStorage.removeItem('userInfo');
                                location.href = './#/login';
                                location.reload();
                                return;
                            }
                            this.$alert(res.data.message, '出错了');
                        });
                });
        },
        msg () {
            this.$router.push({name: 'msgbox'});
        }
    }
};
</script>

<style lang="scss" scoped>
.gy-header {
    width: 100%;
    min-width: 1400px;
    margin-bottom: 7px;
    background: $color-white;
    .content {
        width: 1400px;
        height: 40px;
        margin: 0 auto;
        &:after {
            display: block;
            clear: both;
            content: ' ';
        }
        .logo {
            float: left;
            padding-top: 7px;
            img {
                width: 146px;
                height: auto;
                margin-right: 20px;
            }
            span{
                // font-family: PingFangSC-Medium;
                font-size: 18px;
                color: #333;
                vertical-align: middle;
            }
        }
        .user-msg {
            float: right;
            li {
                display: inline-block;
                margin-left: 15px;
                line-height: 40px;
            }
        }
    }
}
.iconfont {
    position: relative;
    top: -2px;
}
.icon-header-user {
    margin-right: 5px;
}
.icon-header-layout {
    margin-right: 5px;
    top: -3px;
}
</style>
