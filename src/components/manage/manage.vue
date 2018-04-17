<template>
  <div class="tabbar">
    <tabbar>
      <tabbar-item show-dot link="../components/progress/progress">
        <img slot="icon" src="../../common/image/icon_nav_msg.png">
        <span slot="label">正在进行</span>
      </tabbar-item>
      <tabbar-item badge="2" link="../components/applying/applying">
        <img slot="icon" src="../../common/image/icon_nav_article.png">
        <span slot="label">正在申请</span>
      </tabbar-item>
      <tabbar-item badge="99+" link="/passenger/history">
        <img slot="icon" src="../../common/image/icon_nav_cell.png">
        <span slot="label">预约历史</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'

  export default {
    name: "",
    components: {
      Tabbar,
      TabbarItem
    },
  }
</script>

<style scoped>

</style>
