<template>
  <div class="root-wrapper">
    <m-header title="公车预约系统管理端">
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
    name: "admin",
    components: {
      SideBar,
      MHeader
    },
    data() {
      return {
        ifShowSideBar: false,
        sidebarItems: [{
          index: '/admin/message',
          iconClass: 'el-icon-message',
          iconStyle: 'font-size: 22px',
          title: '消息中心'
        }, {
          index: '/admin/usermanagement',
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
    position: relative;
    top: 0;
    bottom: 0;
    display: table !important;
    margin: auto 2px;
    color: white;
    font-size: 1em;
  }

  @media screen and (min-width: 1024px) {
    .sidebarIcon, #sidebarMobile {
      display: none !important;
    }
  }

  @media screen and (max-width: 1023px) {
    #sidebarDesk {
      display: none;
    }
  }
</style>
