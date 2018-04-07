<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="资料设置" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="账号设置" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="邮件设置" name="third">角色管理</el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: "personalinfo",
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>

</style>
