<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="乘客用户">
        <info-view :items="items['passenger']" :item-map="itemMap['passenger']"
                   button-title="记录查询" @on-button-click=""></info-view>
      </el-tab-pane>
      <el-tab-pane label="司机用户">
        <info-view :items="items['driver']"
                   :item-map="itemMap['driver']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClickDriver"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickDriver"></info-view>
      </el-tab-pane>
    </el-tabs>
    <div class="logs-dialog-wrapper" v-if="showLogs">
      <x-dialog v-model="showLogs" class="logs-dialog" hide-on-blur>
        <p class="logs-dialog-title">预约记录</p>
        <div class="content-box">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="width: 100%;">
        </div>
        <div @click="showLogs=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <actionsheet
      v-model="showOperationMenu"
      :menus="operationMenuDriver"
      theme="android">      <!--@on-click-menu="click"-->
      <!--@on-after-hide="log('after hide')"-->
      <!--@on-after-show="log('after show')"-->
    </actionsheet>

  </div>
</template>
<script>
  import axios from 'axios'
  import InfoView from 'components/infoview/infoview'
  import {XDialog, Actionsheet} from 'vux'

  export default {
    name: "usermanagement",
    components: {
      InfoView,
      XDialog,
      Actionsheet
    },
    data() {
      return {
        searchInput: '',
        searchInputDriver: '',
        itemsOrigin: {
          passenger: [{
            avatar: "http://xxxxx.com/xxxxx.jpg",
            uname: '莫之章乘客',
            uid: 16121663,
            license: '沪A0001',
            model: '奥迪A8',
            capacity: 4,
            cid: 32,
          },],
          driver: [{
            avatar: "http://xxxxx.com/xxxxx.jpg",
            uname: '莫之章',
            uid: 16121663,
            license: '沪A0001',
            model: '奥迪A8',
            capacity: 4,
            cid: 32,
            ustate: '正常'
          },]
        },
        items: {
          passenger: [],
          driver: []
        },
        itemMap: {
          passenger: {
            uname: '姓名',
            uid: '工号',
          },
          driver: {
            uname: '姓名',
            uid: '工号',
            cid: '车辆ID',
            license: '车牌号',
            model: '车型',
            capacity: '载客数'
          }
        },
        inputTimer: undefined,
        showLogs: false,
        showOperationMenu: false,
        operationUsername: '',
        operationMenuDriver: [
          {label: '', type: 'disabled'},
          {label: '<div style="text-align: center; color: #1AAD19">冻结用户</div>'},
          {label: '<div style="text-align: center; color: #E64340">删除用户</div>'},
          {label: '<div style="text-align: center">取消</div>'}],
        colorMap: {
          '冻结': '#8cc5ff',
          '报修': '#A0DB94'
        }
      }
    },
    mounted() {
      axios.get('/api/driverinfo')
        .then((res) => {
          this.itemsOrigin['driver'] = res.data.data
          this.items['driver'] = this.itemsOrigin['driver']
        })
        .catch((e) => {
          console.log(e)
        })
    }
    ,
    methods: {
      handleOnLogButtonClickDriver(index) {
        this.showLogs = true

      }
      ,
      handleOnOperationButtonClickDriver(index) {
        this.showOperationMenu = true
        console.log(index, this.items['driver'])
        this.operationUsername = this.items['driver'][index].uname
        let state = this.items['driver'][index].ustate
        let len = this.operationUsername.length
        let styleAppend = ''
        let nameAppend = ''
        if (state !== '正常') {
          let color = this.colorMap[state]
          styleAppend = 'color: ' + color + ';'
          nameAppend = '(' + state + ')'
        }
        this.operationMenuDriver[0].label =
          "<div style='text-align: center; font-weight: bold; font-size: 18px;" + styleAppend + "'>" +
          this.operationUsername + nameAppend +
          "</div>"
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/usermanagement';
</style>
<style lang="less" scoped>
  @import '~vux/src/styles/close';
</style>

<style lang="scss">
  .logs-dialog {
    .weui-dialog {
      max-width: none;
    }
  }

</style>
