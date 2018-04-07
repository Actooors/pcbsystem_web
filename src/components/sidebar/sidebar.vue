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
          <el-menu default-active="1" class="el-menu-vertical-demo1" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1">
              <i class="icon iconfont icon-jiaocheqiche" style="font-size: 30px;margin-right: 4px;"></i>
              <span slot="title">公车预约</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="icon iconfont icon-yuding" style="font-size: 24px;margin-right: 8px;"></i>
              <span slot="title">预约管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document" style="font-size: 24px;margin-right: 8px;"></i>
              <span slot="title">预约历史</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting" style="font-size: 24px;margin-right: 8px;"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
          </el-menu>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
  import store from 'store/store'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "sidebar",
    store,
    props: {
      ifshow: {
        type: Boolean,
        default: false
      },
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
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      showSideBar() {
        this.ifShowSideBar = !this.ifShowSideBar
      },
    }
  }

</script>

<style scoped>
  @import url('../../common/css/sidebar.css');
</style>
