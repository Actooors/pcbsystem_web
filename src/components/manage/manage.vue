<template>
  <div class="page-wrapper">
    <router-view></router-view>
    <div class="tabbar">
      <tabbar>
        <tabbar-item link="allinfo">
          <img slot="icon" src="../../common/image/allinfo.png">
          <span slot="label">全部信息</span>
        </tabbar-item>
        <tabbar-item link="applying">
          <img slot="icon" src="../../common/image/icon_nav_article.png">
          <span slot="label">正在申请</span>
        </tabbar-item>
        <tabbar-item link="history">
          <img slot="icon" src="../../common/image/icon_nav_cell.png">
          <span slot="label">预约历史</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>

</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'

  export default {
    name: "manage",
    components: {
      Tabbar,
      TabbarItem
    },
    methods: {
      tabbarclick(x) {
        console.log(x)
      }
    }
  }
</script>

<style>
  .tabbar {
    width: 100%;
    bottom: 0;
    position: fixed;
  }
</style>
