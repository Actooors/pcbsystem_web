<template>
  <div class="root-wrapper">
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_617648_jvrgszqer6jn61or.css">
    <m-header>
      <span @click="showSideBar" class="btn-sidebar"><i class="icon iconfont icon-category"></i></span>
    </m-header>
    <side-bar v-model="ifShowSideBar" :items="sidebarItems"></side-bar>
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
        sidebarItems:[{
          index: '/admin/message',
          iconClass: 'icon iconfont icon-jiaocheqiche',
          iconStyle: 'font-size: 30px;margin-right: 4px',
          title: '消息中心'
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

<style lang="scss" scoped>
  .btn-sidebar {
    position: relative;
    float: left;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 10px 10px 10px;
  }
</style>
