<template>
  <div class="root-wrapper">
    <m-header>
      <span @click="showSideBar" class="btn-sidebar"><i class="icon iconfont icon-category" v-if="media===0"></i></span>
    </m-header>
    <side-bar :value=true :items="sidebarItems" :overlay=false v-if="media===1"></side-bar>
    <side-bar v-model="ifShowSideBar" :items="sidebarItems" v-else></side-bar>
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
        media: 0,
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
    },
    created(){
      this.media = document.body.clientWidth >= 1024 ? 1 : 0
    },
    mounted() {
      var timer = null
      window.onresize = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.media = document.body.clientWidth >= 1024 ? 1 : 0
          console.log(this.media)
        }, 200)
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
