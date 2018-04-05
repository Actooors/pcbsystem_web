<template>
  <transition name="el-zoom-in-left">
    <div class="fullscreen" v-show="ifShowSideBar">
      <div class="fullscreen" @click="showSideBar"></div><!--style="background-color: black; opacity: 0.2"-->
      <div class="sidebar">
        <h5>菜单</h5>
        <el-menu default-active="2" class="el-menu-vertical-demo1" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>

    </div>
  </transition>
</template>

<script>
  export default {
    name: "sidebar",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      showSideBar() {
        this.ifShowSideBar = !this.ifShowSideBar
      }
    },
    props: {
      ifshow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        ifShowSideBar: this.ifshow
      }
    },
    watch: {
      ifshow(val) {
        this.ifShowSideBar = val
      },
      ifShowSideBar(val) {
        this.$emit('on-show-state-changed', val)
      }
    }
  }
</script>

<style scoped>
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .sidebar {
    position: fixed;
    left: 0;
    background-color: #fff;
    min-width: 200px;
    width: 50%;
    height: 100%;
    border-right: 1px solid #DCDFE6;
    float: left;
  }
</style>
