<template>
  <div class="passengerinfo">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="我的资料" name="first">
        <div class="UserImg">
          <span class="userimg">头像</span>
          <div class="img">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <div class="UserId">
          <span class="userid">用户ID</span>
          <div class="id">
            <el-input
              placeholder="16121670"
              v-model="input1"
              :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="UserName">
          <span class="userName">姓名</span>
          <div class="name">
            <el-input
              placeholder="李瑞轩"
              v-model="input1"
              :disabled="true">
            </el-input>
          </div>
        </div>
        <div class="UserPhone">
          <span class="userphone">联系方式</span>
          <div class="phone">
            <el-input
              placeholder="请输入联系电话"
              v-model="input10"
              clearable
            >
            </el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "passengerinfo",
    data() {
      return {
        activeName2: 'first',
        input1: '',
        input10: '',
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
