<template>
  <div>
    <p class="sticky-title"
       style="top:0;z-index:1;background:white;box-shadow:0 -25px 50px 3px black;width: 100%;text-align: center;margin-bottom: 10px;color: #666;line-height:2em;">
      预约请求</p>
    <p style="width: 100%;text-align: center;">共有{{requestNumber}}条请求消息</p>
    <form-preview header-label="预约状态" v-for="(item,index) in items"
                  :header-value="stateMap(item.requestState)"
                  :body-items="lists[index]"
                  ::class="{'history-form-red':item.requestState===4,
                  'history-form-green':item.requestState===3,
                  'progressing-form-yellow':item.requestState===2,
                  'applying-form-green':item.requestState===1,
                  }"
                  :key="item.value"
                  :footer-buttons="buttons" :name="index"></form-preview>
    <confirm v-model="show1"
             hide-on-blur
             title="通过该申请，确定吗？"
             @on-cancel="onCancel(index)"
             @on-confirm="onConfirm(index)"
    >
    </confirm>
    <confirm v-model="show2"
             hide-on-blur
             title="拒绝该申请，确定吗？"
             @on-cancel="onCancel1(index)"
             @on-confirm="onConfirm1(index)"
    >
    </confirm>
  </div>
</template>

<script>
  import {FormPreview, Confirm} from 'vux'
  import stickybits from 'stickybits'
  import axios from 'axios'
  import Vue from 'vue';
  import Vuex from 'vuex'
  import store from "../../store/store";

  store
  Vue.use(Vuex)
  export default {
    name: "ReservationRequest",
    components: {
      FormPreview,
      Confirm
    },
    data() {
      return {
        show1: false,
        show2: false,
        requestNumber: 0,
        lists: [],
        items: [],
        index: null,
        buttons: [
          {
            style: 'default',
            text: '拒绝申请',
            onButtonClick: (index) => {
              console.log("拒绝申请");
              this.index = index
              this.show2 = true;
            }
          },
          {
            style: 'primary',
            text: '通过申请',
            onButtonClick: (index) => {
              this.show1 = true;
              this.index = index
              console.log("通过申请");
            }
          }
        ]
      }
    },
    mounted() {
      stickybits('.sticky-title', {useStickyClasses: true});
      this.initData();
    },
    methods: {
      onConfirm() {
        axios({
          url: 'http://118.25.130.89:8082/api/admin/check/request',
          method: 'post',
          data: {
            requestId: this.items[this.index].requestId,
            requestState: 3
          }
        }).then(res=>{
          if (res.data.code === "SUCCESS") {
            this.$message({
              type: 'success',
              message: "预约成功！"
            });
            this.show = false;
          } else {
            this.$message({
              type: 'error',
              message: "预约失败！"
            });
          }
        })
      },
      onCancel() {
        console.log("取消！");
      },
      onCancel1() {
        console.log("取消！");
      },
      onConfirm1() {
        axios({
          url: 'http://118.25.130.89:8082/api/admin/check/request',
          method: 'post',
          data: {
            requestId: this.items[this.index].requestId,
            requestState: 4
          }
        }).then(res=>{
          if (res.data.code === "SUCCESS") {
            this.$message({
              type: 'success',
              message: "预约成功！"
            });
            this.show2 = false;
          } else {
            this.$message({
              type: 'error',
              message: "发送失败！"
            });
          }
        })
      },
      stateMap(requestState) {
        if (requestState === 1) {
          return '待审核'
        } else if (requestState === 2) {
          return '已经取消'
        } else if (requestState === 3) {
          return '审核通过'
        } else if (requestState === 4) {
          return '申请失败'
        } else {
          return '未知状态'
        }
      },
      initData() {
        console.log("传进来车辆的ID是" + store.state.carId)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios({
          url: 'http://118.25.130.89:8082/api/admin/query/car/request',
          method: 'get',
          params: {
            "carId": store.state.carId
          }
        }).then((res) => {
          if (res.data.code === 'SUCCESS') {
            console.log(res.data.data);
            this.items = res.data.data
            this.requestNumber = res.data.data.length;
            console.log(this.requestNumber)
            for (let i = 0; i < this.items.length; i++) {
              let list = [
                {
                  label: '申请人学号',
                  value: this.items[i].passengerId
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
                  label: '上车地点',
                  value: this.items[i].place
                },
                {
                  label: '用车原因',
                  value: this.items[i].requestReason
                }
              ]
              this.lists.push(list)
            }
          } else {
            this.$notify.error({
              message: response.data.message
            });
          }
          loading.close()
        });
      },
    },
//    created() {
//      this.initData()
//    }
  }
</script>

<style>

  .progressing-form-yellow {
    width: 100%;
    margin: 20px auto;
  }

  .progressing-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #d4bb00;
  }

  .applying-form-green .weui-form-preview__value {
    color: green;
  }

  .weui-form-preview__hd .weui-form-preview__label {
    color: black;
  }

  .weui-form-preview__bd .weui-form-preview__label {
    color: black;
  }

  .weui-form-preview__bd .weui-form-preview__value {
    color: black;
  }

  .weui-dialog {
    width: 400px;
  }

  @media screen and (min-width: 1024px) {
    .weui-dialog {
      width: 400px;
    }

    .weui-dialog > :first-child {
      max-height: 600px;
      overflow-y: auto;
    }

    .weui-dialog__hd {
      height: 100px !important;
    }
  }

  @media screen and (max-width: 1023px) {
    .weui-dialog {
      width: 330px;
    }

    .weui-dialog > :first-child {
      max-height: 500px;
      overflow-y: auto;
    }

    .weui-dialog__hd {
      height: 90px !important;
    }
  }

</style>
