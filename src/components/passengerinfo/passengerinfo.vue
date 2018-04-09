<template>
  <div class="passengerinfo">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="我的资料" name="first">
        <div id="userImg">
          <div class="UserImg">
            <span class="userimg">头像：</span>
            <div class="avatar" ref="avatar">
              <img v-lazy="photoURL">
            </div>
          </div>
        </div>
        <br>
        <div id="userId">
          <div class="UserId">
            <span class="userid">用户ID：</span>
            <span class="id">{{id}}</span>
          </div>
        </div>
        <br>
        <div id="userName">
          <div class="UserName">
            <span class="username">姓名：</span>
            <span class="name">{{name}}</span>
          </div>
        </div>
        <br>
        <div id="userPhone">
          <div class="UserPhone">
            <span class="userphone">联系方式：</span>
            <div class="phone">
              <el-input
                placeholder="请输入联系电话"
                v-model="input10"
                clearable
              >
              </el-input>
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>
        <div class="submit">
          <el-button type="success">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">还在开发中...</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">还在开发中...</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "passengerinfo",
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
    }
  }
</script>

<style scoped>
  @import url('../../common/css/passengerinfo.css');
</style>
