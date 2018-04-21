<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="乘客用户">
        <div class="search">
          <el-input placeholder="搜索..." v-model="searchInput" class="input"></el-input>
        </div>
        <div class="cards">
          <el-card class="box-card" v-for="(item,index) of items" :key="item.value">
            <div slot="header" class="clearfix">
              <span v-text="item.uname"></span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
              <img v-lazy="item.avatar" class="avatar">
            </div>
          </el-card>
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
        searchInput: '',
        items: [{
          avatar: "http://xxxxx.com/xxxxx.jpg",
          uname: '莫之章',
          uid: 16121663,
          license: '沪A0001',
          model: '奥迪A8',
          capacity: 4,
          cid: 32,
        }]
      }
    },
    mounted() {
      // console.log('mounted!')
      axios.get('/api/driverinfo')
        .then((res) => {
          this.items = res.data.data
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
