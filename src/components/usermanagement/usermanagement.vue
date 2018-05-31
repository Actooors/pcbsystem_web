<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs" v-model="nowTab" @tab-click="handleOnTabClick">
      <el-tab-pane label="乘客用户">
        <info-view :items="items['passenger']"
                   :item-map="itemMap['passenger']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClick"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickPassenger"
                   :plusButton=true @on-plus-button-click="handleOnPlusButtonClick(0)">
        </info-view>
      </el-tab-pane>
      <el-tab-pane label="司机用户">
        <info-view :items="items['driver']"
                   :item-map="itemMap['driver']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClick"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickDriver"
                   :plusButton=true @on-plus-button-click="handleOnPlusButtonClick(1)"></info-view>
      </el-tab-pane>
      <el-tab-pane label="公车">
        <info-view :items="items['car']"
                   :item-map="itemMap['car']"
                   :color-map="colorMap"
                   button-title="记录查询" @on-button-click="handleOnLogButtonClick"
                   button-title2="操作" @on-button-click2="handleOnOperationButtonClickCar"
                   :plusButton=true @on-plus-button-click="handleOnPlusButtonClick(2)"></info-view>
      </el-tab-pane>
    </el-tabs>
    <div class="logs-dialog-wrapper" v-if="showLogs">
      <x-dialog v-model="showLogs" class="logs-dialog" hide-on-blur style="height: 800px">

        <router-view></router-view>

        <div @click="showLogs=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <x-dialog v-model="PlusLogsPassengers" class="logs-dialog" hide-on-blur style="height: 300px; ">
      <group title="添加乘客信息" label-width="5.5em" label-margin-right="2em" label-align="justify">
        <x-input title="乘客姓名" v-model="passengerName"></x-input>
        <x-input title="乘客工号" v-model="passengerId"></x-input>
        <x-input title="乘客部门" v-model="department"></x-input>
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
        <span class="vux-close"></span>
      </div>
    </x-dialog>
    <x-dialog v-model="PlusLogsDrivers" class="logs-dialog" hide-on-blur style="height: 300px">
      <group title="添加司机信息" label-width="5.5em" label-margin-right="2em" label-align="justify">
        <x-input title="司机姓名" v-model="driverName"></x-input>
        <x-input title="司机工号" v-model="driverId"></x-input>
        <x-input title="司机手机号" v-model="driverPhone"></x-input>
        <x-input title="车辆ID" v-model="carId"></x-input>
        <x-input title="车牌号" v-model="carNumber"></x-input>
        <x-input title="车型" v-model="carModel"></x-input>
        <x-input title="载客数" v-model="carSize"></x-input>
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
        <span class="vux-close"></span>
      </div>
    </x-dialog>
    <x-dialog v-model="PlusLogsCars" class="logs-dialog" hide-on-blur style="height: 300px">
      <group title="添加公车信息" label-width="5.5em" label-margin-right="2em" label-align="justify">
        <x-input title="车辆品牌" v-model="carModel"></x-input>
        <x-input title="车辆ID" v-model="carId"></x-input>
        <x-input title="载客数" v-model="carSize"></x-input>
        <x-input title="司机" v-model="driverName"></x-input>
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
        <span class="vux-close"></span>
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
        driverName: '',       //司机姓名
        driverId: '',         //司机工号
        driverPhone: '',      //司机手机号（后端还没写）
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
          '冻结':
            '#8cc5ff',
          '报修':
            '#A0DB94'
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
//      switch (path[len - 1]) {
//        case 'passenagers':
//          this.nowTab = '0'
//          break
//        case 'drivers':
//          this.nowTab = '1'
//          break
//        case 'cars':
//          this.nowTab = '2'
//          break
//      }
//      if (path[len - 1] === 'passenagers')
//        this.nowTab = '0'
//      else if (path[len - 1] === 'drivers')
//        this.nowTab = '1'
//      else
//        this.nowTab = '2'
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
      CancelAddition(index) {
        if (index === 0)
          this.PlusLogsPassengers = false
        else if (index === 1)
          this.PlusLogsDrivers = false
        else if (index === 2)
          this.PlusLogsCars = false
      },
      ConfirmAddition(index) {
        this.$message({
          type: 'success',
          message: '添加成功！'
        });
        if (index === 0)
          this.PlusLogsPassengers = false
        else if (index === 1)
          this.PlusLogsDrivers = false
        else if (index === 2)
          this.PlusLogsCars = false
      },
      handleOnLogButtonClick(index) {
        this.showLogs = true
      },
      handleOnOperationButtonClickDriver(index, type = "driver") {
        for (let key in this.operationMenuOrigin) {
          Object.assign(this.operationMenu[key], this.operationMenuOrigin[key])
        }
        this.operationpassengerName = this.items[type][index].uname
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
          this.operationpassengerName + nameAppend +
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
      handleOnTabClick(now) {
        console.log(now)
        var map = ['passenagers', 'drivers', 'cars']
        this.$router.push({name: map[now.index]})
      },
      handleOnPlusButtonClick(index) {
        if (index === 0)
          this.PlusLogsPassengers = true
        else if (index === 1)
          this.PlusLogsDrivers = true
        else if (index === 2)
          this.PlusLogsCars = true
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
</style>
