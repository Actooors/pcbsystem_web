<template>
  <div>
    <form-preview header-label="预约状态" v-for="(item,index) of items" :header-value="item.state" :body-items="item.list"
                  :class="item.state==='正在进行'?'progressing-form-yellow':null"
                  :key="item.value"></form-preview>
  </div>
</template>

<script>
  import {FormPreview} from 'vux'

  export default {
    name: "progressing",
    components: {
      FormPreview
    },
    data() {
      return {
        items: [
          {
            state: "正在进行",
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
          },
          {
            state: "正在进行",
            list: [
              {
                label: '申请人',
                value: '殷子良'
              },
              {
                label: '起始时间',
                value: '2018-04-20　08:00'
              },
              {
                label: '结束时间',
                value: '2018-04-21　08:00'
              },
              {
                label: '车辆牌照',
                value: '沪B-12345'
              }
            ],
          }
        ]
      }
    }
  }
</script>

<style>
  .progressing-form-yellow {
    width: 100%;
    margin: 20px auto;
  }

  .progressing-form-yellow:hover {
    box-shadow: 1px 1px 100px yellow;
  }

  .progressing-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #d4bb00;
  }
</style>

<style scoped>
  @media screen and (min-width: 1025px) {
    .progressing-form-yellow {
      width: 40%;
    }
  }
</style>
