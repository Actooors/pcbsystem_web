<template>
  <div>
    <form-preview header-label="预约状态" v-for="(item,index) of items" header-value="正在申请" :body-items="item"
                  class="applying-form-green"
                  :key="item.value"></form-preview>
  </div>
</template>

<script>
  import {FormPreview} from 'vux'
  import axios from 'axios'

  export default {
    name: "applying",
    components: {
      FormPreview
    },
    data() {
      return {
        items: [],
        lists:[]
      }
    },
    methods: {
      initData() {
        axios({
          url: '//localhost:8081/api/passenger/query/request',
          method: 'post',
          data: {
            "page": this.pageNo,
            "type": 1
          }
        }).then((response) => {
          if (response.data.code === 'SUCCESS') {
            this.items = response.data.data.filter((item) => {
              return item.pass === 0
            })
            for (let i = 0; i < this.items.length; i++) {
              let list = [
                {
                  label: '申请人',
                  value: localStorage.getItem('userName')
                },
                {
                  label: '起始时间',
                  value: this.items[i].beginTime
                },
                {
                  label: '结束时间',
                  value: this.items[i].endTime
                },
                {
                  label: '车辆牌照',
                  value: this.items[i].carNumber
                }
              ]
              this.lists.push(list)
            }
          } else {
            console.log(response.data.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created(){
      this.initData()
    }
  }
</script>


<style>
  .applying-form-green {
    margin: 20px auto;
  }

  .applying-form-green:hover {
    box-shadow: 1px 1px 100px #07e629;
  }

  .applying-form-green .weui-form-preview__hd .weui-form-preview__value {
    color: green;
  }
</style>

<style scoped>
  @media screen and (min-width: 1024px) {
    .applying-form-red {
      width: 40%;
    }

    .applying-form-green {
      width: 40%;
    }
  }
</style>

