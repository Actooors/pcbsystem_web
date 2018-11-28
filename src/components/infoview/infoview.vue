<template>
  <div>
    <div class="search">
      <el-input placeholder="搜索..." v-model="searchInput" class="input"></el-input>
    </div>
    <div class="card-wrapper" ref="cardWrapper">
      <el-card class="box-card" v-for="(item,index) of itemsRender" :key="item.value">
        <div slot="header" class="clearfix card-header">
          <span class="uname"
                v-text="item.userState!=='正常'?item.userName+'('+item.userState+')':item.userName"
                :style="item.userState!=='正常'?'color: '+colorMap[item.userState]:'#000'"></span>
          <el-button style="clear: right;float:right;padding: 3px 0" type="text" v-if="buttonTitle"
                     @click.native="handleOnButtonClick(index)">
            {{buttonTitle}}
          </el-button>
          <el-button style="clear: right;float:right;padding: 3px 0" type="text" v-if="buttonTitle2"
                     @click.native="handleOnButtonClick2(index)">
            {{buttonTitle2}}
          </el-button>
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
    <div class="block" style="margin: 50px auto">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="parseInt(totalcars)">
      </el-pagination>
    </div>

    <div class="floatButton" v-if="plusButton">
      <button @click="$emit('on-plus-button-click')" class="el-icon-plus"></button>
    </div>

  </div>
</template>

<script>
  import {Masker} from 'vux'

  export default {
    name: "infoview",
    components: {
      Masker
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      itemMap: {
        type: Object
      },
      colorMap: {
        type: Object,
        required: true
      },
      searchDelay: {
        type: Number,
        default: 250
      },
      buttonTitle: {
        type: String
      },
      onButtonClick: {
        type: Function
      },
      buttonTitle2: {
        type: String
      },
      onButtonClick2: {
        type: Function
      },
      plusButton: {
        type: Boolean
      },
      onPlusButtonClick: {
        type: Function
      }
    },
    data() {
      return {
        totalcars: 0,
        pageNo: 1,
        pageSize: 10,
        itemsRender: this.items,
        inputTimer: undefined,
        searchInput: ''
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.pageNo = val;
      },
      handleSizeChange(val) {
        this.totalcars = val;
      },
      currentPage(val) {
        this.pageNo = val;
      },
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
      },
      handleOnButtonClick(index,) {
        console.log(index,"!!!!!!")
        this.$emit('on-button-click', index)
      },
      handleOnButtonClick2(index) {
        this.$emit('on-button-click2', index)
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
    computed: {
      titleColorStyle() {
        return 'color:' + this.titleColor
      }
    },
    mounted() {
      // console.log(this.items)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/infoview';
</style>
