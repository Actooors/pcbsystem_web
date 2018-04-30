<template>
  <div>
    <form-preview header-label="状态" v-for="(item,index) of items" :header-value="item.state" :body-items="item.list"
                  :class="item.state==='正在进行'?'requests-form-yellow':null"
                  :key="item.value"></form-preview>
  </div>
</template>

<script>
  import {FormPreview} from 'vux'

  export default {
    name: "progresss",
    components: {
      FormPreview
    },
    data() {
      return {
        items: [
          {
            state: "正在进行",
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
          }
        ]
      }
    }
  }
</script>

<style scope>
  .requests-form-yellow {
    width: 100%;
    margin: 20px auto;
  }

  .requests-form-yellow:hover {
    box-shadow: 1px 1px 100px yellow;
  }

  .requests-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #d4bb00;
  }
</style>

<style>
  @media screen and (min-width: 1025px) {
    .requests-form-yellow {
      width: 40%;
    }
  }
</style>
