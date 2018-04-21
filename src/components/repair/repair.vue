<template>
  <div class="tabbar">
    <tabbar>
      <tabbar-item link="form">
        <img slot="icon" src="../../common/image/icon_nav_msg.png">
        <span slot="label">填写表单</span>
      </tabbar-item>
      <tabbar-item badge="2" link="msg">
        <img slot="icon" src="../../common/image/icon_nav_article.png">
        <span slot="label">报修消息</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'

  export default {
    name: "repair",
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>

<style scoped>

</style>
