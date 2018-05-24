<template>
  <div>
    <tab v-model="tabIndex">
      <tab-item selected @on-item-click="onItemClick">正在进行</tab-item>
      <tab-item @on-item-click="onItemClick">正在被约</tab-item>
      <tab-item @on-item-click="onItemClick">被约历史</tab-item>
      <tab-item @on-item-click="onItemClick">报修历史</tab-item>
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
    <div class="tab-swiper vux-center" v-else-if="tabIndex===3">
      <form-preview header-label="状态" v-for="(item,index) in RepairHistory" :header-value="item.state"
                    :body-items="item.list"
                    :class="item.state==='失败'?'history-form-red':'history-form-green'"
                    :key="item.value"></form-preview>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, FormPreview} from 'vux'

  export default {
    name: "cars",
    components:{
      Tab,
      TabItem,
      FormPreview
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
        ],
        RepairHistory:[
          {
            state: "成功",
            list:[
              {
                label: "报修人",
                value: "哇哈哈"
              },
              {
                label: "报修时间",
                value: "2018-05-21　19:38"
              },
              {
                label: "申报原因",
                value: "车胎爆了。"
              }
            ]
          },
          {
            state: "失败",
            list:[
              {
                label: "报修人",
                value: "金刚狼"
              },
              {
                label: "保修时间",
                value: "2018-05-22　00:00"
              },
              {
                label: "申报原因",
                value: "考试周到了，要去复习"
              },
              {
                label: "失败原因",
                value: "不许学习，给我开车！不许学习，给我开车！不许学习，给我开车！不许学习，给我开车！不许学习，给我开车！不许学习，给我开车！"
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scope>
  @import url('../../common/css/UserManagement.css');
</style>
