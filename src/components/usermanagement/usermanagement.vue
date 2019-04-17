<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs" v-model="nowTab" @tab-click="handleOnTabClick(...arguments,1)">
      <el-tab-pane label="乘客用户">
        <info-view :items="items['passenger']"
                   :item-map="itemMap['passenger']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClick(...arguments,'passenger')"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickPassenger"
                   :plusButton=true @on-plus-button-click="handleOnPlusButtonClick(0)"
        >
        </info-view>
      </el-tab-pane>
      <el-tab-pane label="司机用户">
        <info-view :items="items['driver']"
                   :item-map="itemMap['driver']"
                   :color-map="colorMap2"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClick(...arguments,'driver')"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickDriver"
                   :plusButton=true @on-plus-button-click="handleOnPlusButtonClick(1)"></info-view>
      </el-tab-pane>
      <el-tab-pane label="公车">
        <info-view :items="items['car']"
                   :item-map="itemMap['car']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClick(...arguments,'car')"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickCar"
                   :plusButton=true @on-plus-button-click="handleOnPlusButtonClick(2)"></info-view>
      </el-tab-pane>
    </el-tabs>
    <div class="logs-dialog-wrapper" v-if="showLogs">
      <x-dialog v-model="showLogs" class="logs-dialog" hide-on-blur>

        <router-view></router-view>

        <div @click="showLogs=false">
        </div>
      </x-dialog>
    </div>
    <x-dialog v-model="PlusLogsPassengers" class="logs-dialog" hide-on-blur dialog-transition="">
      <group title="添加乘客信息" label-width="5.5em" label-margin-right="2em" label-align="justify">
        <x-input title="乘客姓名" v-model="passengerName"></x-input>
        <x-input title="乘客工号" v-model="passengerId"></x-input>
        <!--<x-input title="乘客部门" v-model="department"></x-input>-->
        <x-input title="乘客手机号" v-model="passengerPhone"></x-input>
      </group>
      <div style="width: 80%; margin: 0 auto; margin-top: 20px;margin-bottom: 10px">
        <flexbox>
          <flexbox-item>
            <x-button type="default" @click.native="CancelAddition(0)">取消</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="ConfirmAddition(0)">确认添加</x-button>
          </flexbox-item>
        </flexbox>
      </div>
      <div @click="PlusLogsPassengers=false">
      </div>
    </x-dialog>
    <x-dialog v-model="PlusLogsDrivers" class="logs-dialog" hide-on-blur style="height: 300px">
      <group title="添加司机信息" label-width="5.5em" label-margin-right="2em" label-align="justify">
        <x-input title="司机姓名" v-model="driverName"></x-input>
        <x-input title="司机工号" v-model="driverId"></x-input>
        <x-input title="司机手机号" v-model="driverPhone"></x-input>
        <!--<x-input title="车辆ID" v-model="carId"></x-input>-->
        <!--<x-input title="车牌号" v-model="carNumber"></x-input>-->
        <!--<x-input title="车型" v-model="carModel"></x-input>-->
        <!--<x-input title="载客数" v-model="carSize"></x-input>-->
      </group>
      <div style="width: 80%; margin: 0 auto; margin-top: 20px;margin-bottom: 10px">
        <flexbox>
          <flexbox-item>
            <x-button type="default" @click.native="CancelAddition(1)">取消</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="ConfirmAddition(1)">确认添加</x-button>
          </flexbox-item>
        </flexbox>
      </div>
      <div @click="PlusLogsDrivers=false">
      </div>
    </x-dialog>
    <x-dialog v-model="PlusLogsCars" class="logs-dialog" hide-on-blur style="height: 300px">
      <group title="添加公车信息" label-width="5.5em" label-margin-right="2em" label-align="justify">
        <x-input title="车辆品牌" v-model="carModel"></x-input>
        <x-input title="车辆牌照" v-model="carNumber"></x-input>
        <x-input title="载客数" v-model="carSize"></x-input>
        <x-input title="司机姓名" v-model="driverName"></x-input>
        <x-input title="司机工号" v-model="driverId"></x-input>
        <x-input title="车辆备注" v-model="carRemark"></x-input>
      </group>
      <div style="width: 80%; margin: 0 auto; margin-top: 20px;margin-bottom: 10px">
        <flexbox>
          <flexbox-item>
            <x-button type="default" @click.native="CancelAddition(2)">取消</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="ConfirmAddition(2)">确认添加</x-button>
          </flexbox-item>
        </flexbox>
      </div>
      <div @click="PlusLogsCars=false">
      </div>
    </x-dialog>
    <div ref="operationMenus">
      <actionsheet
        v-model="showOperationMenu['passenger']"
        :menus="operationMenu['passenger']"
        theme="android">
      </actionsheet>
      <actionsheet
        v-model="showOperationMenu['driver']"
        :menus="operationMenu['driver']"
        theme="android">
      </actionsheet>
      <actionsheet
        v-model="showOperationMenu['car']"
        :menus="operationMenu['car']"
        theme="android">
      </actionsheet>
    </div>

  </div>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'

  store
  import InfoView from 'components/infoview/infoview'
  import {
    XDialog,
    Actionsheet,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    FormPreview,
    Group,
    XInput,
    XButton,
    Flexbox,
    FlexboxItem
  } from 'vux'
  import store from "../../store/store";
  import Vuex from 'vuex'

  Vue.use(Vuex)

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
      FormPreview,
      Group,
      XInput,
      XButton,
      Flexbox,
      FlexboxItem
    },
    data() {
      return {
        pTotal: 0,           //乘客总数
        dTotal: 0,           //司机总数
        cTotal: 0,           //公车总数
        driverName: '',       //司机姓名
        driverId: '',         //司机工号
        driverPhone: '',      //司机手机号
        carId: '',            //车辆ID
        carNumber: '',        //车牌号
        carModel: '',         //车型
        carSize: '',          //载客数
        passengerName: '',    //乘客姓名
        passengerId: '',      //乘客学号
        department: '',       //乘客部门
        passengerPhone: '',   //乘客手机号
        searchInput: '',
        searchInputDriver: '',
        carRemark: '',         //车辆备注
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
            userId: '工号',
            department: "部门",
            usePhone: "手机号",
          },
          driver: {
            driverId: '工号',
            driverPhone: "手机号",
            carId: '车辆ID',
            carNumber: '车牌号',
            carModel: '车型',
            carSize: '载客数'
          },
          car: {
            carId: '车辆ID',
            carNumber: '车牌号',
            carSize: '载客数',
            driverName: "司机",
          }
        },
        inputTimer: undefined,
        PlusLogsPassengers: false,
        PlusLogsDrivers: false,
        PlusLogsCars: false,
        showLogs: false,
        showOperationMenu: {
          driver: false,
          passenger: false,
          car: false
        },
        operationpassengerName: '',
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
          '冻结': '#8cc5ff',//冻结
          '报修': '#A0DB94'//报修
        },
        colorMap2: {
          '不在职': '#FF0700'
        },
        nowTab: '0'
      }
    },
    mounted() {
      let path = this.$route.path.split('/')
      let len = path.length
      let userMap = {'passenagers': '0', 'drivers': '1', 'cars': '2'}
      console.log(path[len - 1])
      this.nowTab = userMap[path[len - 1]]
      axios.post('//192.168.50.223:8081/api/admin/query/driver', {page: 1})
        .then((res) => {
          this.itemsOrigin['driver'] = res.data.data.requestInfo
          this.items['driver'] = this.itemsOrigin['driver']
        })
        .catch((e) => {
          console.log(e)
        })
      axios.post('//192.168.50.223:8081/api/admin/query/passage', {page: 1})
        .then((res) => {
          this.itemsOrigin['passenger'] = res.data.data.requestInfo
          this.items['passenger'] = this.itemsOrigin['passenger']
        })
        .catch((e) => {
          console.log(e)
        })
      axios.post('//192.168.50.223:8081/api/admin/query/car', {page: 1})
        .then((res) => {
          this.itemsOrigin['car'] = res.data.data.requestInfo
          this.items['car'] = this.itemsOrigin['car']
        })
        .catch((e) => {
          console.log(e)
        })
    },
    methods: {
      CancelAddition(index) {
        if (index === 0)
          this.PlusLogsPassengers = false
        else if (index === 1)
          this.PlusLogsDrivers = false
        else if (index === 2)
          this.PlusLogsCars = false
      },
      ConfirmAddition(index) {
        if (index === 0) {
          axios({
            url: 'http://118.25.130.89:8082/api/admin/add/passenger',
            method: 'post',
            data: {
              "userId": this.passengerId,
              "userName": this.passengerName,
              "userPhone": this.passengerPhone
            }
          }).then((res) => {
            if (res.data.code === 'SUCCESS') {
              console.log(res.data);
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
            } else {
              this.$message({
                type: 'failed',
                message: '添加失败！'
              });
            }
          });
          this.PlusLogsPassengers = false
        } else if (index === 1) {
          axios({
            url: 'http://118.25.130.89:8082/api/admin/add/driver',
            method: 'post',
            data: {
              "driverId": this.driverId,
              "driverName": this.driverName,
              "driverPhone": this.driverPhone
            }
          }).then((res) => {
            if (res.data.code === 'SUCCESS') {
              console.log(res.data);
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
            } else {
              this.$message({
                type: 'failed',
                message: '添加失败！'
              });
            }
          });
          this.PlusLogsDrivers = false
        } else if (index === 2) {
          axios({
            url: 'http://118.25.130.89:8082/api/admin/add/carInfo',
            method: 'post',
            data: {
              "carNumber": this.carNumber,
              "carRemark": this.carRemark,
              "carSize": this.carSize,
              "driverId": this.driverId,
              "drivetName": this.driverName,
              "model": this.carModel
            }
          }).then((res) => {
            if (res.data.code === 'SUCCESS') {
              console.log(res.data);
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
            } else {
              this.$message({
                type: 'failed',
                message: '添加失败！'
              });
            }
          });
        }
        this.PlusLogsCars = false
      },
      handleOnLogButtonClick(index, type) {
        console.log(type, this.items[type][index].userId)
        if (type === 'passenger')
          store.commit('setUserId', this.items[type][index].userId)
        else if (type === 'driver')
          store.commit('setUserId', this.items[type][index].driverId)
        this.showLogs = true
      },
      handleOnOperationButtonClick(index, type) {
        for (let key in this.operationMenuOrigin) {
          Object.assign(this.operationMenu[key], this.operationMenuOrigin[key])
        }
        this.operationpassengerName = this.items[type][index].userName
        let state = this.items[type][index].userState
        let styleAppend = ''
        let nameAppend = ''
        if (this.colorMap[state]) {
          let color = this.colorMap[state]
          styleAppend = 'color: ' + color + ';'
          nameAppend = '(' + state + ')'
        }
        this.operationMenu[type][0].label =
          "<div style='text-align: center; font-weight: bold; font-size: 18px;" + styleAppend + "'>" +
          this.operationpassengerName + nameAppend +
          "</div>"
        this.showOperationMenu[type] = true;
      },
      handleOnOperationButtonClickDriver(index) {
        let type = "driver";
        let state = this.items[type][index].userState;
        this.handleOnOperationButtonClick(index, type);
        if (state === '不在职' || state === '正常') {
          this.operationMenu[type][1].label = "<div style='text-align: center; color: #5854ad'>" +
            (state === "不在职" ? "恢复任职" : "暂停任职") + "</div>"
        } else {
          this.operationMenu[type].splice(1, 1)//下标1是冻结项
        }
      },
      handleOnOperationButtonClickPassenger(index) {
        let type = "passenger";
        let state = this.items[type][index].userState;
        this.handleOnOperationButtonClick(index, type);
        if (state === '正常' || state === '冻结') {
          this.operationMenu[type][1].label = "<div style='text-align: center; color: #1AAD19'>" +
            (state === "冻结" ? "解冻" : "冻结") + "</div>"
        } else {
          this.operationMenu[type].splice(1, 1)//下标1是冻结项
        }
      },
      handleOnOperationButtonClickCar(index) {
        let type = "car";
        let state = this.items[type][index].userState;
        this.handleOnOperationButtonClick(index, type);
        if (state === '正常' || state === '冻结') {
          this.operationMenu[type][1].label = "<div style='text-align: center; color: #1AAD19'>" +
            (state === "冻结" ? "解冻" : "冻结") + "</div>"
        } else {
          this.operationMenu[type].splice(1, 1)//下标1是冻结项
        }
      },
      handleOnTabClick(now, event, page) {
//        console.log("!", ...arguments)
        var map = ['passenagers', 'drivers', 'cars']
        this.$router.push({name: map[now.index]})
        console.log(map[now.index])
        if (map[now.index] === 'passenagers') {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          axios({
            url: 'http://118.25.130.89:8082/api/admin/query/passage',
            method: 'post',
            data: {
              "page": page
            }
          }).then((res) => {
            if (res.data.code === 'SUCCESS') {
              console.log(res.data);
              this.items.passenger = res.data.data.requestInfo
              this.pTotal = res.data.data.total
            } else {
              this.$notify.error({
                message: res.data.message
              });
            }
            loading.close()
          });
        }
        else if (map[now.index] === 'drivers') {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          axios({
            url: 'http://118.25.130.89:8082/api/admin/query/driver',
            method: 'post',
            data: {
              "page": page
            }
          }).then((res) => {
            if (res.data.code === 'SUCCESS') {
              console.log(res.data);
              this.items.driver = res.data.data.requestInfo
              this.dTotal = res.data.data.total
            } else {
              this.$notify.error({
                message: res.data.message
              });
            }
            loading.close()
          });
        } else if (map[now.index] === 'cars') {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          axios({
            url: 'http://118.25.130.89:8082/api/admin/query/car',
            method: 'post',
            data: {
              "page": page
            }
          }).then((res) => {
            if (res.data.code === 'SUCCESS') {
              console.log(res.data);
              this.items.car = res.data.data.requestInfo
              this.cTotal = res.data.data.total
            } else {
              this.$notify.error({
                message: res.data.message
              });
            }
            loading.close()
          })
        }
      },
      handleOnPlusButtonClick(index) {
        if (index === 0) {
          this.PlusLogsPassengers = true
        }
        else if (index === 1) {
          this.PlusLogsDrivers = true
        }
        else if (index === 2) {
          this.PlusLogsCars = true
        }
        console.log('aa' + index)
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
  .vux-close {
    bottom: 0;
    position: fixed;
  }
</style>

<style lang="scss">
  .logs-dialog {
    .weui-dialog {
      max-width: 500px;
    }
  }

  .logs-dialog-wrapper {
    max-height: 650px !important;
  }

  .weui-dialog > :first-child {
    max-height: 500px;
    overflow-y: auto;
  }
</style>
