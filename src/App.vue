<template>
  <div id="app" style="clear:both">
    <passenger></passenger>
  </div>
</template>

<script>
  import Passenger from 'group/passenger'

  export default {
    name: 'App',
    components: {
      Passenger
    }

  }
</script>

<style>

  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


</style>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  /*@import '~vux/src/styles/1px.less';*/
</style>
