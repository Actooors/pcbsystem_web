<template>
  <div>
    <tab v-model="tabIndex">
      <tab-item selected @on-item-click="onItemClick">全部信息</tab-item>
      <tab-item @on-item-click="onItemClick">正在申请</tab-item>
      <tab-item @on-item-click="onItemClick">预约历史</tab-item>
    </tab>
    <div>
      <div class="tab-swiper vux-center" v-if="tabIndex===0">
        <form-preview header-label="预约状态" v-for="(item,index) in itemsProgress"
                      header-value="正在进行"
                      :body-items="listsProgress[index]"
                      :class="{'history-form-red':item.pass===4,
                  'history-form-green':item.pass===3,
                  'progressing-form-yellow':item.pass===2,
                  'applying-form-green':item.pass===1,
                  }"
                      :key="item.value"></form-preview>
      </div>
    </div>
    <div class="block" style="margin-top: 50px; margin-bottom: 100px">
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
      </el-pagination>
    </div>

    <div>
      <div class="tab-swiper vux-center" v-else-if="tabIndex===1">
        <form-preview header-label="预约状态" v-for="(item,index) in itemsApply"
                      :header-value="item.state"
                      :body-items="listsApply[index]"
                      :class="item.state==='正在申请'?'applying-form-green':null"
                      :key="item.value"></form-preview>
      </div>
    </div>
    <div class="block" style="margin-top: 50px; margin-bottom: 100px">
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
      </el-pagination>
    </div>

    <div>
      <div class="tab-swiper vux-center" v-else-if="tabIndex===2">
        <form-preview header-label="预约状态" v-for="(item,index) in itemsHistory" :header-value="item.state"
                      :body-items="item.list"
                      :class="item.state==='失败'?'history-form-red':'history-form-green'"
                      :key="item.value"></form-preview>
      </div>
    </div>
    <div class="block" style="margin-top: 50px; margin-bottom: 100px">
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
      </el-pagination>
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
        itemsApply: [
          {
            state: "正在申请",
            list: [
              {
                label: '申请人',
                value: '李瑞轩'
              },
              {
                label: '起始时间',
                value: '2018-04-18　08:00'
              },
              {
                label: '结束时间',
                value: '2018-04-19　08:00'
              },
              {
                label: '车辆牌照',
                value: '沪A-11111'
              }
            ],
          },
          {
            state: "正在申请",
            list: [
              {
                label: '申请人',
                value: '殷子良'
              },
              {
                label: '起始时间',
                value: '2018-04-20　08:00'
              },
              {
                label: '结束时间',
                value: '2018-04-21　08:00'
              },
              {
                label: '车辆牌照',
                value: '沪B-12345'
              }
            ],
          }
        ],
        listsApply: [],
        totalApply: 0,
        itemsHistory: [
          {
            state: "成功",
            list: [
              {
                label: '申请人',
                value: '李瑞轩'
              },
              {
                label: '起始时间',
                value: '2018-04-18　08:00'
              },
              {
                label: '结束时间',
                value: '2018-04-19　08:00'
              },
              {
                label: '车辆牌照',
                value: '沪A-11111'
              }
            ],
          },
          {
            state: "失败",
            list: [
              {
                label: '申请人',
                value: '殷子良'
              },
              {
                label: '起始时间',
                value: '2018-04-20　08:00'
              },
              {
                label: '结束时间',
                value: '2018-04-21　08:00'
              },
              {
                label: '车辆牌照',
                value: '沪B-12345'
              }
            ],
          }
        ],
        listsHistory: [],
        totalHistory: 0
      }
    },
    methods: {
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
            if(res.data.code==='SUCCESS') {
              console.log(res.data);
              this.itemsProgress = res.data.data.requestInfo
              this.totalProgress = res.data.data.total
              for(let i=0;i<this.itemsProgress.length;i++) {
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
                this.lists.push(list)
              }
            }else{
              this.$notify.error({
                message: response.data.message
              });
            }
            loading.close()
          });
        }
      }
    },

  }
</script>

<style scope>
  @import url('../../common/css/UserManagement.css');
</style>
