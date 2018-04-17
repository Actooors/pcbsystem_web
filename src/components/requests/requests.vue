<template>
  <div>
    <form-preview :head-label="$t(申请状态)" head-value="未通过" :body-items="list"
                  :footer-buttons="button"></form-preview>
  </div>
</template>
<script>
  import {FormPreview} from 'vux'

  export default {
    name: "requests",
    components: {
      FormPreview
    },
    data() {
      return {
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
          }
        ],
        buttons: [
          {
            style: 'primary',
            text: '接受申请'
          },
          {
            style: 'default',
            text: '拒绝申请'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
