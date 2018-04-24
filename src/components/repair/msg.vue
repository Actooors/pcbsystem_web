<template>
  <div>
    <form-preview header-label="审核结果" v-for="(item,index) of items" :header-value="item.state" :body-items="item.list"
                  :class="item.state==='失败'?'history-form-red':'history-form-green'"
                  :footer-buttons="item.state==='失败'?buttons:null"
                  :key="item.value"></form-preview>
  </div>
</template>

<script>
  import {FormPreview, AlertPlugin} from 'vux'
  import Vue from 'vue'

  Vue.use(AlertPlugin)

  export default {
    name: "msg",
    components: {
      FormPreview,
      AlertPlugin
    },
    data() {
      return {
        items: [
          {
            state: "成功",
            list: [
              {
                label: '申请人',
                value: '李瑞轩'
              },
              {
                label: '报修原因',
                value: '常规性保养'
              },
              {
                label: '车辆牌照',
                value: '沪A-11111'
              },
              {
                label: '申请时间',
                value: '2018-04-18　08:00'
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
                label: '报修原因',
                value: '其他'
              },
              {
                label: '车辆牌照',
                value: '沪B-12345'
              },
              {
                label: '申请时间',
                value: '2018-04-18　19:00'
              }
            ]
          }
        ],
        buttons: [{
          style: 'default',
          text: '查看失败原因',
          onButtonClick: this.SeeReason
        }]
      }
    },
    methods: {
      SeeReason() {
        this.$vux.alert.show({
          title: '失败原因',
          content: '李瑞轩太帅了！！'
        })
      }
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 1025px) {
    .history-form-red {
      width: 40%;
    }

    .history-form-green {
      width: 40%;
    }
  }
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
