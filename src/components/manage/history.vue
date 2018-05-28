<template>
  <div class="root">
    <div>
      <form-preview header-label="预约状态" v-for="(item,index) of items" :header-value="stateMap(item.type,item.pass)"
                    :body-items="item"
                    :class="item.pass===0?'history-form-red':'history-form-green'"
                    :key="item.value"></form-preview>
    </div>

    <div class="block" style="margin: 50px auto">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="items.length">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {FormPreview} from 'vux'
  import axios from 'axios'

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
        items: []
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.pageNo = val;
      },
      handleSizeChange(val) {
        this.totalcars = val;
      },
      currentPage(val) {
        this.pageNo = val;
      },
      initData() {
        axios({
          url: '//localhost:8081/api/passenger/query/request',
          method: 'post',
          data: {
            "page": this.pageNo,
            "type": 3
          }
        }).then((response) => {
          if (response.data.code === 'SUCCESS') {
            this.items = response.data.data
          } else {
            console.log(response.data.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      stateMap(type, pass) {
        if (type === 1 && pass === 0) {
          return '正在申请'
        } else if (item.type === 2 && pass === 1) {
          return '正在进行'
        }
        else if (item.type === 3 && pass === 1) {
          return '已经结束'
        } else if (item.type === 4) {
          return '申请失败'
        } else {
          return '未知状态'
        }
      }
    },
    created() {
      this.initData()
    }

  }
</script>

<style scoped>
  @import url('../../common/css/history.css');
</style>

<style>
  .history-form-red {
    margin: 20px auto;
  }

  .history-form-red:hover {
    box-shadow: 1px 1px 100px #e64a47;
  }

  .history-form-green {
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
