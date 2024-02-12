class CompressImg {
    constructor(options) {
        this.options = options;
        this.createBase64();
    }
    // 将文件流转换成base64格式
    createBase64() {
        // 创建文件读取器
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.options.file)
        fileReader.onload = (e) => {
            // 对转换后的base64进行压缩
            this.compress(e.target.result)
        }
    }
    compress(base64) {
        const img = new Image();
        const canvas = document.createElement('canvas');
        // 定义画笔
        const ctx = canvas.getContext('2d');
        // 为了获取选择图片的宽高(即原始样式)
        img.src = base64;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            // drawImage(图片,x,y,width,height)
            ctx.drawImage(img, 0, 0, img.width, img.height);
            // 自定义图片的质量,用于将canvas对象转为base64编码格式
            const url = canvas.toDataURL(this.options.file.type, this.options.quality);
            this.options.success(url);
        }
    }
}

const ipt = document.querySelector("#ipt");
ipt.addEventListener("change", (e) => {
    const fileObj = e.target.files[0];
    if (fileObj) {
        new CompressImg({
            file: fileObj,
            quality: 0.1,
            success(url) {
                const img = new Image();
                img.src = url;
                img.onload = function () {
                    document.body.appendChild(img)
                }
            }
        })
    }
})