<template>
  <div>
    <m-header title="公车预约系统司机端">
      <i @click="showSideBar" class="el-icon-caret-right sidebarIcon">Menu</i>
    </m-header>
    <sidebar
      v-model="ifShowSideBar"
      :items="sidebarItems"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  import MHeader from "components/m-header/m-header"
  import Sidebar from "base/sidebar/sidebar"
  import PassengerInfo from "components/personalinfo/personalinfo"
  import Requests from "components/requests/requests"
  import Repair from "components/repair/repair"

  export default {
    name: "driver",
    components: {
      Sidebar,
      MHeader,
      PassengerInfo,
      Requests,
      Repair
    },
    data() {
      return {
        ifShowSideBar: false,
        sidebarItems: [{
          index: '/driver/requests',
          iconClass: 'icon iconfont icon-jiaocheqiche',
          iconStyle: 'font-size: 30px;margin-right: 4px',
          title: '预约请求'
        }, {
          index: '/driver/repair',
          iconClass: 'icon iconfont icon-yuding',
          iconStyle: 'font-size: 24px;margin-right: 8px',
          title: '车辆报修'
        }, {
          index: '/driver/info',
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

<style>
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
    .sidebarIcon {
      left:2%
    }
  }
</style>
