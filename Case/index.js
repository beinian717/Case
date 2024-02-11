class CompressImg{
    
    constructor(options){
        this.options=options;
        this.createBase64();
    }
    createBase64(){
        // 92.8kb
        const fileReader=new FileReader();
        fileReader.readAsDataURL(this.options.file)
        fileReader.onload=(e)=>{
           this.compress(e.target.result)
        }
    }
    compress(base64){
        const img=new Image();
        const canvas=document.createElement('canvas');
        const ctx=canvas.getContext('2d');
        img.src=base64;
        img.onload=()=>{
            canvas.width=img.width;
            canvas.height=img.height;
            ctx.drawImage(img,0,0,img.width,img.height);
            const url=canvas.toDataURL(this.options.file.type,this.options.quality);
            this.options.success(url);
        }
    }
}

const ipt = document.querySelector("#ipt");
ipt.addEventListener("change",(e)=>{
    const fileObj = e.target.files[0];
    if(fileObj){
        new CompressImg({
            file:fileObj,
            quality:0.1,
            success(url){
                console.log(url)
                const img=new Image();
                img.src=url;
                img.onload=function(){
                    document.body.appendChild(img)
                }
            }
        })
    }
})