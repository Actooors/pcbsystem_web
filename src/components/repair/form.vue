<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">

      <x-input class="name" title="上报人" placeholder="请输入姓名" v-model="name"></x-input>
      <x-input title="联系方式" placeholder="请输入手机号" v-model="tel"></x-input>
      <!--<selector title="报修原因" placeholder="请选择" :options="['车辆部件损坏', '常规性保养','其他']" v-model="reason"></selector>-->
      <x-textarea title="详细原因" placeholder="请填写详细原因" :show-counter="false" :rows="1" v-model="reasons"
                  autosize></x-textarea>
      <cell title="上传图片">
        <el-upload
          class="upload"
          action="上传地址"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="mini" type="primary">点击上传</el-button>
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
      </cell>
    </group>
    <div style="padding:15px;width: 60%;right: 0;left: 0;margin: 0 auto 0 auto;">
      <x-button @click.native="showPlugin" @on-confirm="showPlugin1" type="primary">提交表单</x-button>
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
        fileList: [],
        tel: '',
        name: '',
//        reason: '',
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
        this.$vux.alert.show({
          title: '恭喜',
          content: '您成功的上传了该报修表单！'
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>

</style>

<style>
  .weui-label  {
    max-width: 76.5px;
    text-align: justify;
    text-align-last: justify;
  }
  .vux-label{
    max-width: 76.5px;
    text-align: justify;
    text-align-last: justify;
  }

  .time .vux-cell-value {
    color: black;
  }
</style>
