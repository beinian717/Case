<template>
  <div class="home">
    <h2>Visual List</h2>
    <VirtualList :list="list" :showNumber="10" />
  </div>
</template>

<script>
import VirtualList from '@/components/VirtualList.vue'

export default {
  name: 'Home',
  components: {
    VirtualList
  },

  computed: {
    // 要渲染的所有数据
    list() {
      return Array(100).fill("").map((item, index) => {
        return {
          id: index,
          content: "列表数据内容" + index
        }
      })
    }
  }
}
</script>
<style scoped>
h2 {
  width: 600px;
  text-align: center;
  margin: 0 auto;
}
</style>