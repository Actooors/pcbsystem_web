<template>
  <div style="width: 60%;margin: 0 auto">
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-textarea title="详细原因" placeholder="请填写详细原因,限制字数为100字" :show-counter="true" :max="100" autosize
                  v-model="reasons"
      ></x-textarea>
    </group>
    <div style="padding:15px;width: 60%;right: 0;left: 0;margin: 0 auto 0 auto;">
      <x-button @click.native="showPlugin" @on-confirm="showPlugin1" type="primary">提交</x-button>
    </div>
  </div>
</template>

<script>
  import {
    AlertPlugin,
    GroupTitle,
    Group,
    Cell,
    XInput,
    Selector,
    XButton,
    XTextarea,
    ConfirmPlugin
  } from 'vux'
  import Vue from 'vue'
  import axios from 'axios'

  Vue.use(ConfirmPlugin)
  Vue.use(AlertPlugin)
  export default {
    name: "",
    components: {
      AlertPlugin,
      Group,
      GroupTitle,
      Cell,
      XInput,
      Selector,
      XButton,
      XTextarea,
      ConfirmPlugin
    },
    data() {
      return {
        reasons: '',
      }
    },
    methods: {
      showPlugin() {
        this.$vux.confirm.show({
          title: '提交表单',
          content: '确认提交该表单吗？',
          onConfirm: this.showPlugin1
        })
      },
      showPlugin1() {
        console.log(this.reasons)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios({
          url: 'http://172.20.10.2:8081/api/driver/insert/carRequest',
          method: 'post',
          params: {
            "reason": this.reasons
          }
        }).then((res) => {
          if (res.data.code === 'SUCCESS') {
            console.log(res.data)
            this.$vux.alert.show({
              title: '恭喜',
              content: '提交成功，请联系管理员！'
            })
            loading.close()
          } else {
            this.$notify.error({
              message: res.data.message
            });
            loading.close()
          }
        }).catch((err) => {
          this.$notify.error({
            message: err
          });
          loading.close()
        })
      },
    }
  }
</script>

<style scoped>

</style>

<style>
  .weui-label {
    max-width: 76.5px;
    text-align: justify;
    text-align-last: justify;
  }

  .vux-label {
    max-width: 76.5px;
    text-align: justify;
    text-align-last: justify;
  }

  .time .vux-cell-value {
    color: black;
  }
</style>
