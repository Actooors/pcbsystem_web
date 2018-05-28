<template>
  <div>
    <div>
      <form-preview header-label="预约状态" v-for="(item,index) of items"
                    :header-value="stateMap(item.requestState,item.pass)"
                    :body-items="lists[index]"
                    :class="{'history-form-red':item.requestState===4,
                  'history-form-green':item.requestState===3,
                  'progressing-form-yellow':item.requestState===2,
                  'applying-form-green':item.requestState===1,
                  }"
                    :key="item.value"></form-preview>
    </div>
    <div class="block" style="margin-top: 50px; margin-bottom: 100px">
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
  import {FormPreview, Scroller} from 'vux'
  import axios from 'axios'

  export default {
    name: "all",
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
          url: '//localhost:8081/api/passenger/query/request',
          method: 'post',
          data: {
            "page": this.pageNo,
            "type": 0
          }
        }).then((response) => {
          if (response.data.code === 'SUCCESS') {
            this.items = response.data.data
            for (let i = 0; i < this.items.length; i++) {
              let list = [
                {
                  label: '申请人',
                  value: localStorage.getItem('userName')
                },
                {
                  label: '起始时间',
                  value: this.items[i].beginTime
                },
                {
                  label: '结束时间',
                  value: this.items[i].endTime
                },
                {
                  label: '车辆牌照',
                  value: this.items[i].carNumber
                }
              ]
              this.lists.push(list)
            }

          } else {
            console.log(response.data.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      stateMap(requestState, pass) {
        // if (requestState === 1 && pass === 0) {
        //   return '正在申请'
        // } else if (requestState === 2 && pass === 1) {
        //   return '正在进行'
        // }
        // else if (requestState === 3 && pass === 1) {
        //   return '已经结束'
        // } else if (requestState === 4) {
        //   return '申请失败'
        // } else {
        //   return '未知状态'
        // }
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
      this.initData()
    },
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        items: [
          {
            "avatar": "string",
            "capacity": "string",
            "cid": 0,
            "driverPhone": "string",
            "endDate": 0,
            "id": 0,
            "licence": "string",
            "model": "string",
            "owner": "string",
            "pass": "string",
            "place": "string",
            "reason": "string",
            "startDate": 0,
            "userId": "string",
            "userName": "string"
          }
        ],
        lists: [],
        list: [
          {
            label: '申请人',
            value: '李瑞轩'
          },
          {
            label: '起始时间',
            value: '2018-04-17　08:00'
          },
          {
            label: '结束时间',
            value: '2018-04-18　08:00'
          },
          {
            label: '车辆牌照',
            value: '沪A-11111'
          }
        ]
      }
    }
  }
</script>

<style>
  html body {
    /*overflow-y: hidden;*/
  }

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

  .progressing-form-yellow {
    margin: 20px auto;
  }

  .progressing-form-yellow:hover {
    box-shadow: 1px 1px 100px yellow;
  }

  .progressing-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #d4bb00;
  }

  .applying-form-green {
    margin: 20px auto;
  }

  .applying-form-green:hover {
    box-shadow: 1px 1px 100px #07e629;
  }

  .applying-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: green;
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
