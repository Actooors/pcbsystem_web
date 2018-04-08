<template>
  <div class="vux-calendar-cus">
    <cell
      :title="title"
      primary="content"
      @click.native="onClick"
      :is-link="!readonly">
      <span class="vux-cell-placeholder" v-if="shouldShowPlaceholder">{{ placeholder }}</span>
      <span class="vux-cell-value" v-if="!shouldShowPlaceholder">{{ displayFormat(value, getType(value)) }}</span>
    </cell>

    <div v-transfer-dom="shouldTransferDom">
      <popup
        v-model="show"
        @on-show="onPopupShow"
        @on-hide="onPopupHide"
        style="overflow-y: hidden">

        <!--<popup-header-->
        <!--v-if="shouldConfirm"-->
        <!--@on-click-left="onClickLeft"-->
        <!--@on-click-right="onClickRight"-->
        <!--:title="popupHeaderTitle"-->
        <!--left-text="取消"-->
        <!--right-text="确定"></popup-header>-->

        <slot name="popup-before-calendar"></slot>

        <inline-calendar
          v-model="currentValue"
          @on-change="onCalendarValueChange"
          @on-select-single-date="onSelectSingleDate"
          :render-month="renderMonth"
          :start-date="startDate"
          :end-date="postpone===0?endDate:postponeDate"
          :show-last-month="showLastMonth"
          :show-next-month="showNextMonth"
          :highlight-weekend="highlightWeekend"
          :return-six-rows="returnSixRows"
          :hide-header="hideHeader"
          :hide-week-list="hideWeekList"
          :replace-text-list="replaceTextList"
          :weeks-list="weeksList"
          :render-function="renderFunction"
          :render-on-value-change="renderOnValueChange"
          :disable-past="disablePast"
          :disable-future="disableFuture"
          :marks="marks"
          :disable-weekend="disableWeekend"
          :disable-date-function="disableDateFunction"
          style="overflow: hidden;"
        ></inline-calendar>

      </popup>
    </div>
  </div>
</template>

<script>
  import {InlineCalendar, Popup, Cell, TransferDom, PopupHeader} from 'vux'
  import props from 'vux/src/components/inline-calendar/props'
  import format from 'vux/src/tools/date/format'

  const getType = (value) => {
    if (typeof value === 'string') {
      return 'string'
    }
    if (Object.prototype.toString.call(value) === '[object Array]') {
      return 'array'
    }
  }

  const pure = function (value) {
    const type = getType(value)
    if (type === 'string') {
      return value
    } else if (type === 'array') {
      return JSON.parse(JSON.stringify(value))
    }
  }

  const Props = {
    ...props(),
    title: {
      type: String,
      required: true
    },
    placeholder: String,
    showPopupHeader: Boolean,
    popupHeaderTitle: String,
    displayFormat: {
      type: Function,
      default: (
        value) => {
        return typeof value === 'string' ? value : value.join(', ')
      }
    },
    // for test only
    shouldTransferDom: {
      type: Boolean,
      default: true
    },
    readonly: Boolean,
    postpone: {
      type: Number,
      default: 0
    }
  }

  export default {
    name: 'calendar',
    directives: {
      TransferDom
    },
    components: {
      InlineCalendar,
      Popup,
      PopupHeader,
      Cell
    },
    computed: {
      shouldConfirm() {
        return this.showPopupHeader || this.getType(this.value) === 'array'
      },
      shouldShowPlaceholder() {
        if (typeof this.value === 'string' && !this.value) {
          return true
        }
        if (getType(this.value) === 'array' && !this.value.length) {
          return true
        }
        return false
      },
      postponeDate() {
        let date = null
        if (this.startDate) {
          console.log(this.parseDate(this.startDate))
          date = this.parseDate(this.startDate)
        } else {
          date = new Date()

        }
        return format(date.setDate(date.getDate() + this.postpone), 'YYYY-MM-DD')
      }
    },
    created() {
      let date = new Date()
      if (this.value === 'TODAY') {
        this.currentValue = format(date, 'YYYY-MM-DD')
        this.$emit('input', this.currentValue)
      } else {
        if (this.getType(this.value) === 'string') {
          this.currentValue = this.value
        } else {
          this.currentValue = pure(this.value)
        }
      }

    },
    props: Props,
    methods: {
      onPopupShow() {
        this.$emit('on-show')
      },
      onPopupHide() {
        this.$emit('on-hide')
        // reset value to show value
        this.currentValue = pure(this.value)
      },
      getType,
      onClickLeft() {
        this.show = false
        this.currentValue = pure(this.value)
      },
      onClickRight() {
        this.show = false
        const value = pure(this.currentValue)
        this.$emit('input', value)
      },
      onClick() {
        if (!this.readonly) {
          this.show = true
        }
      },
      onCalendarValueChange(val) {
        if (!this.shouldConfirm) {
          this.show = false
          this.$emit('input', pure(val))
        }
      },
      onSelectSingleDate() {
        if (!this.shouldConfirm) {
          this.show = false
        }
      },
      parseDate(str) {
        return new Date(Date.parse(str.replace(/-/g, "/")))
      }
    },
    watch: {
      value(newVal, oldVal) {
        if (this.getType(this.value) === 'string') {
          this.currentValue = newVal
          this.$emit('on-change', newVal)
        } else {
          if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
            this.$emit('on-change', pure(newVal))
          }
          this.currentValue = pure(newVal)
        }
      }
    },
    data() {
      return {
        show: false,
        currentValue: '',
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/base/fn';
  @import '~vux/src/styles/weui/base/mixin/setOnepx.less';
</style>

