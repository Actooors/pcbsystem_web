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
    import Requests from "components/requests/requests"
    import Repair from "components/repair/repair"
    export default {
        name: "driver",
        components:{
          Sidebar,
          MHeader,
          PassengerInfo,
          Requests,
          Repair
        },
        data(){
          return {
            ifShowSideBar: false,
            sidebarItems:[{
              index: '/driver/requests',
              iconClass: 'icon iconfont icon-jiaocheqiche',
              iconStyle: 'font-size: 30px;margin-right: 4px',
              title: '预约请求'
            },{
              index: '/driver/repair',
              iconClass: 'icon iconfont icon-yuding',
              iconStyle: 'font-size: 24px;margin-right: 8px',
              title: '车辆报修'
            },{
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
        },
        _onSideBarStateChanged(val) {
          this.ifShowSideBar = val
        }
      }
    }
</script>

<style scoped>
  .btn-sidebar {
    position: relative;
    float: left;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 10px 10px 10px;
  }
</style>
