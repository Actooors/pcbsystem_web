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
        page-size="2"
        :current-page="pageNo"
        :total="parseInt(totalcars)">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        totalcars: 20,
        pageNo: 1,
        cars: [
          {date: '2018年4月5日', license: '沪A-11111'},
          {date: '2018年4月6日', license: '沪A-22222'},
          {date: '2018年4月7日', license: '沪A-33333'},
          {date: '2018年4月8日', license: '沪A-44444'},
          {date: '2018年4月9日', license: '沪A-55555'},
          {date: '2018年4月10日', license: '沪A-66666'},
          {date: '2018年4月11日', license: '沪A-77777'},
          {date: '2018年4月12日', license: '沪A-88888'},
          {date: '2018年4月13日', license: '沪A-99999'},
          {date: '2018年4月14日', license: '沪A-00000'},
          {date: '2018年4月5日', license: '沪A-11111'},
          {date: '2018年4月6日', license: '沪A-22222'},
          {date: '2018年4月7日', license: '沪A-33333'},
          {date: '2018年4月8日', license: '沪A-44444'},
          {date: '2018年4月9日', license: '沪A-55555'},
          {date: '2018年4月10日', license: '沪A-66666'},
          {date: '2018年4月11日', license: '沪A-77777'},
          {date: '2018年4月12日', license: '沪A-88888'},
          {date: '2018年4月13日', license: '沪A-99999'},
          {date: '2018年4月14日', license: '沪A-00000'},
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
