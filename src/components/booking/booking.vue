<template>
  <div class="booking">
    <swiper loop auto :aspect-ratio=.4 :show-desc-mask=false
            :list="recommends" :index="swiperIndex" class="slider-wrapper needsclick" :interval=5000></swiper>
    <div class="information-wrapper">
      <div class="cells">
        <cell
          class="cell"
          title="上车地点"
          primary="content"
          :is-link=true>
          <popup-radio
            :readonly=false v-model="locationOption" :options="locationOptions"
            style="height:25px;">
            <p slot="popup-header" class="vux-1px-b">选择上车地点</p>
          </popup-radio>
        </cell>
        <calendartime class="cell" title="开始时间" popupHeaderTitle="预约开始时间" v-model="calendarValueStart" disable-past
                      :postpone=3 :pickerTimeData="pickerTimeDataStart"
                      @on-selected-date="handleOnSelectedDateStart"></calendartime>
        <calendartime class="cell" title="结束时间" popupHeaderTitle="预约结束时间" v-model="calendarValueEnd" disable-past
                      :startDate="startDate"
                      :postpone=5 :pickerTimeData="pickerTimeData"
                      @on-selected-date="handleOnSelectedDate"></calendartime>
        <!--<calendartime class="cell" title="结束时间" popupHeaderTitle="预约结束时间" v-model="calendarValueEnd" disable-past-->
        <!--:postpone=5></calendartime>-->

      </div>
      <el-button type="warning" class="btn-search" @click="handleOnClickSearch">搜索</el-button>
    </div>

    <div class="result-dialog-wrapper" v-if="showResults">
      <x-dialog v-model="showResults" class="result-dialog" hide-on-blur>
        <p class="result-dialog-title">可选车辆</p>
        <div class="img-box" style="height:90%;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
          <div class="result-dialog-title2">共找到{{resultItems.data.length}}条符合条件的结果</div>
          <div v-for="(item, index) of resultItems.data" class="car-info-wrapper" :key="item.value">
            <img v-lazy="item.avatar" class="avatar">
            <div class="info">
              <p class="info-item">
                <span class="item-tag">司机</span>
                <span class="item-value">{{item.driverName}}</span>
              </p>
              <p class="info-item">
                <span class="item-tag">车型</span>
                <span class="item-value">{{item.carModel}}</span>
              </p>
              <p class="info-item">
                <span class="item-tag">载客</span>
                <span class="item-value">{{item.carSize}}</span>
              </p>
            </div>
            <div class="operation">
              <x-button :gradients="['#FF5E3A', '#FF9500']" class="btn-book" @click.native="handleBooking(item)" mini>预约
              </x-button>
            </div>
          </div>
        </div>
        <div @click="showResults=false" class="btn-close">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div class="confirm-dialog">
      <confirm
        v-model="showConfirm"
        :close-on-confirm="false"
        title="确认预约"
        close-on-confirm
        @on-confirm="handleOnConfirm">
        <div class="confirm-info">
          <p class="info-item">
            <span class="item-tag">开始</span>
            <span class="item-value">{{calendarValueStart}}</span>
          </p>
          <p class="info-item">
            <span class="item-tag">结束</span>
            <span class="item-value">{{calendarValueEnd}}</span>
          </p>
          <p class="info-item">
            <span class="item-tag">司机</span>
            <span class="item-value">{{thisItem.driverName}}</span>
          </p>
          <p class="info-item">
            <span class="item-tag">车型</span>
            <span class="item-value">{{thisItem.carModel}}</span>
          </p>
          <p class="info-item">
            <span class="item-tag">载客</span>
            <span class="item-value">{{thisItem.carSize}}</span>
          </p>
        </div>
      </confirm>
    </div>

  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import store from 'store/store'
  import {mapState, mapMutations} from 'vuex'
  import Calendartime from 'components/calendar/calendartime'
  import {Cell, PopupRadio, Popup, XDialog, XButton, Confirm, Swiper} from 'vux'
  import {parseDate, dateFormat} from "../../common/js/dateformat"
  import axios from 'axios'

  var recommends = [
    {
      "url": "http://www.shu.edu.cn/",
      "img": "http://www.shu.edu.cn/2019pic/20190430-4.jpg",
      "id": 15017
    }, {
      "url": "http://www.shu.edu.cn/",
      "img": "http://www.shu.edu.cn/2019pic/20190505.jpg",
      "id": 15039
    }, {
      "url": "http://www.shu.edu.cn/",
      "img": "http://www.shu.edu.cn/2019pic/20190505-2.jpg",
      "id": 15014
    }, {
      "url": "http://www.shu.edu.cn/",
      "img": "http://www.shu.edu.cn/2019pic/20190506-2.jpg",
      "id": 15044
    }, {
      "url": "http://www.shu.edu.cn/",
      "img": "http://www.shu.edu.cn/2019pic/20190506.jpg",
      "id": 15046
    }
  ]

  export default {
    name: "booking",
    store,
    components: {
      Popup,
      Slider,
      Calendartime,
      Cell,
      PopupRadio,
      XDialog,
      XButton,
      Confirm,
      Swiper
    },
    data() {
      return {
        nocolor: false,
        disable: false,
        recommends: recommends,
        calendarValueStart: '',
        calendarValueEnd: '',
        endDate: '',
        locationOption: '行政楼',
        locationOptions: ['行政楼', '北门'],
        pickerTimeDataOrigin: [['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'], ['00', '30']],
        pickerTimeData: [['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'], ['00', '30']],
        pickerTimeDataStart: [['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'], ['00', '30']],
        showResults: false,
        resultItems: [],
        showConfirm: false,
        thisItem: {},
        swiperIndex: 0
      }
    },
    computed: {
      ...mapState(['where', 'bDate', 'eDate']),
      startDate() {
        let selectedStartDate = parseDate(this.calendarValueStart.split('　').join(' '))
        let endTime = new Date(selectedStartDate)
        endTime.setHours(parseInt(this.pickerTimeDataOrigin[0][this.pickerTimeDataOrigin[0].length - 1]))
        endTime.setMinutes(parseInt(this.pickerTimeDataOrigin[1][this.pickerTimeDataOrigin[1].length - 1]))
        if (this.compareDate(selectedStartDate, endTime, 1) >= 0) {
          return dateFormat(selectedStartDate.setDate(selectedStartDate.getDate() + 1), 'YYYY-MM-DD')
        } else {
          return this.calendarValueStart.split('　')[0]
        }
      },
      nowString() {
        return dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
      }
    },
    methods: {
      ...mapMutations(['InitDate']),
      handleOnClickSearch() {
        console.log(this.calendarValueStart)
        if (!this.calendarValueStart || !this.calendarValueEnd) {
          this.$notify.info({title: '请先选择预约起止时间！'})
          return
        }
        axios({
          url: 'http://118.25.130.89:8082/api/passenger/availableCar',
          method: 'get',
          params: {
            startDate: dateFormat(parseDate(this.calendarValueStart.replace('　', ' ')), 'YYYYMMDDhhmm'),
            endDate: dateFormat(parseDate(this.calendarValueEnd.replace('　', ' ')), 'YYYYMMDDhhmm')
          }
        })
          .then((res) => {
            if (res.data.code === "SUCCESS" && res.data.data.length) {
              console.log("yes", res.data)
              this.resultItems = res.data
              this.showResults = true
            } else {
              this.$message.warning(res.data.message)
              console.log(res.data)
            }
          })
          .catch((e) => {
            console.log(e)
          })

      },
      compareDate(startDate, endDate, hours = 0) {//输入不合法返回-2，endDate-startDate不超过hours小时返回1，相等返回0，超过hours小时返回-1
        if (!startDate || !endDate)
          return -2;
        let tmpDate = new Date(startDate)
        tmpDate.setHours(startDate.getHours() + hours)
        if (tmpDate > endDate) {
          return 1
        } else if (tmpDate == endDate) {
          return 0
        } else {
          return -1
        }
      },
      handleOnSelectedDate(val) {
        // console.log(val)
        let startDate = this.calendarValueStart.split('　')
        if (val !== startDate[0]) {
          this.pickerTimeData = Object.assign([], this.pickerTimeDataOrigin)
          return
        }
        let startTime = startDate[1].split(':')
        let tmp = this.pickerTimeDataOrigin[0].filter((x) => {
          return parseInt(x) > parseInt(startTime[0])
        })
        // console.log(tmp)
        this.$set(this.pickerTimeData, 0, tmp)
        if (parseInt(startTime[0]) + 1 == parseInt(this.pickerTimeDataOrigin[0][this.pickerTimeDataOrigin[0].length - 1])
          && startTime[1] == '30') {
          this.$set(this.pickerTimeData, 1, ['30'])
        }
      },
      handleBooking(item) {
        this.thisItem = item;
        this.showConfirm = true
      },
      handleOnSelectedDateStart(val) {
        let now = new Date()
        let startTime = [now.getHours(), now.getMinutes()]
        if (val !== dateFormat(now, 'YYYY-MM-DD')) {
          this.pickerTimeDataStart = Object.assign([], this.pickerTimeDataOrigin)
          return
        }
        let tmp = this.pickerTimeDataOrigin[0].filter((x) => {
          return parseInt(x) > parseInt(startTime[0])
        })
        this.$set(this.pickerTimeDataStart, 0, tmp)
        if (parseInt(startTime[0]) + 1 == parseInt(this.pickerTimeDataOrigin[0][this.pickerTimeDataOrigin[0].length - 1])
          && startTime[1] == '30') {
          this.$set(this.pickerTimeDataStart, 1, ['30'])
        }
      },
      handleOnConfirm() {
        axios({
          url: 'http://118.25.130.89:8082/api/passenger/orderCar',
          method: 'post',
          data: {
            "carId": this.thisItem.carId,
            "endDate": dateFormat(parseDate(this.calendarValueEnd.replace('　', ' ')), 'YYYYMMDDhhmm'),
            "place": this.locationOption,
            "requestReason": "用车需要",
            "startDate": dateFormat(parseDate(this.calendarValueStart.replace('　', ' ')), 'YYYYMMDDhhmm')
          }
        }).then((response) => {
          console.log(response.data)
          if (response.data.code === "SUCCESS") {
            this.$message({
              type: 'success',
              message: '请耐心等待管理员审核!',
            })
          } else {
            this.$message({
              type: 'warning',
              message: response.data.message
            })
          }
        }).catch((error) => {
          this.$message.error('预约失败, 请检查网络连接!')
          console.log(error)
        })
      }
    },
    created() {
      this.InitDate()
    },
    watch: {
      calendarValueStart(newVal) {
        //当endDate已经有值时，如果不合法，则将其清空
        if (!newVal || !this.calendarValueEnd)
          return;
        let startDate = parseDate(newVal.split('　').join(' '))
        let endDate = parseDate(this.calendarValueEnd.split('　').join(' '))
        if (this.compareDate(startDate, endDate, 1) >= 0) {
          //  当差距不超过1小时的时候是不合理的时间
          this.calendarValueEnd = ''
          // console.log('changed')
        }
      }
    }
  }
</script>
<style scoped>
  @import url('../../common/css/booking.css');
</style>
<style lang="less" scoped>
  @import '~vux/src/styles/close';
</style>
<style>
  @import url('../../common/css/booking-global.css');
</style>
