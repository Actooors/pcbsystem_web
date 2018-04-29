<template>
  <div>
    <div class="MHeader">
      <slot></slot>
      <div class="text" v-text="title"></div>
      <img src="../../common/image/logo2.png" class="logo">
    </div>
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

<style lang="scss" scoped>
  .MHeader {
    display: flex;
    background: #255085;
    position: relative;
    height: 80px;
    .text {
      position: relative;
      line-height: 44px;
      font-size: 25px;
      margin: auto auto;
      color: #fff;
    }
    .logo{
      position: absolute;
      right: 100px;
      height: 70px;
      top:5px;
    }
  }

</style>

