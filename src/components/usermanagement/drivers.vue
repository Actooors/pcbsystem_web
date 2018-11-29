<template>
  <div>
    <tab v-model="tabIndex">
      <tab-item selected @on-item-click="onItemClick">正在进行</tab-item>
      <tab-item @on-item-click="onItemClick">正在被约</tab-item>
      <tab-item @on-item-click="onItemClick">被约历史</tab-item>
    </tab>
    <div class="tab-swiper vux-center" v-if="tabIndex===0">
      <form-preview header-label="预约状态" v-for="(item,index) in itemsProgress"
                    :header-value="stateMap1(item.pass)"
                    :body-items="listsProgress[index]"
                    :class="{'history-form-red':item.pass===4,
                  'history-form-green':item.pass===3,
                  'progressing-form-yellow':item.pass===2,
                  'applying-form-green':item.pass===1,
                  }"
                    :key="item.value"></form-preview>
      <div class="block" style="margin-top: 10px; margin-bottom: 50px">
        <el-pagination
          @prev-click="handlePrevClick0"
          @next-click="handleNextClick0"
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageNoProgress"
          :total="totalProgress">
        </el-pagination>
      </div>
    </div>

    <div class="tab-swiper vux-center" v-else-if="tabIndex===1">
      <form-preview header-label="预约状态" v-for="(item,index) in itemsApply"
                    :header-value="stateMap2(item.pass)"
                    :body-items="listsApply[index]"
                    :class="{'history-form-red':item.pass===4,
                  'history-form-green':item.pass===3,
                  'progressing-form-yellow':item.pass===2,
                  'applying-form-green':item.pass===1,
                  }"
                    :key="item.value"></form-preview>
      <div class="block" style="margin-top: 10px; margin-bottom: 50px">
        <el-pagination
          @prev-click="handlePrevClick1"
          @next-click="handleNextClick1"
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageNoApply"
          :total="totalApply">
        </el-pagination>
      </div>
    </div>

    <div class="tab-swiper vux-center" v-else-if="tabIndex===2">
      <form-preview header-label="预约状态" v-for="(item,index) in itemsHistory"
                    :header-value="stateMap3(item.pass)"
                    :body-items="listsHistory[index]"
                    :class="{'history-form-red':item.pass===4,
                  'history-form-green':item.pass===3,
                  'progressing-form-yellow':item.pass===2,
                  'applying-form-green':item.pass===1,
                  }"
                    :key="item.value"></form-preview>
      <div class="block" style="margin-top: 10px; margin-bottom: 50px">
        <el-pagination
          @prev-click="handlePrevClick2"
          @next-click="handleNextClick2"
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageNoHistory"
          :total="totalHistory">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, FormPreview} from 'vux'
  import axios from 'axios'
  import Vue from 'vue';
  import Vuex from 'vuex'
  import store from "../../store/store";

  store
  Vue.use(Vuex)
  export default {
    name: "drivers",
    components: {
      Tab,
      TabItem,
      FormPreview
    },
    data() {
      return {
        tabIndex: 0,
        itemsProgress: [],
        listsProgress: [],
        totalProgress: 0,
        itemsApply: [],
        listsApply: [],
        totalApply: 0,
        itemsHistory: [],
        listsHistory: [],
        totalHistory: 0,
        pageSize: 10,
        pageNoProgress: 1,
        pageNoApply: 1,
        pageNoHistory: 1
      }
    },
    methods: {
      handlePrevClick0(){
        console.log("点击上一页")
        this.pageNoProgress--;
        this.initData0(this.pageNoProgress)
      },
      handleNextClick0() {
        console.log("点击下一页")
        this.pageNoProgress++;
        this.initData0(this.pageNoProgress)
      },
      handlePrevClick1(){
        console.log("点击上一页")
        this.pageNoApply--;
        this.initData0(this.pageNoApply)
      },
      handleNextClick1() {
        console.log("点击下一页")
        this.pageNoApply++;
        this.initData0(this.pageNoApply)
      },
      handlePrevClick2(){
        console.log("点击上一页")
        this.pageNoHistory--;
        this.initData0(this.pageNoHistory)
      },
      handleNextClick2() {
        console.log("点击下一页")
        this.pageNoHistory++;
        this.initData0(this.pageNoHistory)
      },
      stateMap1(requestState) {
        if (requestState === 1) {
          return '正在审核'
        } else if (requestState === 2) {
          return '已经取消'
        }
        else if (requestState === 3) {
          return '审核通过'
        } else if (requestState === 4) {
          return '申请失败'
        } else {
          return '未知状态'
        }
      },
      stateMap2(requestState) {
        if (requestState === 1) {
          return '正在申请'
        } else if (requestState === 2) {
          return '正在进行'
        }
        else if (requestState === 3) {
          return '审核通过'
        } else if (requestState === 4) {
          return '申请失败'
        } else {
          return '未知状态'
        }
      },
      stateMap3(requestState) {
        if (requestState === 1) {
          return '正在申请'
        } else if (requestState === 2) {
          return '正在进行'
        }
        else if (requestState === 3) {
          return '已经结束'
        } else if (requestState === 4) {
          return '申请失败'
        } else {
          return '未知状态'
        }
      },
      initData0(page) {
        console.log("传进来司机的工号是"+store.state.userId)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios({
          url: 'http://192.168.50.223:8081/api/admin/query/requestInfo/driver',
          method:'post',
          data:{
            "userId": store.state.userId,
            "type": 0,
            "page": page
          }
        }).then((res)=>{
          if (res.data.code === 'SUCCESS') {
            console.log(res.data);
            this.itemsProgress = res.data.data.requestInfo
            this.totalProgress = res.data.data.total
            for (let i = 0; i < this.itemsProgress.length; i++) {
              let list = [
                {
                  label: '申请人',
                  value: this.itemsProgress[i].userName
                },
                {
                  label: '起始时间',
                  value: this.itemsProgress[i].startDate
                },
                {
                  label: '结束时间',
                  value: this.itemsProgress[i].endDate
                },
                {
                  label: '车辆牌照',
                  value: this.itemsProgress[i].licence
                }
              ]
              this.listsProgress.push(list)
            }
          }else{
            this.$notify.error({
              message: response.data.message
            });
          }
          loading.close()
        });
      },
      initData1(page) {
        console.log("传进来司机的工号是"+store.state.userId)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios({
          url: 'http://192.168.50.223:8081/api/admin/query/requestInfo/driver',
          method: 'post',
          data: {
            "userId": store.state.userId,
            "type": 1,
            "page": page,
          }
        }).then((res) => {
          if (res.data.code === 'SUCCESS') {
            console.log(res.data);
            this.itemsApply = res.data.data.requestInfo
            this.totalApply = res.data.data.total
            for (let i = 0; i < this.itemsApply.length; i++) {
              let list = [
                {
                  label: '申请人',
                  value: this.itemsApply[i].userName
                },
                {
                  label: '起始时间',
                  value: this.itemsApply[i].startDate
                },
                {
                  label: '结束时间',
                  value: this.itemsApply[i].endDate
                },
                {
                  label: '车辆牌照',
                  value: this.itemsApply[i].licence
                }
              ]
              this.listsApply.push(list)
            }
          } else {
            this.$notify.error({
              message: response.data.message
            });
          }
          loading.close()
        })
      },
      initData2(page) {
        console.log("传进来司机的工号是"+store.state.userId)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios({
          url: 'http://192.168.50.223:8081/api/admin/query/requestInfo/driver',
          method: 'post',
          data: {
            "userId": store.state.userId,
            "type": 2,
            "page": page,
          }
        }).then((res) => {
          if (res.data.code === 'SUCCESS') {
            console.log(res.data);
            this.itemsHistory = res.data.data.requestInfo
            this.totalHistory = res.data.data.total
            for (let i = 0; i < this.itemsHistory.length; i++) {
              let list = [
                {
                  label: '申请人',
                  value: this.itemsHistory[i].userName
                },
                {
                  label: '起始时间',
                  value: this.itemsHistory[i].startDate
                },
                {
                  label: '结束时间',
                  value: this.itemsHistory[i].endDate
                },
                {
                  label: '车辆牌照',
                  value: this.itemsHistory[i].licence
                }
              ]
              this.listsHistory.push(list)
            }
          } else {
            this.$notify.error({
              message: response.data.message
            });
          }
          loading.close()
        })
      },
      onItemClick(tabIndex) {
        console.log(tabIndex)
        if(tabIndex===0) {
          this.initData0(1);
        }else if (tabIndex===1) {
          this.initData1(1);
        }else if(tabIndex===2) {
          this.initData2(1)
        }
      }
    },
    created() {
      this.initData0(1);
      this.initData1(1);
      this.initData2(1);
    }
  }
</script>

<style>

  .weui-form-preview__hd .weui-form-preview__label {
    color: #000000;
  }

  .weui-form-preview__bd .weui-form-preview__value {
    color: #000000;
  }

  .weui-form-preview__bd .weui-form-preview__label {
    color: black;
  }

  .weui-form-preview__hd::after {
    left: 0;
  }

  .vux-tab-item:hover {
    cursor: pointer;
  }

  .vux-tab .vux-tab-item.vux-tab-selected {
    font-weight: bold;
  }

  .applying-form-green {
    width: 100%;
    margin: 20px auto;
    box-shadow: 1px 0px 1px #484848;
  }

  .progressing-form-yellow {
    width: 100%;
    margin: 20px auto;
    box-shadow: 1px 0px 1px #484848;
  }

  .history-form-red {
    width: 100%;
    margin: 20px auto;
    box-shadow: 1px 0px 1px #484848;
  }

  .history-form-green {
    width: 100%;
    margin: 20px auto;
    box-shadow: 1px 0px 1px #484848;
  }

  .applying-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: green;
  }

  .progressing-form-yellow .weui-form-preview__hd .weui-form-preview__value {
    color: #d4bb00;
  }

  .history-form-red .weui-form-preview__hd .weui-form-preview__value {
    color: red;
  }

  .history-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: green;
  }

  @media screen and (min-width: 1024px) {
    .weui-dialog {
      width: 450px;
      max-height: 600px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  @media screen and (max-width: 1023px) {
    .weui-dialog {
      width: 300px;
      max-height: 500px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

</style>

