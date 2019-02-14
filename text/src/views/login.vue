<template>
    <div class="login-main">
        <div class="login-header">
            <div class="inner">
                <a href="/" class="logo"><img src="../assets/images/gy-logo.png" alt=""></a>
                <span>CRM</span>
            </div>
        </div>
        <div class="login-center">
            <div class="login-center-bgc" :style='"background-image: url(" + bgimag.center + ")"'>
                <div class="login-center-input-box">
                    <div class="login-center-password">密码登录</div>
                    <div class="login-center-error">{{ errorMessage }}</div>
                    <input class="login-center-input login-email login-no-member" type="text" placeholder="邮箱/会员名/手机号"
                           v-model="loginData.username">
                    <input class="login-center-input login-password login-no-member" type="password" placeholder="登录密码"
                           v-model="loginData.password" @keyup.13="submitLogin">
                    <button class="login-center-submit" @click="submitLogin">登录</button>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <input class="login-center-checkbox" type="checkbox" v-model="loginData.rememberMe"><span
                                class="login-no-member">记住我</span>
                            </div>
                        </el-col>
                        <!-- <el-col :span="12">
                            <div class="grid-content bg-purple-dark login-center-forget-passwords">
                                <router-link class="login-center-forget-password login-no-member"
                                             :to="{name: 'registerPassword'}">忘记密码?
                                </router-link>
                            </div>
                        </el-col> -->
                    </el-row>
                    <!-- <span class="login-no-member">还没有注册国烨会员?</span>
                    <router-link class="login-register" :to="{ path: '/register' }">立即注册</router-link> -->
                </div>
            </div>
        </div>
        <div class="login-footer">
            <p>关于我们 | 联系我们 | 交易流程说明 | 发布供求信息 | 开通交易权限 | 企业文化 | 公司介绍 | English Site</p>
            <p>copyright 2015-2017 上海国烨跨境电子商务有限公司</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            loginData: {
                username: 'yichemaoyi',
                password: 'Aa123456',
                rememberMe: false
            },
            bgimag: {
                center: require('@/assets/images/login-cover.jpg')
            },
            fileList: [],
            errorMessage: ''
        };
    },
    created () {
        this.$http.get(this.$api.login.menu)
            .then(res => {
                console.log(res.data[0].data.data);
                localStorage.setItem('userInfo', JSON.stringify(res.data[0].data.data));
            });
    },
    methods: {
        submitLogin () {
            if (this.loginData.rememberMe === true && this.loginData.username !== '') {
                localStorage.setItem('userNames', this.loginData.username);
            }
            this.$http.post(this.$api.login.login, this.loginData)
                .then(res => {
                    console.log(res);
                    // if (res.data.code === 0 && res.data.data) {
                    //     localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                    //     let navData = res.data.data.menuList[0].resourceAccessList;
                    //     let frontUrl;
                    //     let firstlist = list => {
                    //         if (list[0].resourceAccessList.length === 0) {
                    //             frontUrl = list[0].frontUrl;
                    //         } else {
                    //             firstlist(list[0].resourceAccessList);
                    //         }
                    //     };
                    //     firstlist(navData);
                    //     console.log(frontUrl);
                    //     if (res.data.data.menuList.length === 0) {
                    //         this.$router.push({name: 'container'});
                    //         return;
                    //     }
                    //     this.$router.push({name: 'workbenchPersonal'});
                    //     return;
                    // }
                    if (res.data.status === 1) {
                        this.$router.push({name: 'workbenchPersonal'});
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                }).catch(() => {
                    console.log('登录出错');
                });
        }
    }
};
</script>

<style scoped lang="scss">
    .login-header {
        height: 58px;
        line-height: 58px;
        background-color: #fff;
        .inner {
            margin: 0 auto;
            width: 1200px;
            overflow: hidden;
            .logo {
                display: inline-block;
                vertical-align: top;
            }
            img {
                width: 146px;
                height: auto;
                margin-right: 20px;
            }
            span {
                font-family: PingFangSC-Medium;
                font-size: 18px;
                color: $color-title;
                vertical-align: middle;
            }
        }
    }
    .login-footer {
        margin: 40px auto 0;
        width: 1200px;
        overflow: hidden;
        text-align: center;
        p {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #9E9E9E;
        }
        p:nth-child(1) {
            margin-bottom: 15px;
        }
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #FFFFFF;
    }

    .grid-content {
        min-height: 36px;
        width: 135px;
    }

    .login-main {
        width: 100%;
        min-width: 1200px;
    }

    .login-center-top {
        width: 100%;
        height: 74px;
    }

    .login-center {
        width: 100%;
        height: 540px;
        background: #FFFFFF;
    }

    .login-center-bgc {
        height: 540px;
        position: relative;
        background-position: center center;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .login-center-input-box {
        height: 275px;
        width: 320px;
        left: 50%;
        top: 50%;
        margin: -128px 0 0 279px;
        padding-left: 20px;
        background: #FFFFFF;
        border-radius: 4px;
        position: absolute;
    }

    h2 {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #000000;
    }

    .login-center-input {
        width: 280px;
        height: 35px;
        border: 1px solid #E7ECF1;
        border-radius: 4px;
        padding-left: 10px;
    }

    .login-email {
        margin-top: 28px;
    }

    .login-password {
        margin-top: 15px;
    }

    .login-center-submit {
        display: inline-block;
        width: 280px;
        height: 35px;
        background-image: linear-gradient(-225deg, #FF3511 0%, #FFA22F 100%);
        border-radius: 5px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        line-height: 35px;
        margin-top: 20px;
        cursor: pointer;
    }

    .login-center-password {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        padding-top: 15px;
    }

    .login-center-checkbox {
        margin-top: 15px;
    }

    .login-center-forget-password {
        display: inline-block;
        margin-top: 10px;
        margin-right: 5px;
    }

    .login-center-forget-passwords {
        text-align: right;
    }

    .login-no-member {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
    }

    .login-register {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #E0370F;
    }

    .clear {
        clear: both;
    }

    .login-header-img {
        width: 141px;
        height: 35px;
        display: inline-block;
    }

    .login-center-error {
        top: 45px;
        width: 280px;
        position: absolute;
        height: 25px;
        color: red;
        font-size: 12px;
        padding-left: 10px;
    }
</style>
