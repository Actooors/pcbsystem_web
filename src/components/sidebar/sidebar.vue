<template>
  <transition name="el-zoom-in-left">
    <div class="wrapper fullscreen" v-show="ifShowSideBar">
      <div class="absolute-fullscreen" @click="showSideBar" style="background-color: black; opacity: 0.2"></div>
      <div class="sidebar" ref="sidebar">
        <div class="personinfo" ref="personinfo">
          <div class="avatar" ref="avatar">
            <img v-lazy="photoURL">
          </div>
          <div class="info">
            <div class="username" v-text="uName"></div>
            <div class="userid" v-text="uId"></div>
          </div>
          <div class="logout">
            <el-button size="mini" type="primary" plain>注销</el-button>
          </div>
        </div>
        <div class="menu">
          <el-menu :router=true @select="showSideBar"><!--default-active=""-->
            <el-menu-item v-for="item of items" :index="item.index" :key="item.value">
              <i :class="item.iconClass" :style="item.iconStyle"></i>
              <span slot="title" v-text="item.title"></span>
            </el-menu-item>
            <!--<el-menu-item index="booking">-->
              <!--<i class="icon iconfont icon-jiaocheqiche" style="font-size: 30px;margin-right: 4px;"></i>-->
              <!--<span slot="title">公车预约</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="2">-->
              <!--<i class="icon iconfont icon-yuding" style="font-size: 24px;margin-right: 8px;"></i>-->
              <!--<span slot="title">预约管理</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="history">-->
              <!--<i class="el-icon-document" style="font-size: 24px;margin-right: 8px;"></i>-->
              <!--<span slot="title">预约历史</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="info">-->
              <!--<i class="el-icon-setting" style="font-size: 24px;margin-right: 8px;"></i>-->
              <!--<span slot="title">个人信息</span>-->
            <!--</el-menu-item>-->
          </el-menu>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  import store from 'store/store'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "sidebar",
    store,
    props: {
      ifshow: {
        type: Boolean,
        default: false
      },
      items:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        ifShowSideBar: this.ifshow
      }
    },
    computed: mapState(['uName', 'uId', 'photoURL']),
    watch: {
      ifshow(val) {
        this.ifShowSideBar = val
      },
      ifShowSideBar(val) {
        this.$emit('on-show-state-changed', val)
      }
    },
    methods: {
      ...mapMutations,
      showSideBar() {
        this.ifShowSideBar = !this.ifShowSideBar
      },
    }
  }

</script>

<style scoped>
  @import url('../../common/css/sidebar.css');
</style>

<style>
  .sidebar .el-menu{
    border-right: 0;
  }
</style>
