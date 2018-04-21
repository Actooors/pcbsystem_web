<template>
  <transition name="el-zoom-in-left">
    <div class="wrapper fullscreen" v-show="value">
      <div class="absolute-fullscreen" v-if="overlay" @click="showSideBar" style="background-color: black; opacity: 0.2"></div>
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
          <el-menu :router=true @select="showSideBar" :default-active="activeIndex"><!--default-active=""-->
            <el-menu-item v-for="item of items" :index="item.index" :key="item.value">
              <i :class="item.iconClass" :style="item.iconStyle"></i>
              <span slot="title" v-text="item.title"></span>
            </el-menu-item>
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
      value: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default() {
          return []
        }
      },
      overlay: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        activeIndex: ''
      }
    },
    computed: {
      ...mapState(['uName', 'uId', 'photoURL']),
    },
    methods: {
      ...mapMutations,
      showSideBar() {
        this.$emit('input', !this.value)
      },
    },
    mounted() {
      //index为前2级
      this.activeIndex = this.$router.currentRoute.path.split('/').filter((x, index) => {
        return index <= 2
      }).join('/')
      // console.log(this.activeIndex)
    }
  }

</script>

<style scoped>
  @import url('../../common/css/sidebar.css');
</style>

<style>
  .sidebar .el-menu {
    border-right: 0;
  }
</style>
