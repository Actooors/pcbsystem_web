<template>
  <div id="app" style="clear:both">
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_617648_jvrgszqer6jn61or.css">
    <m-header>
      <span @click="showSideBar" class="btn-sidebar"><i class="icon iconfont icon-category"></i></span>
    </m-header>
    <sidebar :ifshow="ifShowSideBar" @on-show-state-changed="_onSideBarStateChanged"></sidebar>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
  import MHeader from "components/m-header/m-header"
  import Sidebar from "components/sidebar/sidebar"
  import PassengerInfo from "components/passengerinfo/passengerinfo"

  export default {
    name: 'App',
    components: {
      Sidebar,
      MHeader,
      PassengerInfo
    },
    data() {
      return {
        ifShowSideBar: false
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
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .btn-sidebar {
    position: relative;
    float: left;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 10px 10px 10px;
  }

  .main{
    position: relative;
  }

</style>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  /*@import '~vux/src/styles/1px.less';*/
</style>
