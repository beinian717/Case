(function () {

    // 获取歌词列表数据
    async function getLyricList() {
        return await fetch("https://study.duyiedu.com/api/lyrics").then(res => res.json()).then(res => res.data);
    }
    // 获取dom集合
    const doms = {
        ul: document.querySelector(".lrc"),
        audio: document.querySelector("audio")
    }
    // 
    const size = {
        lineHeight: 30,
        containerHeight: 420,
    }
    let filterData;
    // 处理歌词数据并将其显示到页面中
    /**
     *  将原始数据整理为以下数据结构
     * [
     *  {
     *      time:'',
     *      word:xxx
     *  }
     * ]
     */
    async function init() {
        let lrcData = await getLyricList();
        filterData = lrcData.split("\n").filter(l => l).map(item => {
            const parts = item.split("]")
            const timePart = parts[0].replace("[", "").split(":")
            return {
                word: parts[1],
                time: +timePart[0] * 60 + +timePart[1]
            }
        })
        console.log(filterData)
        // 将数据追加至页面中
        doms.ul.innerHTML = filterData.map(item => `<li>${item.word}</li>`).join("");
    }

    init()
    // 监听播放器的播放事件
    doms.audio.addEventListener("timeupdate", function () {
        setState(this.currentTime);
    })
    // 播放器的时间与数据中时间对比，找出处于当前播放的那句歌词
    function setState(time) {
        time += 3;
        // 清除之前的高亮状态
        const activeLi = document.querySelector(".active");
        activeLi && activeLi.classList.remove('active');
        const index = filterData.findIndex(item => item.time >= time) - 1;
        if (index < 0) return
        // 为当前的歌词添加高亮状态
        doms.ul.children[index].classList.add('active');

        // 设置歌词的滚动距离
        let top = size.lineHeight * index + size.lineHeight / 2 - size.containerHeight / 2;
        top = -top;
        if (top > 0) top = 0
        doms.ul.style.transform = `translateY(${top}px)`
    }
})();