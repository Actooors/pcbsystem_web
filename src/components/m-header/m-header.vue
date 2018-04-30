<template>
  <div class="MHeader-wrapper">
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
        default: '上海大学公车预约系统'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .MHeader {
    display: flex;
    background: #255085;
    position: fixed;
    width: 100%;
    z-index: 10000;
    top: 0;
    .text {
      position: relative;
      line-height: 44px;
      margin: auto auto;
      color: #fff;
    }
    .logo {
      position: absolute;
      right: 100px;
      height: 70px;
      top: 5px;
    }
  }

  @media screen and (max-width: 1023px) {
    .MHeader-wrapper {
      position: relative;
      height: 44px;
      width: 100%;
      .MHeader {
        height: 44px;
        .logo {
          display: none;
        }
        .text {
          font-size: 20px;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .MHeader-wrapper {
      position: relative;
      height: 80px;
      width: 100%;
      .MHeader {
        height: 80px;
        .text {
          font-size: 25px;
        }
      }
    }

  }
</style>

