<template>
  <div class="root">
    <div>
      <form-preview header-label="申请状态" v-for="(item,index) of items" :header-value="item.state" :body-items="item.list"
                    :class="item.state==='失败'?'history-form-red':'history-form-green'"
                    :key="item.value"></form-preview>
    </div>

    <div class="block" style="margin: 50px auto">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange1"
        :current-page.sync="currentPage3"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="parseInt(totalcars)">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {FormPreview} from 'vux'

  export default {
    name: "history",
    components: {
      FormPreview
    },
    data() {
      return {
        totalcars: 3,
        pageNo: 1,
        pageSize: 10,
        items: [
          {
            state: "成功",
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
            ]
          },
          {
            state: "失败",
            list: [
              {
                label: '申请人',
                value: '殷子良'
              },
              {
                label: '起始时间',
                value: '2018-04-18　19:00'
              },
              {
                label: '结束时间',
                value: '2018-04-19　08:00'
              },
              {
                label: '车辆牌照',
                value: '沪B-12345'
              }
            ]
          }
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
    }
  }
</script>

<style scoped>
  @import url('../../common/css/history.css');
</style>

<style>
  .history-form-red {
    width: 100%;
    margin: 20px auto;

  }

  .history-form-red:hover {
    box-shadow: 1px 1px 100px #e64a47;
  }

  .history-form-green {
    width: 100%;
    margin: 20px auto;
  }

  .history-form-green:hover {
    box-shadow: 1px 1px 100px #07e629;
  }

  .history-form-red .weui-form-preview__hd .weui-form-preview__value {
    color: red;
  }

  .history-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: green;
  }
</style>
