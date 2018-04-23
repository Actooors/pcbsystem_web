<template>
  <div>
    <form-preview header-label="申请状态" v-for="(item,index) of items" :header-value="item.state" :body-items="item.list"
                  :class="item.state==='正在申请'?'applying-form-green':null"
                  :key="item.value"></form-preview>
  </div>
</template>

<script>
  import {FormPreview} from 'vux'

  export default {
    name: "applying",
    components: {
      FormPreview
    },
    data() {
      return {
        items: [
          {
            state: "正在申请",
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
            state: "正在申请",
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
        ],

      }
    }
  }
</script>


<style>
  .applying-form-green {
    width: 100%;
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
    .applying-form-red {
      width: 40%;
    }

    .applying-form-green {
      width: 40%;
    }
  }
</style>

