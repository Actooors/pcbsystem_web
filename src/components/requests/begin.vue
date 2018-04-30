<template>
  <div>
    <form-preview header-label="状态" v-for="(item,index) of items" :header-value="item.state" :body-items="item.list"
                  :class="item.state==='即将开始'?'requests-form-green':null"
                  :key="item.value"></form-preview>
  </div>
</template>

<script>
  import {FormPreview} from 'vux'

  export default {
    name: "begin",
    components: {
      FormPreview
    },
    data() {
      return {
        items: [
          {
            state: "即将开始",
            list:
              [
                {
                  label: '申请人',
                  value: '李瑞轩'
                },
                {
                  label: '上车地点',
                  value: '行政楼'
                },
                {
                  label: '联系方式',
                  value: '18109171575'
                },
                {
                  label: '起始时间',
                  value: '2018-04-18　08:00'
                },
                {
                  label: '结束时间',
                  value: '2018-04-19　08:00'
                }
              ]
          },
          {
            state: "即将开始",
            list:
              [
                {
                  label: '申请人',
                  value: '殷子良'
                },
                {
                  label: '上车地点',
                  value: '北门'
                },
                {
                  label: '联系方式',
                  value: '18916999181'
                },
                {
                  label: '起始时间',
                  value: '2018-04-18　08:00'
                },
                {
                  label: '结束时间',
                  value: '2018-04-19　08:00'
                }
              ]
          }
        ],
      }
    }
  }
</script>

<style scope>
  .requests-form-green {
    width: 100%;
    margin: 20px auto;
  }

  .requests-form-green:hover {
    box-shadow: 1px 1px 100px #07e629;
  }

  .requests-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: green;
  }
</style>

<style>
  @media screen and (min-width: 1025px) {
    .requests-form-green {
      width: 40%;
    }
  }
</style>
