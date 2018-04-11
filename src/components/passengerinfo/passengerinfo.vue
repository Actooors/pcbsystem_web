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
            <el-input
              type="text"
              name="text1"
              placeholder="请输入联系电话"
              v-model="input10"
              clearable
              maxlength="11"
            >
            </el-input>
          </div>
      </div>
    </div>
    <br>
    <br>
    <div class="submit">
      <el-button type="success" @click="open">保存</el-button>
    </div>
  </div>
</template>

<script>
  import store from 'store/store'
  import {mapState} from 'vuex'

  export default {
    name: "passengerinfo",
    store,
    data() {
      return {
        id: '16121670',
        name: '李瑞轩',
        activeName2: 'first',
        input1: '',
        input10: '18101971575',
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      open() {
        this.$notify({
          title: '保存成功',
          message: '',
          type: 'success',
        });

      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    computed: mapState(['uName', 'uId', 'photoURL']),
    watch: {
      input10(newVal) {
        this.$nextTick(() => {
          this.input10 = newVal.split('').filter((x) => {
            return parseInt(x)===0 || parseInt(x)
          }).join('')
        })
        // console.log(this.input10)
      }
    }
  }
</script>

<!--<script type="text/javascript">-->
<!--function prevent(e) {-->
<!--e.preventDefault ? e.preventDefault() : e.returnValue = false;-->
<!--}-->
<!--function digitInput(e) {-->
<!--var c = e.charCode || e.keyCode; //FF、Chrome IE下获取键盘码-->
<!--if ((c != 8 && c != 46 && // 8 - Backspace, 46 - Delete-->
<!--(c < 37 || c > 40) && // 37 (38) (39) (40) - Left (Up) (Right) (Down) Arrow-->
<!--(c < 48 || c > 57) && // 48~57 - 主键盘上的0~9-->
<!--(c < 96 || c > 105)) // 96~105 - 小键盘的0~9-->
<!--|| e.shiftKey) { // Shift键，对应的code为16-->
<!--prevent(e); // 阻止事件传播到keypress-->
<!--}-->
<!--}-->
<!--$(function(){-->
<!--$("el-input[name='text1']").keydown(function(e) {-->
<!--digitInput(e);-->
<!--});-->
<!--});-->
<!--</script>-->

<style scoped>
  @import url('../../common/css/passengerinfo.css');
</style>
