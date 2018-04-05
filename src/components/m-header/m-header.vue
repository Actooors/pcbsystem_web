<template>
  <div class="m-header">
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_617648_8shs54c7gbymn29.css">
    <!--<button class="icon iconfont icon-category" @click="showSideBar"></button>-->
    <slot></slot>
    <div class="text">公车预约系统</div>
  </div>
</template>

<script>
  export default {
    name: "m-header",
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
    position:relative;
    display: inline-flex;
    vertical-align: top;
    line-height: 44px;
    font-size: 20px;
    left:-15px;
  }
</style>

