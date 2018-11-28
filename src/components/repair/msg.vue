<template>
  <div>
    <div>
      <form-preview header-label="状态" v-for="(item,index) of items"
                    :header-value="stateMap(item.status)"
                    :body-items="lists[index]"
                    :class="{'history-form-red':item.status===4,
                             'progressing-form-yellow':item.status===1,
                             'applying-form-green':item.status===3,
                            }"
                    :footer-buttons="buttonMap(item.status)"
                    :key="item.value"></form-preview>
    </div>
    <div class="block" style="margin-top: 50px; margin-bottom: 100px">
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
  import {FormPreview, AlertPlugin} from 'vux'
  import Vue from 'vue'
  import axios from 'axios'

  Vue.use(AlertPlugin)

  export default {
    name: "msg",
    components: {
      FormPreview,
      AlertPlugin
    },
    data() {
      return {
        total: 0,
        pageNo: 1,
        pageSize: 10,
        items: [],
        lists: []
      }
    },
    methods: {
      handlePrevClick() {
        console.log("点击上一页")
        this.pageNo--;
        this.initData(this.pageNo)
      },
      handleNextClick() {
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
          url: 'http://192.168.50.223:8081/api/driver/query/carRequest',
          method: 'post',
          data: {
            "page": page
          }
        }).then((res) => {
          if (res.data.code === 'SUCCESS') {
            console.log(res.data.data);
            this.items = res.data.data.requestInfo
            this.total = res.data.data.total
            for (let i = 0; i < this.items.length; i++) {
              let list = [
                {
                  label: '申请人',
                  value: localStorage.getItem('userName')
                },
                {
                  label: '报修原因',
                  value: this.items[i].reason
                },
                {
                  label: '车辆牌照',
                  value: this.items[i].licence
                },
                {
                  label: '申请时间',
                  value: this.items[i].time
                }
              ]
              this.lists.push(list)
            }
            loading.close()
          } else {
            this.$notify.error({
              message: res.data.message
            });
            loading.close()
          }
        }).catch((err) => {
          console.log("err")
          this.$notify.error({
            message: err
          });
          loading.close()
        })
      },
      RecoveryCar() {
        this.$vux.alert.show({
          title: '恭喜！',
          content: '现在开始可以继续用车了！'
        })
        this.SuccessButtons = null
      },
      stateMap(requestState) {
        if (requestState === 1) {
          return '正在审核'
        } else if (requestState === 2) {
          return '已取消'
        }
        else if (requestState === 3) {
          return '成功'
        } else if (requestState === 4) {
          return '失败'
        } else if (requestState === 5) {
          return '维修成功'
        } else {
          return "未知状态"
        }
      },
      buttonMap(status) {
        if (status === 3) {
          return [{
            style: 'primary',
            text: '点击恢复用车',
            onButtonClick: this.RecoveryCar
          }]
        } else {
          return ''
        }
      }
    },
    created() {
      this.initData(1)
    }
  }
</script>


<style>
  .history-form-red {
    margin: 20px auto;
  }

  .history-form-red:hover {
    box-shadow: 1px 1px 100px #e64a47;
  }

  .history-form-red .weui-form-preview__hd .weui-form-preview__value {
    color: red;
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

  @media screen and (min-width: 1024px) {
    .history-form-red {
      margin: 20px auto;
      width: 40%;
    }

    .progressing-form-yellow {
      margin: 20px auto !important;
      width: 40%;
    }

    .applying-form-green {
      margin: 20px auto !important;
      width: 40%;
    }
  }
</style>
