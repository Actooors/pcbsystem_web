<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs" v-model="nowTab" @tab-click="handleOnTabClick(...arguments,1)">
      <el-tab-pane label="预约请求">
        <info-view :items="items['car']"
                   :item-map="itemMap['car']"
                   :color-map="colorMap"
                   button-title="查看详细信息" @on-button-click="handleOnLogButtonClick(...arguments,'car')"
        >
        </info-view>
      </el-tab-pane>
      <el-tab-pane label="报修请求">
        <info-view :items="items['car']"
                   :item-map="itemMap['car']"
                   :color-map="colorMap"
                   button-title="查看详细信息" @on-button-click="handleOnLogButtonClick(...arguments,'car')"
        ></info-view>
      </el-tab-pane>
    </el-tabs>
    <div class="logs-dialog-wrapper" v-transfer-dom>
      <x-dialog v-model="showLogs" class="logs-dialog" hide-on-blur dialog-transition="">

        <router-view></router-view>

      </x-dialog>
    </div>
    <div ref="operationMenus">
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
  import {XDialog, Actionsheet, Tab, TabItem, Swiper, SwiperItem, FormPreview} from 'vux'
  import Vue from 'vue';
  import Vuex from 'vuex'
  import store from "../../store/store";

  store
  Vue.use(Vuex)
  export default {
    name: "messagecenter",
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
        itemsProgress: [],
        listsProgress: [],
        cTotal: 0,           //公车总数
        driverName: '',       //司机姓名
        driverId: '',         //司机工号
        driverPhone: '',      //司机手机号
        carId: '',            //车辆ID
        carNumber: '',        //车牌号
        carModel: '',         //车型
        carSize: '',          //载客数
        carRemark: '',         //车辆备注
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
          //也决定了显示顺序
          car: {
            carId: '车辆ID',
            carNumber: '车牌号',
            carSize: '载客数',
            driverName: "司机",
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
        nowTab: '0'
      }
    },
    mounted() {
      let path = this.$route.path.split('/')
      let len = path.length
      let userMap = {'ReservationRequest': '0', 'RepairRequest': '1'}
      this.nowTab = userMap[path[len - 1]]
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
      handleOnLogButtonClick(index, type) {
        console.log(type, this.items[type][index].carId)
        store.commit('setCarId', this.items[type][index].carId)
        this.showLogs = true
      },
      handleOnTabClick(now, event, page) {
        console.log(now.index)
        var map = ['ReservationRequest', 'RepairRequest']
        this.$router.push({name: map[now.index]})
        if (map[now.index] === 'ReservationRequest' || map[now.index] === 'RepairRequest') {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          axios({
            url: 'http://192.168.50.223:8081/api/admin/query/car',
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
          });
        }
      },
    }
  };
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
      max-width: none;
    }
  }
</style>
