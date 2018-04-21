<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="乘客用户">
        <div class="search">
          <el-input placeholder="搜索..." v-model="searchInput" class="input"></el-input>
          <div class="card-wrapper" ref="passenger">
            <el-card class="box-card" v-for="(item,index) of items['passenger']" :key="item.value">
              <div slot="header" class="clearfix card-header">
                <span class="uname" v-text="item.uname"></span>
                <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
              </div>
              <div class="card-body">
                <img v-lazy="item.avatar" class="avatar">
                <div class="card-pinfo">
                  <p class="info-item" v-for="(value,key) of itemMap">
                    <span class="item-tag" v-text="value"></span>
                    <span class="item-value">{{item[key]}}</span>
                  </p>
                </div>
              </div>
            </el-card>
            <div class="empty-box-card"></div><!--最大列数为n, 填充n-2个高度为0的块使最后一排左对齐-->
            <div class="empty-box-card"></div>
          </div>
        </div>

      </el-tab-pane>


      <el-tab-pane label="司机用户">
        <div class="search">
          <el-input placeholder="搜索..." v-model="searchInputDriver" class="input"></el-input>
        </div>
        <div class="card-wrapper" ref="driver">
          <el-card class="box-card" v-for="(item,index) of items['driver']" :key="item.value">
            <div slot="header" class="clearfix card-header">
              <span class="uname" v-text="item.uname"></span>
              <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
            </div>
            <div class="card-body">
              <img v-lazy="item.avatar" class="avatar">
              <div class="card-pinfo">
                <p class="info-item" v-for="(value,key) of itemMap">
                  <span class="item-tag" v-text="value"></span>
                  <span class="item-value">{{item[key]}}</span>
                </p>
              </div>
            </div>
          </el-card>
          <div class="empty-box-card"></div><!--最大列数为n, 填充n-2个高度为0的块使最后一排左对齐-->
          <div class="empty-box-card"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: "usermanagement",
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
          },]
        },
        items: {
          passenger: [],
          driver: []
        },
        itemMap: {
          uname: '司机',
          uid: '工号',
          cid: '车辆id',
          license: '车牌号',
          model: '车型',
          capacity: '载客数'
        },
        inputTimer: undefined
      }
    },
    mounted() {
      // console.log('mounted!')
      axios.get('/api/driverinfo')
        .then((res) => {
          this.itemsOrigin['driver'] = res.data.data
          this.items = Object.assign([], this.itemsOrigin)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    methods: {
      resultFilter(val, userType) {
        if (val !== '') {
          let result = Object.assign([], this.itemsOrigin[userType].filter((obj) => {
            for (let key in obj) {
              if (typeof(obj[key]) != 'String') {
                if (obj[key].toString().indexOf(val) !== -1)
                  return true
              }
              else if (obj[key].indexOf(val) !== -1) {
                return true
              }
            }
            return false
          }))
          this.items[userType] = result
          userType == 'driver' && this.$forceUpdate(this.$refs.driver)
          userType == 'passenger' && this.$forceUpdate(this.$refs.passenger)
        } else {
          this.items[userType] = this.itemsOrigin[userType]
          userType == 'driver' && this.$forceUpdate(this.$refs.driver)
          userType == 'passenger' && this.$forceUpdate(this.$refs.passenger)
        }
      }
    },
    watch: {
      searchInput(val) {
        clearTimeout(this.inputTimer)
        this.inputTimer = setTimeout(() => {
          this.resultFilter(val, 'passenger')
        }, 500)
      },
      searchInputDriver(val) {
        clearTimeout(this.inputTimer)
        this.inputTimer = setTimeout(() => {
          this.resultFilter(val, 'driver')
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/usermanagement';
</style>
