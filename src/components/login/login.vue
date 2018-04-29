<template>
  <div class="page-wrapper">
    <div class="logo">
      <img src="../../common/image/logo.png">
    </div>
    <div class="loginbox">
      <img src="../../common/image/jiaoxyybgimg.png">
      <div class="userlogin-wrapper">
        <div class="userlogin">
          <div class="login-title">用户登录</div>
          <form action="/api/login" method="post">
            <div class="login-row">
              用户名
              <input type="text" name="username" class="login-row-input">
            </div>
            <div class="login-row">
              密　码
              <input type="password" name="password" class="login-row-input">
            </div>
            <input type="button" class="login-submit" value="登录">
          </form>
          <div class="horizon"></div>
          <a href="http://services.shu.edu.cn/" class="forgetPassword">忘记密码了?</a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="address">
        <p>信息服务电话：66133370</p>
        <p>地址：上海市宝山区上大路99号 邮编：200444</p>
      </div>
      <div class="copyright">
        <p>技术支持 上海大学信息化工作办公室</p>
        <p>Copyright © 2012-2017 Shanghai University, All Rights
          Reserved</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "login"
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
