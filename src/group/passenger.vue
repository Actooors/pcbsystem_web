<template>
  <div>
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_617648_jvrgszqer6jn61or.css">
    <m-header>
      <span @click="showSideBar" class="btn-sidebar"><i class="icon iconfont icon-category"></i></span>
    </m-header>
    <sidebar
      :ifshow="ifShowSideBar"
      @on-show-state-changed="_onSideBarStateChanged"
    :items="sidebarItems"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  import MHeader from "components/m-header/m-header"
  import Sidebar from "components/sidebar/sidebar"
  import PassengerInfo from "components/passengerinfo/passengerinfo"
  import Manage from "components/manage/manage"
  import History from "components/history/history"
  import Progressing from "components/progressing/progressing"
  import Applying from "components/applying/applying"
  import {Tabbar, TabbarItem} from 'vux'
  export default {
    name: "passenger",
    components: {
      Sidebar,
      MHeader,
      PassengerInfo,
      Progressing,
      Applying,
      Manage,
      History,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        ifShowSideBar: false,
        sidebarItems:[{
          index: 'booking',
          iconClass: 'icon iconfont icon-jiaocheqiche',
          iconStyle: 'font-size: 30px;margin-right: 4px',
          title: '公车预约'
        },{
          index: 'manage',
          iconClass: 'icon iconfont icon-yuding',
          iconStyle: 'font-size: 24px;margin-right: 8px',
          title: '预约管理'
        },{
          index: 'info',
          iconClass: 'el-icon-setting',
          iconStyle: 'font-size: 24px;margin-right: 8px',
          title: '个人信息'
        }]
      }
    },
    methods: {
      showSideBar() {
        this.ifShowSideBar = !this.ifShowSideBar
      },
      _onSideBarStateChanged(val) {
        this.ifShowSideBar = val
      }
    }
  }
</script>

<style>
  .btn-sidebar {
    position: relative;
    float: left;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 10px 10px 10px;
  }
</style>
