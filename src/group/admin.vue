<template>
  <div class="root-wrapper">
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import SideBar from 'base/sidebar/sidebar'

  export default {
    name: "admin",
    components:{
      SideBar
    }
  }
</script>

<style scoped>

</style>
