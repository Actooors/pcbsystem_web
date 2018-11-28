<template>
  <div class="page-wrapper">
    <div class="logo">
      <img src="../../common/image/logo.png">
      <span class="name">公务车预约管理系统</span>
    </div>
    <div class="loginbox">
      <img src="../../common/image/jiaoxyybgimg.png" class="bgimg">
      <div class="userlogin-wrapper">
        <div class="userlogin">
          <div class="login-title">用户登录</div>

          <div class="login-row">
            用户名
            <input type="text" name="username" class="login-row-input" v-model="username">
          </div>
          <div class="login-row">
            密　码
            <input type="password" name="password" class="login-row-input" v-model="password">
          </div>
          <input type="button" class="login-submit" value="登录" @click="handleOnLoginButtonClick">
          <div class="horizon"></div>
          <a href="http://services.shu.edu.cn/" class="forgetPassword">忘记密码了?</a>
          <p style="color: red;  font-size: 14px;text-align: right;padding-right: 20px;" id="point" v-show="loginfault">
            用户名或密码错误,请重新输入. </p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="address">
        <p>地址：上海市宝山区上大路99号 邮编：200444</p>
        <p>信息服务电话：66133370</p>
      </div>
      <div class="copyright">
        <p>技术支持 上海大学信息化工作办公室</p>
        <p>Copyright © 2012-2018 Shanghai University, All Rights
          Reserved</p>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
        loginfault: false
      }
    },
    methods: {
      handleOnLoginButtonClick() {
        console.log("点击登陆！")
        const loading = this.$loading({
          lock: true,
          text: '正在登录...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.loginfault = false
        const enumMap = [undefined, 'passenger', 'driver', 'admin']
        let lenUsername = this.username.split().filter((x) => {
          return !isNaN(x)
        }).join('').length
        if (this.password.length >= 6) {
          axios.post('http://172.20.10.2:8081/login', {
            userId: this.username,
            password: this.password
          })
            .then((res) => {
              if (res.data.code === 'FAILED'){
                this.$notify.error({
                  message: res.data.message
                });
                loading.close()
              }
              else {
                //登录成功，将token等信息添加到localStorage
                loading.close()
                let userIdentity = enumMap[res.data.data.userIdentity]
                console.log(res.data.data.userIdentity)
                console.log(userIdentity)
                localStorage.setItem('userIdentity', userIdentity)
                localStorage.setItem('userId', res.data.data.userId)
                localStorage.setItem('userName', res.data.data.userName)
                localStorage.setItem('userImg', res.data.data.userImg)
                localStorage.setItem('token', res.data.data.token)
                //是否有重定向参数
                if (this.$route.query.hasOwnProperty('redirect'))
                  this.$router.push({path: this.$route.query.redirect})
                else
                  this.$router.push({name: userIdentity})
              }
            })
            .catch((error) => {
              this.$notify.error({
              message: error
              });
              loading.close()
            })
        }
        else {
          this.loginfault = true;
        }
      }
    },
    mounted() {
      document.onkeyup = (event) => {
        // console.log(event.code)
        if (event.code === 'Enter') {
          this.handleOnLoginButtonClick()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/login';
</style>
<style>
  html body {
    background: #fff;
  }
</style>
