<template>
  <div class="m-header">
    <!--<button class="icon iconfont icon-category" @click="showSideBar"></button>-->
    <slot></slot>
    <div class="text" v-text="title"></div>
  </div>
</template>

<script>
  export default {
    name: "m-header",
    props: {
      title: {
        type: String,
        default: '公车预约系统'
      }
    }
  }
</script>

<style scoped>
  .m-header {
    position: relative;
    height: 44px;
    width: 100%;
    border-bottom: 1px solid #DCDFE6;
    color: #fff;
    font-size: 0;
    background-color: #409EFF;
  }

  .text {
    position: relative;
    display: inline-flex;
    vertical-align: top;
    line-height: 44px;
    font-size: 20px;
    left: -15px;
  }

  .logout {
    position: relative;

  }
</style>

