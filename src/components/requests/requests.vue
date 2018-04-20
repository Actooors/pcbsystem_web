<template>
  <div>
    <form-preview header-label="申请状态" v-for="(item,index) of items" :header-value="item.state" :body-items="list"
                  :class="item.state==='已经结束'?'requests-form-red':'requests-form-yellow'"
                  :key="item.value"></form-preview>
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
        items: [
          {
            state: "正在进行",
          },
          {
            state: "已经结束",
          }
        ],
        list:
          [
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
        // buttons: [
        //   {
        //     style: 'primary',
        //     text: '接受申请'
        //   },
        //   {
        //     style: 'default',
        //     text: '拒绝申请'
        //   }
        // ]
      }
    }
  }
</script>

<style scoped>
  @import url('../../common/css/requests.css');
</style>

<style>
  .requests-form-red{
    width: 100%;
    margin: 20px auto;

  }
  .requests-form-red:hover{
    box-shadow: 1px 1px 100px #e64a47;
  }
  .requests-form-yellow{
    width: 100%;
    margin: 20px auto;

  }
  .requests-form-yellow:hover{
    box-shadow: 1px 1px 100px #e6c737;
  }
  .requests-form-red .weui-form-preview__hd .weui-form-preview__value {
    color: red;
  }
  .requests-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #e6c737;
  }
</style>
