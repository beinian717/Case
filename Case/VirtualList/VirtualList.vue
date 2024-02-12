<template>
    <div class="list-container" ref="listContainer" @scroll="handleScroll">
        <!--模拟滚动条 否则列表就不会滚动了 -->
        <div ref="scrollContainer"></div>
        <div class="list-wrap" ref="listWrap">
            <div class="list-item" v-for="item in showList" :key="item.index">{{ item.content }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // item的高度
            itemHeight: 60,
            // 截取列表的开始下标
            start: 0,
            // 截取列表的结束下标
            end: 10
        }
    },
    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 总共需要显示的列表数目
        showNumber: {
            type: Number,
            default: 10
        }
    },
    computed: {
        showList() {
            return this.list.slice(this.start, this.end);
        }
    },
    mounted() {
        // 计算出可视区域的总高度
        this.$refs.listContainer.style.height = this.itemHeight * this.showNumber + 'px';

        // 设置滚动条的值以此来模拟真实的滚动效果 = 每个item的高度乘列表总高度
        this.$refs.scrollContainer.style.height = this.list.length * this.itemHeight + 'px';

    },
    methods: {
        handleScroll() {
            // 滚动条的距离比上itemHeigh计算出滚动了多少了item
            this.start = ~~(this.$refs.listContainer.scrollTop / this.itemHeight); // ~~运算符为取整数
            this.end = this.start + this.showNumber;
            // console.log(this.start, this.end)
            // 因为滚动会造成list-wrap这个容器向上滚动所以需要实时计算其top值
            this.$refs.listWrap.style.top = this.start * this.itemHeight + 'px'
        }
    }
}
</script>

<style scoped>
.list-container {
    width: 600px;
    border: 1px solid red;
    margin: 10px auto;
    position: relative;
    overflow-y: scroll;
}

.list-wrap {
    width: 100%;
    position: absolute;
    top: 0;
}

.list-item {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border: 1px solid #eee;
    text-align: center;
}
</style>