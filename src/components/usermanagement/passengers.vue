<template>
  <div>
    <tab v-model="tabIndex">
      <tab-item selected @on-item-click="onItemClick">正在进行</tab-item>
      <tab-item @on-item-click="onItemClick">正在预约</tab-item>
      <tab-item @on-item-click="onItemClick">预约历史</tab-item>
    </tab>
    <div class="tab-swiper vux-center" v-if="tabIndex===0">
      <form-preview header-label="预约状态" v-for="(item,index) in itemsProgress" :header-value="item.state"
                    :body-items="item.list"
                    :class="item.state==='正在进行'?'progressing-form-yellow':null"
                    :key="item.value"></form-preview>
    </div>

    <div class="tab-swiper vux-center" v-else-if="tabIndex===1">
      <form-preview header-label="预约状态" v-for="(item,index) in itemsApply" :header-value="item.state"
                    :body-items="item.list"
                    :class="item.state==='正在申请'?'applying-form-green':null"
                    :key="item.value"></form-preview>
    </div>

    <div class="tab-swiper vux-center" v-else-if="tabIndex===2">
      <form-preview header-label="预约状态" v-for="(item,index) in itemsHistory" :header-value="item.state"
                    :body-items="item.list"
                    :class="item.state==='失败'?'history-form-red':'history-form-green'"
                    :key="item.value"></form-preview>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, FormPreview} from 'vux'

  export default {
    name: "passengers",
    components: {Tab, TabItem, FormPreview},
    methods: {
      onItemClick(tabIndex) {
        console.log(tabIndex)
      }
    },
    data() {
      return {
        tabIndex: 0,
        itemsProgress: [
          {
            state: "正在进行",
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
            state: "正在进行",
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
            ]
          }
        ],
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
        ]
      }
    }
  }
</script>

<style scope>
  @import url('../../common/css/UserManagement.css');
</style>
