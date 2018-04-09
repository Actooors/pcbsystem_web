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
          @click.native="onClickLocation"
          :is-link=true>
          <popup-radio
            :readonly=false @on-hide="onChosenLocation" v-model="locationOption" :options="locationOptions"
            style="height:25px;">
            <p slot="popup-header" class="vux-1px-b">选择上车地点</p>
          </popup-radio>
        </cell>
        <calendartime class="cell" title="开始时间" v-model="calendarValueStart" disable-past :postpone=3></calendartime>
        <calendartime class="cell" title="结束时间" v-model="calendarValueEnd" disable-past :startDate="calendarValueStart"
                      :postpone=5 :showPopupHeader=true></calendartime>

      </div>
      <el-button type="warning" class="btn-search" @click="search">搜索</el-button>
    </div>


  </div>

</template>

<script>
  import Slider from 'base/slider/slider'
  import store from 'store/store'
  import {mapState, mapMutations} from 'vuex'
  import Calendartime from 'components/calender/calendertime'
  import {Cell, PopupRadio} from 'vux'
  import format from 'vux/src/tools/date/format'
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
      Slider,
      Calendartime,
      Cell,
      PopupRadio
    },
    data() {
      return {
        recommends: recommends,
        calendarValueStart: 'TODAY',
        calendarValueEnd: 'TODAY',
        endDate: '',
        locationOption: '行政楼',
        locationOptions: ['行政楼', '北门']
      }
    },
    computed: mapState(['where', 'bDate','eDate']),
    methods: {
      ...mapMutations(['InitDate']),
      search() {
        console.log("调用搜索")
      },
      onClickLocation() {

      },
      onChosenLocation() {

      }
    },
    created() {
      this.InitDate()
      console.log(format(this.bDate,'YYYY-MM-DD HH'))
      console.log(format(this.eDate,'YYYY-MM-DD HH'))

    }
  }
</script>
<style scoped>
  @import url('../../common/css/booking.css');
</style>

<style>
  .weui-cell_radio .weui-cell__bd{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
  }
  .vux-popup-dialog {
    overflow-y: hidden !important;
  }
</style>
