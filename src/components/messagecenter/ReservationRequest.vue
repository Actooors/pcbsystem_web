<template>
  <div>
    <p style="width: 100%;text-align: center;margin-bottom: 10px;color: #666">预约请求</p>
    <p style="width: 100%;text-align: center;">共有{{requestNumber}}条请求消息</p>
    <form-preview header-label="预约状态" v-for="(item,index) in itemsProgress" :header-value="item.state"
                  :body-items="item.list"
                  :class="item.state==='正在进行'?'progressing-form-yellow':null"
                  :key="item.value"
                  :footer-buttons="buttons"></form-preview>
    <confirm v-model="show1"
             title="通过该申请将会拒绝以下申请，确定吗？"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
    >
    </confirm>
    <confirm v-model="show2"
             show-input
             ref="confirm5"
             title="请在下框内填写拒绝理由"
             @on-cancel="onCancel1"
             @on-confirm="onConfirm1"
             style="height: 500px !important;"
    >
    </confirm>
  </div>
</template>

<script>
  import {FormPreview, Confirm} from 'vux'

  export default {
    name: "ReservationRequest",
    components: {
      FormPreview,
      Confirm
    },
    methods: {
      onConfirm() {
        this.$message({
          type: 'success',
          message: "预约成功！"
        });
        console.log("预约成功！");
        this.show = false;
      },
      onCancel() {
        console.log("取消！");
      },
      onCancel1() {
        console.log("取消！");
      },
      onConfirm1() {
        this.$message({
          type: 'success',
          message: "发送成功！"
        });
        this.show2 = false;
      }
    },
    data() {
      return {
        show1: false,
        show2: false,
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
        buttons: [
          {
            style: 'default',
            text: '拒绝申请',
            onButtonClick: () => {
              console.log("拒绝申请");
              this.show2 = true;
            }
          },
          {
            style: 'primary',
            text: '通过申请',
            onButtonClick: () => {
              this.show1 = true;
              console.log("通过申请");
            }
          }
        ]
      }
    },
  }
</script>

<style>

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

  .weui-dialog {
    width: 400px;
  }

  @media screen and (min-width: 1024px) {
    .weui-dialog {
      width: 400px;
    }

    .weui-dialog > :first-child {
      height: 600px;
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
      height: 500px;
      overflow-y: auto;
    }

    .weui-dialog__hd {
      height: 90px !important;
    }
  }

</style>
