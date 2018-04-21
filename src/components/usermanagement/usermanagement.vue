<template>
  <div class="page-wrapper">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="乘客用户">
        <info-view :items="items['passenger']"
                   :item-map="itemMap['passenger']"></info-view>
      </el-tab-pane>
      <el-tab-pane label="司机用户">
        <info-view :items="items['driver']" :item-map="itemMap['driver']"
                   ref="driver"></info-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import axios from 'axios'
  import InfoView from 'base/infoview/infoview'

  export default {
    name: "usermanagement",
    components: {
      InfoView
    },
    data() {
      return {
        searchInput: '',
        searchInputDriver: '',
        itemsOrigin: {
          passenger: [{
            avatar: "http://xxxxx.com/xxxxx.jpg",
            uname: '莫之章乘客',
            uid: 16121663,
            license: '沪A0001',
            model: '奥迪A8',
            capacity: 4,
            cid: 32,
          },],
          driver: [{
            avatar: "http://xxxxx.com/xxxxx.jpg",
            uname: '莫之章',
            uid: 16121663,
            license: '沪A0001',
            model: '奥迪A8',
            capacity: 4,
            cid: 32,
          },]
        },
        items: {
          passenger: [],
          driver: []
        },
        itemMap: {
          passenger: {
            uname: '姓名',
            uid: '工号',
          },
          driver: {
            uname: '姓名',
            uid: '工号',
            cid: '车辆ID',
            license: '车牌号',
            model: '车型',
            capacity: '载客数'
          }
        },
        inputTimer: undefined
      }
    },
    mounted() {
      axios.get('/api/driverinfo')
        .then((res) => {
          this.itemsOrigin['driver'] = res.data.data
          this.items['driver'] = this.itemsOrigin['driver']
        })
        .catch((e) => {
          console.log(e)
        })
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/usermanagement';
</style>
