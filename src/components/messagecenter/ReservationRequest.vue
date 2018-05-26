<template>
  <div>
    <p style="width: 100%;text-align: center;margin-bottom: 10px;color: #666">预约请求</p>
    <p style="width: 100%;text-align: center;">共有{{requestNumber}}条请求消息</p>
    <form-preview header-label="预约状态" v-for="(item,index) in itemsProgress" :header-value="item.state"
                  :body-items="item.list"
                  :class="item.state==='正在进行'?'progressing-form-yellow':null"
                  :key="item.value"
                  :footer-buttons="buttons"></form-preview>
  </div>
</template>

<script>
  import {FormPreview} from 'vux'

  export default {
    name: "ReservationRequest",
    components: {
      FormPreview,
    },
    data() {
      return {
        requestNumber: 5,
        itemsProgress: [
          {
            state: "正在进行",
            list: [
              {
                label: "乘客姓名",
                value: "喜羊羊"
              },
              {
                label: "乘客联系方式",
                value: "18100000000"
              },
              {
                label: "上车地点",
                value: "北门"
              },
              {
                label: "起始时间",
                value: "2018-04-18 08:00"
              },
              {
                label: "结束时间",
                value: "2018-04-19 08:00"
              },
              {
                label: "预约原因",
                value: "外出游玩"
              }
            ]
          },
          {
            state: "正在进行",
            list: [
              {
                label: "乘客姓名",
                value: "灰太狼"
              },
              {
                label: "乘客联系方式",
                value: "18011111111"
              },
              {
                label: "上车地点",
                value: "行政楼"
              },
              {
                label: "起始时间",
                value: "2018-04-18 08:00"
              },
              {
                label: "结束时间",
                value: "2018-04-19 08:00"
              },
              {
                label: "预约原因",
                value: "前往羊村"
              }
            ]
          },
          {
            state: "正在进行",
            list: [
              {
                label: "乘客姓名",
                value: "灰太狼"
              },
              {
                label: "乘客联系方式",
                value: "18011111111"
              },
              {
                label: "上车地点",
                value: "行政楼"
              },
              {
                label: "起始时间",
                value: "2018-04-18 08:00"
              },
              {
                label: "结束时间",
                value: "2018-04-19 08:00"
              },
              {
                label: "预约原因",
                value: "前往羊村"
              }
            ]
          },
          {
            state: "正在进行",
            list: [
              {
                label: "乘客姓名",
                value: "灰太狼"
              },
              {
                label: "乘客联系方式",
                value: "18011111111"
              },
              {
                label: "上车地点",
                value: "行政楼"
              },
              {
                label: "起始时间",
                value: "2018-04-18 08:00"
              },
              {
                label: "结束时间",
                value: "2018-04-19 08:00"
              },
              {
                label: "预约原因",
                value: "前往羊村"
              }
            ]
          },
          {
            state: "正在进行",
            list: [
              {
                label: "乘客姓名",
                value: "灰太狼"
              },
              {
                label: "乘客联系方式",
                value: "18011111111"
              },
              {
                label: "上车地点",
                value: "行政楼"
              },
              {
                label: "起始时间",
                value: "2018-04-18 08:00"
              },
              {
                label: "结束时间",
                value: "2018-04-19 08:00"
              },
              {
                label: "预约原因",
                value: "前往羊村"
              }
            ]
          },
        ],
        buttons:[
          {
            style: 'default',
            text: '拒绝申请',
            onButtonClick:()=>{
              console.log("拒绝申请");
            }
          },
          {
            style: 'primary',
            text: '通过申请',
            onButtonClick:()=>{
              console.log("通过申请");
            }
          }
        ]
      }
    },
  }
</script>

<style>
  .flexbox{
    width: 80%;
    margin: 0 auto;
  }
  .progressing-form-yellow {
    width: 100%;
    margin: 20px auto;
    box-shadow: 1px 0px 1px #484848;
  }

  .progressing-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #d4bb00;
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
  .weui-dialog{
    width: 400px;
  }
  @media screen and (min-width: 1024px){
    .weui-dialog{
      width: 400px;
    }
    .weui-dialog > :first-child{
      height: 600px;
      overflow-y: auto;
    }
  }
  @media screen and (max-width: 1023px){
    .weui-dialog{
      width: 330px;
    }
    .weui-dialog > :first-child{
      height:500px;
      overflow-y: auto;
    }
  }

</style>
