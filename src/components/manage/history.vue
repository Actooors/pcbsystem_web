<template>
  <div class="root">
    <div>
      <form-preview header-label="预约状态" v-for="(item,index) of items"
                    :header-value="stateMap(item.pass)"
                    :body-items="lists[index]"
                    :class="{'history-form-red':item.pass===4,
                  'history-form-green':item.pass===3,
                  'progressing-form-yellow':item.pass===2,
                  'applying-form-green':item.pass===1,
                  }"
                    :key="item.value"
                    ></form-preview>
    </div>

    <div class="block" style="margin: 50px auto">
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
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
        total: 0,
        pageNo: 1,
        pageSize: 10,
        items: [],
        lists: [],
      }
    },
    methods: {
      handlePrevClick(){
        console.log("点击上一页")
        this.pageNo--;
        this.initData(this.pageNo)
      },
      handleNextClick(){
        console.log("点击下一页")
        this.pageNo++;
        this.initData(this.pageNo)
      },
      initData(page) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios({
          url: 'http://172.20.10.2:8081/api/passenger/query/request',
          method: 'post',
          data: {
            "page": page,
            "type": 3
          }
        }).then((response) => {
          if (response.data.code === 'SUCCESS') {
            console.log(response.data.data)
            this.items = response.data.data.requestInfo
            this.total = response.data.data.total
            for (let i = 0; i < this.items.length; i++) {
              let list = [
                {
                  label: '申请人',
                  value: localStorage.getItem('userName')
                },
                {
                  label: '起始时间',
                  value: this.items[i].startDate
                },
                {
                  label: '结束时间',
                  value: this.items[i].endDate
                },
                {
                  label: '车辆牌照',
                  value: this.items[i].licence
                }
              ]
              this.lists.push(list)
            }
            loading.close()
          } else {
            console.log(response.data.message)
            loading.close()
          }
        }).catch((error) => {
          console.log(error)
          loading.close()
        })
      },
      stateMap(requestState) {
        if (requestState === 1) {
          return '正在申请'
        } else if (requestState === 2) {
          return '正在进行'
        }
        else if (requestState === 3) {
          return '已经结束'
        } else if (requestState === 4) {
          return '申请失败'
        } else {
          return '未知状态'
        }
      }
    },
    created() {
      this.initData(1)
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
