<template>
  <div class="root">
    <div>
      <form-preview header-label="申请状态" v-for="(item,index) of items" :header-value="item.state" :body-items="list"
                    :class="item.state==='失败'?'requests-form-red':'requests-form-green'"
                    :key="item.value"></form-preview>
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
  </div>
</template>

<script>
  import {Tabbar, TabbarItem, FormPreview} from 'vux'

  export default {
    name: "history",
    components: {
      Tabbar,
      TabbarItem,
      FormPreview
    },
    data() {
      return {
        totalcars: 3,
        pageNo: 1,
        items: [
          {
            state: "成功",
          },
          {
            state: "失败",
          }
        ],
        list: [
          {
            label: '申请人',
            value: '李瑞轩'
          },
          {
            label: '起始时间',
            value: '2018-04-18　08:00'
          },
          {
            label: '结束时间',
            value: '2018-04-19　08:00'
          },
          {
            label: '车辆牌照',
            value: '沪A-11111'
          }
        ],
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
    props: {
      pageSize: {
        type: Number
      }
    }
  }
</script>

<style scoped>
  @import url('../../common/css/history.css');
</style>

<style>
  .requests-form-red{
    width: 100%;
    margin: 20px auto;

  }
  .requests-form-red:hover{
    box-shadow: 1px 1px 100px #e64a47;
  }
  .requests-form-green{
    width: 100%;
    margin: 20px auto;

  }
  .requests-form-green:hover{
    box-shadow: 1px 1px 100px #07e629;
  }
  .requests-form-red .weui-form-preview__hd .weui-form-preview__value {
    color: red;
  }
  .requests-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: green;
  }
</style>
