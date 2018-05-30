<template>
  <div class="root-wrapper">
    <m-header title="公车预约系统超级管理员端">
      <i @click="showSideBar" class="el-icon-caret-right sidebarIcon">Menu</i>
    </m-header>
    <side-bar :value=true :items="sidebarItems" :overlay=false id="sidebarDesk"></side-bar>
    <side-bar v-model="ifShowSideBar" :items="sidebarItems" id="sidebarMobile"></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import SideBar from 'base/sidebar/sidebar'
  import MHeader from 'components/m-header/m-header'

  export default {
    name: "superadmin",
    components: {
      SideBar,
      MHeader
    },
    data() {
      return {
        ifShowSideBar: false,
        sidebarItems: [{
          index: '/superadmin/superusermanagement',
          iconClass: 'icon iconfont icon-LC_icon_user_fill_confirm',
          iconStyle: 'font-size: 22px;margin-right:6px',
          title: '用户管理'
        }]
      }
    },
    methods: {
      showSideBar() {
        this.ifShowSideBar = !this.ifShowSideBar
      }
    }
  }
</script>

<style lang="scss">
  .sidebarIcon {
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    display: table;
    margin: auto 2px;
    color: white;
    font-size: 1em;
  }

  @media screen and (min-width: 1024px) {
    .sidebarIcon, #sidebarMobile {
      display: none;
    }
  }

  @media screen and (max-width: 1023px) {
    #sidebarDesk {
      display: none;
    }
  }
</style>
