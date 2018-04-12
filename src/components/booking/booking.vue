<template>
  <div class="booking">
    <div class="slider-wrapper" v-if="recommends.length">
      <slider>
        <div v-for="item in recommends">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl">
          </a>
        </div>
      </slider>
    </div>
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
                      :postpone=3></calendartime>
        <calendartime class="cell" title="结束时间" popupHeaderTitle="预约结束时间" v-model="calendarValueEnd" disable-past
                      :startDate="startDate"
                      :postpone=5 :pickerTimeData="pickerTimeData" :afterDate="calendarValueStart.split('　')[0]"
                      @on-selected-date="handleOnSelectedDate"></calendartime>
        <!--<calendartime class="cell" title="结束时间" popupHeaderTitle="预约结束时间" v-model="calendarValueEnd" disable-past-->
        <!--:postpone=5></calendartime>-->

      </div>
      <el-button type="warning" class="btn-search" @click="search">搜索</el-button>
    </div>

    <div class="result-dialog-wrapper" v-if="showResults">
      <x-dialog v-model="showResults" class="result-dialog">
        <p class="result-dialog-title">可选车辆</p>
        <div class="img-box" style="height:90%;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
          <div class="result-dialog-title2">共找到{{resultItems.data.length}}条符合条件的结果</div>
          <div v-for="(item, index) of resultItems.data" class="car-info-wrapper" :key="item.value">
            <img v-lazy="item.avatar" class="avatar">
            <div class="info">
              <p class="info-item">
                <span class="item-tag">司机</span>
                <span class="item-value">{{item.owner}}</span>
              </p>
              <p class="info-item">
                <span class="item-tag">车型</span>
                <span class="item-value">{{item.model}}</span>
              </p>
              <p class="info-item">
                <span class="item-tag">载客</span>
                <span class="item-value">{{item.capacity}}</span>
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
            <span class="item-value">{{thisItem.owner}}</span>
          </p>
          <p class="info-item">
            <span class="item-tag">车型</span>
            <span class="item-value">{{thisItem.model}}</span>
          </p>
          <p class="info-item">
            <span class="item-tag">载客</span>
            <span class="item-value">{{thisItem.capacity}}</span>
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
  import {Cell, PopupRadio, Popup, XDialog, XButton, Confirm} from 'vux'
  import {parseDate, dateFormat} from "../../common/js/dateformat"
  import axios from 'axios'

  var recommends = [
    {
      "linkUrl": "https://y.qq.com/m/act/classic/index.html?ADTAG=jiaodiantu",
      "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003gXZ394C6bbc.jpg",
      "id": 15017
    }, {
      "linkUrl": "https://y.qq.com/m/act/trumpcard3/index.html?ADTAG=jiaodiantu",
      "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000002S3pTc18lhON.jpg",
      "id": 15039
    }, {
      "linkUrl": "https://y.qq.com/m/act/sfhd/127.html?ADTAG=jdt",
      "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003KDGoY4ZLWXR.jpg",
      "id": 15014
    }, {
      "linkUrl": "http://y.qq.com/w/album.html?albummid=0012os0a3bZBGC",
      "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000002htFUh4X3Vbb.jpg",
      "id": 15044
    }, {
      "linkUrl": "http://y.qq.com/w/album.html?albummid=000WkLHX0mikpL",
      "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000000ZPAFz0OtHMY.jpg",
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
      Confirm
    },
    data() {
      return {
        recommends: recommends,
        calendarValueStart: '',
        calendarValueEnd: '',
        endDate: '',
        locationOption: '行政楼',
        locationOptions: ['行政楼', '北门'],
        pickerTimeDataOrigin: [['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'], ['00', '30']],
        pickerTimeData: [['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'], ['00', '30']],
        showResults: false,
        resultItems: [],
        showConfirm: false,
        thisItem: {}
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
      }
    },
    methods: {
      ...mapMutations(['InitDate']),
      search() {
        console.log("调用搜索")
        axios.get('/api/retrieval')
          .then((res) => {
            if (res.data.code === "SUCCESS" && res.data.data.length) {
              console.log("yes", res.data)
              this.resultItems = res.data
              this.showResults = true
            } else {
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
          // console.log(val)
          // console.log(startDate[0])

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
      handleOnConfirm() {

      }
    },
    created() {
      this.InitDate()
      // console.log(dateFormat(this.bDate, 'YYYY-MM-DD HH'))
      // console.log(dateFormat(this.eDate, 'YYYY-MM-DD HH'))
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
