<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="乘客用户">
        <div class="search">
          <el-input placeholder="搜索..." v-model="searchInput" class="input"></el-input>

        </div>
      </el-tab-pane>
      <el-tab-pane label="司机用户">
        <div class="search">
          <el-input placeholder="搜索..." v-model="searchInput" class="input"></el-input>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: "usermanagement",
    components: {},
    data() {
      return {
        searchInput: ''
      }
    },
    mounted() {
      // console.log('mounted!')
      axios.get('/api/retrieval')
        .then((res) => {
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/usermanagement';
</style>
