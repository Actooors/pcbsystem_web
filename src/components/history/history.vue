<template>
  <div class="card" >
    <el-card class="box-card" v-for="car in cars" :key="car.value">
      <div slot="header" class="clearfix">
        <span class="card_name">{{car.date}}</span>
      </div>
      <div class="text_item">
          预约公车 {{car.license}}
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return {
            cars: [
                {date:'2018年4月5日',license:'沪A-11111'},
                {date:'2018年4月6日',license:'沪A-22222'},
                {date:'2018年4月7日',license:'沪A-33333'},
                {date:'2018年4月8日',license:'沪A-44444'},
                {date:'2018年4月9日',license:'沪A-55555'},
              ]
          }
        }
    }
</script>

<style scoped>
  @import url('../../common/css/history.css');
</style>
