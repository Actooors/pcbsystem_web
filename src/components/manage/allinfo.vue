<template>
  <div>
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
    <div class="block" style="margin-top: 50px; margin-bottom: 100px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {FormPreview, Scroller} from 'vux'
  import axios from 'axios'

  export default {
    name: "all",
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        items: [],
        lists: [],
      }
    },
    components: {
      FormPreview,
      Scroller
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
          url: 'http://192.168.50.223:8081/api/passenger/query/request',
          method: 'post',
          data: {
            "page": this.pageNo,
            "type": 0
          }
        }).then((response) => {
          console.log(response.data.data)
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          if (response.data.code === 'SUCCESS') {
            this.items = response.data.data
            this.total += response.data.data.length
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
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      stateMap(requestState) {
        if (requestState === 1) {
          return '正在审核'
        } else if (requestState === 2) {
          return '已经取消'
        }
        else if (requestState === 3) {
          return '审核通过'
        } else if (requestState === 4) {
          return '申请失败'
        } else {
          return '未知状态'
        }
      }
    },
    created() {
      this.initData()
    },

  }
</script>

<style>
  html body {
    /*overflow-y: hidden;*/
  }

  .history-form-red {
    width: 40%;
    margin: 20px auto !important;
  }

  .history-form-red:hover {
    box-shadow: 1px 1px 100px #e64a47 !important;
  }

  .history-form-green {
    margin: 20px auto !important;
  }

  .history-form-green:hover {
    box-shadow: 1px 1px 100px #e64ec8 !important;
  }

  .history-form-red .weui-form-preview__hd .weui-form-preview__value {
    color: red !important;
  }

  .history-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: #e64ec8 !important;
  }

  .progressing-form-yellow {
    margin: 20px auto !important;
  }

  .progressing-form-yellow:hover {
    box-shadow: 1px 1px 100px yellow !important;
  }

  .progressing-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #d4bb00 !important;
  }

  .applying-form-green {
    margin: 20px auto !important;
  }

  .applying-form-green:hover {
    box-shadow: 1px 1px 100px #07e629 !important;
  }

  .applying-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: green !important;
  }
</style>

<style scoped>
  @media screen and (min-width: 1025px) {
    .progressing-form-yellow {
      width: 40%;
    }

    .history-form-green {
      width: 40%;
    }

    .history-form-red {
      width: 40%;
    }

    .applying-form-green {
      width: 40%;
    }
  }
</style>
