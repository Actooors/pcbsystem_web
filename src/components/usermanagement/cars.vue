<template>
  <div>
    <tab v-model="tabIndex">
      <tab-item selected>正在进行</tab-item>
      <tab-item>正在被约</tab-item>
      <tab-item>被约历史</tab-item>
      <tab-item>报修历史</tab-item>
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
    components: {
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
        RepairHistory: [
          {
            state: "成功",
            list: [
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
            list: [
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
