<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs" v-model="nowTab">
      <el-tab-pane label="乘客用户">
        <info-view :items="items['passenger']"
                   :item-map="itemMap['passenger']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click=""
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickPassenger">>
        </info-view>
      </el-tab-pane>
      <el-tab-pane label="司机用户">
        <info-view :items="items['driver']"
                   :item-map="itemMap['driver']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClickDriver"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickDriver"></info-view>
      </el-tab-pane>
      <el-tab-pane label="公车">
        <info-view :items="items['car']"
                   :item-map="itemMap['car']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click=""
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickCar"></info-view>
      </el-tab-pane>
    </el-tabs>
    <div class="logs-dialog-wrapper" v-if="showLogs">
      <x-dialog v-model="showLogs" class="logs-dialog" hide-on-blur>
        <p class="logs-dialog-title">查看记录</p>
        <div class="content-box">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="width: 100%;">
        </div>
        <div @click="showLogs=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div ref="operationMenus">
      <actionsheet
        v-model="showOperationMenu['passenger']"
        :menus="operationMenu['passenger']"
        theme="android">      <!--@on-click-menu="click"-->
        <!--@on-after-hide="log('after hide')"-->
        <!--@on-after-show="log('after show')"-->
      </actionsheet>
      <actionsheet
        v-model="showOperationMenu['driver']"
        :menus="operationMenu['driver']"
        theme="android">      <!--@on-click-menu="click"-->
        <!--@on-after-hide="log('after hide')"-->
        <!--@on-after-show="log('after show')"-->
      </actionsheet>
      <actionsheet
        v-model="showOperationMenu['car']"
        :menus="operationMenu['car']"
        theme="android">      <!--@on-click-menu="click"-->
        <!--@on-after-hide="log('after hide')"-->
        <!--@on-after-show="log('after show')"-->
      </actionsheet>

    </div>
    <div class="floatButton">
      <button @click="handleOnPlusButtonClick" class="el-icon-plus"></button>
    </div>

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
          passenger: [],
          driver: [],
          car: []
        },
        items: {
          passenger: [],
          driver: [],
          car: []
        },
        itemMap: {
          passenger: {//也决定了显示顺序
            uid: '工号',
            department: "部门",
            "Tel.": "手机号",
          },
          driver: {
            uid: '工号',
            "Tel.": "手机号",
            cid: '车辆ID',
            license: '车牌号',
            model: '车型',
            capacity: '载客数'
          },
          car: {
            cid: '车辆ID',
            license: '车牌号',
            capacity: '载客数',
            dname: "司机"
          }
        },
        inputTimer: undefined,
        showLogs: false,
        showOperationMenu: {
          driver: false,
          passenger: false,
          car: false
        },
        operationUsername: '',
        operationMenuOrigin: {
          driver: [{label: '', type: 'disabled'},
            {label: ''},
            {label: '<div style="text-align: center; color: #E64340">删除用户</div>'},
            {label: '<div style="text-align: center">取消</div>'}],
          passenger: [{label: '', type: 'disabled'},
            {label: ''},
            {label: '<div style="text-align: center; color: #E64340">删除用户</div>'},
            {label: '<div style="text-align: center">取消</div>'}],
          car: [{label: '', type: 'disabled'},
            {label: ''},
            {label: '<div style="text-align: center; color: #E64340">删除车辆</div>'},
            {label: '<div style="text-align: center">取消</div>'}]
        },
        operationMenu: {
          driver: [],
          passenger: [],
          car: []
        },
        colorMap: {
          '冻结':
            '#8cc5ff',
          '报修':
            '#A0DB94'
        },
        nowTab: ''
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
      axios.get('/api/passengerinfo')
        .then((res) => {
          this.itemsOrigin['passenger'] = res.data.data
          this.items['passenger'] = this.itemsOrigin['passenger']
        })
        .catch((e) => {
          console.log(e)
        })
      axios.get('/api/carinfo')
        .then((res) => {
          this.itemsOrigin['car'] = res.data.data
          this.items['car'] = this.itemsOrigin['car']
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
      handleOnOperationButtonClickDriver(index, type = "driver") {
        for (let key in this.operationMenuOrigin) {
          Object.assign(this.operationMenu[key], this.operationMenuOrigin[key])
        }
        this.operationUsername = this.items[type][index].uname
        let state = this.items[type][index].ustate
        let styleAppend = ''
        let nameAppend = ''
        if (this.colorMap[state]) {
          let color = this.colorMap[state]
          styleAppend = 'color: ' + color + ';'
          nameAppend = '(' + state + ')'
        }
        this.operationMenu[type][0].label =
          "<div style='text-align: center; font-weight: bold; font-size: 18px;" + styleAppend + "'>" +
          this.operationUsername + nameAppend +
          "</div>"
        if (state === '正常' || state === '冻结') {
          this.operationMenu[type][1].label = "<div style='text-align: center; color: #1AAD19'>" +
            (state === "冻结" ? "解冻" : "冻结") + "</div>"
        } else {
          this.operationMenu[type].splice(1, 1)//下标1是冻结项
        }
        this.showOperationMenu[type] = true;

      },
      handleOnOperationButtonClickPassenger(index) {
        this.handleOnOperationButtonClickDriver(index, 'passenger')
      },
      handleOnOperationButtonClickCar(index) {
        this.handleOnOperationButtonClickDriver(index, 'car')
      },
      handleOnPlusButtonClick() {

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
