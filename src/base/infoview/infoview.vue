<template>
  <div>
    <div class="search">
      <el-input placeholder="搜索..." v-model="searchInput" class="input"></el-input>
    </div>
    <div class="card-wrapper" ref="cardWrapper">
      <el-card class="box-card" v-for="(item,index) of itemsRender" :key="item.value">
        <div slot="header" class="clearfix card-header">
          <span class="uname" v-text="item.uname"></span>
          <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
        </div>
        <div class="card-body">
          <img v-lazy="item.avatar" class="avatar">
          <div class="card-pinfo">
            <p class="info-item" v-for="(value,key) of itemMap" v-if="itemMap">
              <span class="item-tag" v-text="value"></span>
              <span class="item-value" v-text="item[key]"></span>
            </p>
            <p class="info-item" v-for="(value,key) of item" v-else>
              <span class="item-tag" v-text="key"></span>
              <span class="item-value" v-text="value"></span>
            </p>
          </div>
        </div>
      </el-card>
      <div class="empty-box-card"></div><!--最大列数为n, 填充n-2个高度为0的块使最后一排左对齐-->
      <div class="empty-box-card"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "infoview",
    props: {
      items: {
        type: Array,
        require: true
      },
      itemMap: {
        type: Object
      },
      searchDelay: {
        type: Number,
        default: 250
      }
    },
    data() {
      return {
        itemsRender: this.items,
        inputTimer: undefined,
        searchInput: ''
      }
    },
    methods: {
      resultFilter(val) {
        if (val !== '') {
          let result = Object.assign([], this.items.filter((obj) => {
            for (let key in obj) {
              if (typeof(obj[key]) !== 'string') {
                if (obj[key].toString().indexOf(val) !== -1)
                  return true
              }
              else if (obj[key].indexOf(val) !== -1) {
                return true
              }
            }
            return false
          }))
          this.itemsRender = result
        } else {
          this.itemsRender = this.items
        }
        this.$forceUpdate(this.$refs.cardWrapper)
      }
    },
    watch: {
      items() {
        clearTimeout(this.inputTimer)
        this.resultFilter(this.searchInput)
      },
      searchInput(val) {
        clearTimeout(this.inputTimer)
        this.inputTimer = setTimeout(() => {
          this.resultFilter(val)
        }, this.searchDelay)
      },
    },
    mounted() {
      console.log(this.items)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/infoview';
</style>
