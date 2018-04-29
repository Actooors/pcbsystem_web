<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs" v-model="nowTab">
      <el-tab-pane label="乘客用户">
        <info-view :items="items['passenger']"
                   :item-map="itemMap['passenger']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClickUser"
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
                   button-title="记录查询" @on-button-click="handleOnLogButtonClickCar"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickCar"></info-view>
      </el-tab-pane>
    </el-tabs>
    <div class="logs-dialog-wrapper" v-if="showLogs">
      <x-dialog v-model="showLogs" class="logs-dialog" hide-on-blur style="height: 800px">
        <!--<p class="logs-dialog-title">查看记录</p>-->
        <!--<div class="content-box">-->
        <!--<img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="width: 100%;">-->
        <!--</div>-->
        <tab :line-width=2 active-color="#38C972" v-model="index">
          <tab-item class="vux-center" :selected="demo1 === item" v-for="(item, index) in list1" @click="demo1 = item"
                    :key="index">{{item}}
          </tab-item>
        </tab>
        <swiper v-model="index" height="800px" :show-dots="false">
          <swiper-item v-for="(item, index) in list1" :key="index">
            <div class="tab-swiper vux-center">
              <div>
                <form-preview header-label="预约状态" v-for="(item,index) in items1" :header-value="item.state"
                              :body-items="item.list"
                              :class="item.state==='正在进行'?'progressing-form-yellow':null"
                              :key="item.value">

                </form-preview>
              </div>
            </div>
          </swiper-item>
        </swiper>
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
  import {XDialog, Actionsheet, Tab, TabItem, Swiper, SwiperItem, FormPreview} from 'vux'

  export default {
    name: "usermanagement",
    components: {
      InfoView,
      XDialog,
      Actionsheet,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      FormPreview
    },
    data() {
      return {
        demo1: '正在进行',
        demo2: '',
        demo3: '',
        index: 0,
        list1: ['正在进行', '正在申请', '预约历史'],
        list2: [],
        list3: [],
        items1: [
          {
            state: "正在进行",
            list: [
              {
                label: '申请人',
                value: '李瑞轩'
              },
              {
                label: '起始时间',
                value: '2018-04-18　08:00'
              },
              {
                label: '结束时间',
                value: '2018-04-19　08:00'
              },
              {
                label: '车辆牌照',
                value: '沪A-11111'
              }
            ],
          },
          {
            state: "正在进行",
            list: [
              {
                label: '申请人',
                value: '殷子良'
              },
              {
                label: '起始时间',
                value: '2018-04-20　08:00'
              },
              {
                label: '结束时间',
                value: '2018-04-21　08:00'
              },
              {
                label: '车辆牌照',
                value: '沪B-12345'
              }
            ],
          }
        ],
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
      },
      handleOnLogButtonClickUser(index) {
        this.showLogs = true
      },
      handleOnLogButtonClickCar(index) {
        this.showLogs = true
      },
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

<style>
  .weui-dialog{
    height: 90%;
  }
  .vux-slider{
    height:90%;
  }
  .progressing-form-yellow {
    width: 100%;
    margin: 20px auto;
  }

  .progressing-form-yellow:hover {
    box-shadow: 1px 1px 100px yellow;
  }

  .progressing-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #d4bb00;
  }
</style>

<style lang="scss">
  .logs-dialog {
    .weui-dialog {
      max-width: none;
    }
  }

</style>
