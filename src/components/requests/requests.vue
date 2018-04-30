<template>
  <div class="page-wrapper">
    <router-view></router-view>
    <div class="tabbar">
      <tabbar>
        <tabbar-item show-dot link="begin">
          <img slot="icon" src="../../common/image/icon_nav_msg.png">
          <span slot="label">即将开始</span>
        </tabbar-item>
        <tabbar-item badge="2" link="progress">
          <img slot="icon" src="../../common/image/icon_nav_article.png">
          <span slot="label">正在进行</span>
        </tabbar-item>
        <tabbar-item badge="99+" link="end">
          <img slot="icon" src="../../common/image/icon_nav_cell.png">
          <span slot="label">已经结束</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>
<script>
  import {
    Tabbar,
    TabbarItem
  } from 'vux'

  export default {
    name: "requests",
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>

<style scoped>

</style>

<style>
  .requests-form-red {
    width: 100%;
    margin: 20px auto;

  }

  .requests-form-red:hover {
    box-shadow: 1px 1px 100px #e64a47;
  }

  .requests-form-yellow {
    width: 100%;
    margin: 20px auto;

  }

  .requests-form-yellow:hover {
    box-shadow: 1px 1px 100px #e6c737;
  }

  .requests-form-red .weui-form-preview__hd .weui-form-preview__value {
    color: red;
  }

  .requests-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #e6c737;
  }
</style>
