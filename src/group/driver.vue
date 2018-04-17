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
    <tabbar>
      <tabbar-item show-dot link="../../components/progress/progress">
        <img slot="icon" src="../common/image/icon_nav_msg.png">
        <span slot="label">正在进行</span>
      </tabbar-item>
      <tabbar-item badge="2" link="../../components/applying/applying">
        <img slot="icon" src="../common/image/icon_nav_article.png">
        <span slot="label">正在申请</span>
      </tabbar-item>
      <tabbar-item badge="99+" link="../../components/history/history">
        <img slot="icon" src="../common/image/icon_nav_cell.png">
        <span slot="label">预约历史</span>
      </tabbar-item>
    </tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
    import MHeader from "components/m-header/m-header"
    import Sidebar from "components/sidebar/sidebar"
    import PassengerInfo from "components/passengerinfo/passengerinfo"
    import Manage from "components/manage/manage"
    import History from "components/history/history"
    import {Tabbar, TabbarItem} from 'vux'
    export default {
        name: "driver",
        components:{
          Sidebar,
          MHeader,
          PassengerInfo,
          Manage,
          History,
          Tabbar,
          TabbarItem
        },
        data(){
          return {
            ifShowSideBar: false,
            sidebarItems:[{
              index: 'requests',
              iconClass: 'icon iconfont icon-jiaocheqiche',
              iconStyle: 'font-size: 30px;margin-right: 4px',
              title: '预约请求'
            },{
              index: 'manage',
              iconClass: 'icon iconfont icon-yuding',
              iconStyle: 'font-size: 24px;margin-right: 8px',
              title: '预约管理'
            },{
              index: 'history',
              iconClass: 'el-icon-document',
              iconStyle: 'font-size: 24px;margin-right: 8px',
              title: '预约历史'
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
