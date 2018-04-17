<template>
  <div class="root">
    <div class="card">
      <el-card class="box-card" v-for="car in cars" :key="car.value">
        <div slot="header" class="clearfix">
          <span class="card_name">{{car.date}}</span>
        </div>
        <div class="text_item">
          预约公车 {{car.license}}
        </div>
      </el-card>
    </div>
    <div class="block" style="margin: 50px auto">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange1"
        :current-page.sync="currentPage3"
        layout="prev, pager, next"
        page-size="10"
        :current-page="pageNo"
        :total="parseInt(totalcars)">
      </el-pagination>
    </div>
      <tabbar>
        <tabbar-item show-dot>
          <img slot="icon" src="../../common/image/icon_nav_msg.png">
          <span slot="label">正在进行</span>
        </tabbar-item>
        <tabbar-item badge="2">
          <img slot="icon" src="../../common/image/icon_nav_article.png">
          <span slot="label">正在申请</span>
        </tabbar-item>
        <tabbar-item badge="99+" link="/components/history/history">
          <img slot="icon" src="../../common/image/icon_nav_cell.png">
          <span slot="label">预约历史</span>
        </tabbar-item>
      </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  export default {
    name: "history",
    data() {
      return {
        totalcars: 3,
        pageNo: 1,
        components: {
          Tabbar,
          TabbarItem
        },
        cars: [
          {date: '2018年4月5日', license: '沪A-11111'},
          {date: '2018年4月6日', license: '沪A-22222'},
          {date: '2018年4月7日', license: '沪A-33333'}

        ]
      }
    },
    methods: {
      handleCurrentChange1(val) {
        this.pageNo = val;
      },
      handleSizeChange(val) {
        this.totalcars = val;
      },
      currentPage3(val) {
        this.pageNo = val;
      },
    },
    props:{
      pageSize:{
        type: Number
      }
    }
  }
</script>

<style scoped>
  @import url('../../common/css/history.css');
</style>
