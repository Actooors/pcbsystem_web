<template>
  <div class="passengerinfo">
    <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">-->
    <!--<el-tab-pane label="我的资料" name="first">-->
    <div id="userImg">
      <div class="UserImg info-flex">
        <div class="userimg">头 像：</div>
        <div class="avatar">
          <div class="img">
            <img v-lazy="photoURL">
          </div>
        </div>
      </div>
    </div>
    <br>
    <div id="userId">
      <div class="UserId info-flex">
        <div class="userid">用户 ID：</div>
        <div class="id">{{id}}</div>
      </div>
    </div>
    <br>
    <div id="userName">
      <div class="UserName info-flex">
        <div class="username">姓 名：</div>
        <div class="name">{{name}}</div>
      </div>
    </div>
    <br>
    <div id="userPhone">
      <div class="UserPhone info-flex">
        <div class="userphone">联系方式：</div>
        <div class="phone">
          <group>
            <x-input name="mobile" keyboard="number" v-model="phoneNum" is-type="china-mobile"></x-input>
          </group>
          <br></br>
          <group style="width: 120px">
            <x-button mini type="primary" @click.native="VerifyCellPhoneNumber()">验证手机号码</x-button>
          </group>
          <confirm v-model="show"
                   show-input
                   ref="confirm5"
                   title='我们给您的手机发送了一条验证码，请在下框内输入验证码'
                   @on-confirm="onConfirm5"
                   @on-show="onShow5">
          </confirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {XInput, Group, XButton, Confirm} from 'vux'

  export default {
    name: "passengerinfo",
    components: {
      XInput,
      Group,
      XButton,
      Confirm
    },
    data() {
      return {
        show: false,
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('userName'),
        phoneNum: '请输入手机号码',
        hashKey: '',
        deadline: '',
        code: '',
        // state: ''
      }
    },
    computed: {
      photoURL() {
        if (localStorage.getItem('userImg') === null) {
          return 'http://services.shu.edu.cn/User/showPhoto.aspx'
        } else {
          return localStorage.getItem('userImg')
        }
      }
    },
    methods: {
      VerifyCellPhoneNumber() {
        this.show = true;
        axios({
          url: 'http://172.20.10.2:8081/api/user/validateCode',
          method: 'post',
          data: {
            "phoneNum": this.phoneNum
          }
        }).then((res) => {
          console.log("这是validate借口的返回值：",res);
          if (res.data.code === 'SUCCESS') {
            this.$message({
              type: 'success',
              message: '短信已发送,请注意查收!'
            })
            this.phoneNum = res.data.data.phoneNum
            this.deadline = res.data.data.deadline
            this.hashKey = res.data.data.hashKey
          } else {
            this.$message({
              type: 'failed',
              message: res.data.message
            })
          }
        }).catch((error) => {
          console.log(error)
          this.$notify.error({
            message: error
          })
        });
        console.log("验证手机号");
      },
      onShow5() {
        this.$refs.confirm5.setInputValue('')
      },
      onConfirm5(value) {
        console.log("点击确定")
        this.$refs.confirm5.setInputValue()
        this.code = value
        console.log("输入的value是" + this.code)
        console.log("手机号是" + this.phoneNum)
        axios({
          url: 'http://172.20.10.2:8081/api/user/checkValidateCodeForNewPhone',
          method: 'post',
          data: {
            "code": this.code,
            "phoneNum": this.phoneNum,
            "deadline": this.deadline,
            "hashKey": this.hashKey,
          }
        }).then((res) => {
          if (res.data.code === "SUCCESS") {
            this.$message({
              type: 'success',
              message: '手机号修改成功!'
            })
          } else {
            this.$message({
              type: 'failed',
              message: '手机号修改失败!'
            })
          }
        }).catch((err) => {
          this.$notify.error({
            message: error
          })
        })
      },
      initPersonalInfo() {
        axios({
          url: 'http://172.20.10.2:8081/api/user/phoneNum',
          method: 'get'
        }).then((res) => {
          if (res.data.code === 'FAILED') {
            this.$notify.error({
              message: res.data.message
            });
          }
          else {
            this.phoneNum = res.data.data
          }
        })
          .catch((error) => {
            this.$notify.error({
              message: error
            });
          })
      }
    },
    created() {
      this.initPersonalInfo()
    },
    watch: {
      phoneNum(newVal) {
        this.$nextTick(() => {
          if (this.phoneNum !== '')
            this.phoneNum = newVal.split('').filter((x) => {
              return parseInt(x) === 0 || parseInt(x)
            }).join('')
        })
      }
    }
  }
</script>

<style>
  .weui-cells {
    margin-top: 0 !important;
  }
</style>

<style scoped>
  @import url('../../common/css/passengerinfo.css');
</style>


