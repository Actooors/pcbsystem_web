<template>
  <div class="passengerinfo">
    <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">-->
      <!--<el-tab-pane label="我的资料" name="first">-->
        <div id="userImg">
          <div class="UserImg info-flex">
            <div class="userimg">头 像：</div>
            <div class="avatar" ref="avatar">
              <img v-lazy="photoURL">
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
          <el-button type="success" @click="open" >保存</el-button>
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
        console.log(tab, event);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    computed:mapState(['photoURL'])
  }
</script>

<style scoped>
  @import url('../../common/css/passengerinfo.css');
</style>
