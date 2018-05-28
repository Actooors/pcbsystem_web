<template>
  <div>
    <form-preview header-label="状态" header-value="报修" :body-items="list" :footer-buttons="buttons"
                  class="repair"></form-preview>
    <confirm v-model="show1"
             title="确定要同意该请求吗？"
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
    >
    </confirm>
    <x-dialog v-model="show3" class="dialog-demo" hide-on-blur>
      <div class="img-box">
        <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
      </div>
      <div @click="show3=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {FormPreview, Confirm, XDialog} from 'vux'

  export default {
    name: "RepairRequest",
    components: {
      FormPreview,
      Confirm,
      XDialog
    },
    methods: {
      onCancel() {
        console.log("取消")
      },
      onConfirm() {
        console.log("通过");
        this.$message({
          type: 'success',
          message: '发送成功！'
        });
        this.show1 = false;
      },
      onCancel1() {
        console.log("取消")
      },
      onConfirm1() {
        console.log("通过")
        this.$message({
          type: 'success',
          message: '发送成功！'
        });
        this.show2 = false;
      }
    },
    data() {
      return {
        show1: false,
        show2: false,
        show3: false,
        list: [
          {
            label: '上报人',
            value: '李瑞轩'
          },
          {
            label: '联系方式',
            value: '18101971575'
          },
          {
            label: '详细原因',
            value: '车大灯损坏，需要更换'
          },
        ],
        buttons: [
          {
            text: '查看图片',
            onButtonClick: () => {
              console.log("查看图片");
              this.show3 = true;
            }
          },
          {
            style: 'default',
            text: '驳回请求',
            onButtonClick: () => {
              console.log("拒绝请求");
              this.show2 = true;
            }
          },
          {
            style: 'primary',
            text: '同意请求',
            onButtonClick: () => {
              console.log("同意请求");
              this.show1 = true;
            }
          }
        ]
      }
    }
  }
</script>

<style>
  .weui-dialog {
    width: 400px;
  }

  .weui-form-preview__btn_default {
    color: red !important;
  }

  .weui-form-preview__ft > :first-child {
    color: #0691c2 !important;
  }

  .weui-form-preview__hd .weui-form-preview__value {
    color: red;
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

  @media screen and (min-width: 1024px) {
    .weui-dialog {
      width: 400px;
    }
  }

  @media screen and (max-width: 1023px) {
    .weui-dialog {
      width: 330px;
    }
  }
</style>
