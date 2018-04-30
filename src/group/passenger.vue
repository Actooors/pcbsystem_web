<template>
  <div>
    <m-header title="上海大学公车预约系统">
      <i @click="showSideBar" class="el-icon-caret-right sidebarIcon">Menu</i>
    </m-header>
    <side-bar :value=true :items="sidebarItems" :overlay=false id="sidebarDesk"></side-bar>
    <side-bar v-model="ifShowSideBar" :items="sidebarItems" id="sidebarMobile"></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import MHeader from "components/m-header/m-header"
  import SideBar from "base/sidebar/sidebar"
  import PassengerInfo from "components/personalinfo/personalinfo"
  import Manage from "components/manage/manage"
  import History from "components/manage/history"
  import Applying from "components/manage/applying"
  import Progressing from "components/manage/progressing"
  import {Tabbar, TabbarItem} from 'vux'

  export default {
    name: "passenger",
    components: {
      SideBar,
      MHeader,
      PassengerInfo,
      Manage,
      History,
      Applying,
      Progressing,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        ifShowSideBar: false,
        sidebarItems: [{
          index: '/passenger/booking',
          iconClass: 'icon iconfont icon-jiaocheqiche',
          iconStyle: 'font-size: 30px;margin-right: 4px',
          title: '公车预约'
        }, {
          index: '/passenger/manage',
          iconClass: 'icon iconfont icon-yuding',
          iconStyle: 'font-size: 24px;margin-right: 8px',
          title: '预约管理'
        }, {
          index: '/passenger/info',
          iconClass: 'el-icon-setting',
          iconStyle: 'font-size: 24px;margin-right: 8px',
          title: '个人信息'
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
