<template>
  <div>
    <tab v-model="tabIndex">
      <tab-item selected @on-item-click="onItemClick">全部信息</tab-item>
      <tab-item @on-item-click="onItemClick">正在申请</tab-item>
      <tab-item @on-item-click="onItemClick">预约历史</tab-item>
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
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageNoProgress"
          :total="total">
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
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageNoApply"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <div class="tab-swiper vux-center" v-else-if="tabIndex===2">
      <form-preview header-label="预约状态" v-for="(item,index) in itemsHistory"
                    :header-value="stateMap3(item.pass)"
                    :body-items="listsHistory[index]"
                    :class="item.state==='失败'?'history-form-red':'history-form-green'"
                    :key="item.value"></form-preview>
      <div class="block" style="margin-top: 10px; margin-bottom: 50px">
        <el-pagination
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageNoHistory"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, FormPreview} from 'vux'
  import axios from 'axios'

  export default {
    name: "passengers",
    components: {Tab, TabItem, FormPreview},
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
      onItemClick(tabIndex) {
        console.log(tabIndex)
        if (tabIndex === 0) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          axios({
            url: 'http://192.168.50.223:8081/api/admin/query/requestInfo',
            method: 'post',
            data: {
              "userId": '16121670',
              "type": 0,
              "page": 1,
            }
          }).then((res) => {
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
            } else {
              this.$notify.error({
                message: response.data.message
              });
            }
            loading.close()
          });
        } else if (tabIndex === 1) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          axios({
            url: 'http://192.168.50.223:8081/api/admin/query/requestInfo',
            method: 'post',
            data: {
              "userId": '16121670',
              "type": 1,
              "page": 1,
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
        }
      }
    },

  }
</script>

<style scope>
  @import url('../../common/css/UserManagement.css');
</style>
