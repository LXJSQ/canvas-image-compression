export class Compression{
  constructor(maxWith,maxHeight,imgQuality = 0.92){
    this.maxWith = maxWith;
    this.maxHeight = maxHeight;
    this.imgQuality = imgQuality
  }
  dataURItoBlob(dataURI , type){
    //atob() 方法用于解码使用 base-64 编码的字符串。
    var binary = atob(dataURI.split(",")[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
     // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
      array.push(binary.charCodeAt(i));
    }
    //Blob 对象表示一个不可变、原始数据的类文件对象
    return new Blob([new Uint8Array(array)], { type: type });
  }
  compressionIMage(file){
    if(file.type === "image/gif"){
      return true;
    }
    const _this = this;
    return new Promise(resolve => {
      //FileReader读取到文件中的数据
      const reader = new FileReader();
      const image = new Image();
      // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
      let maxWidth = this.maxWith, maxHeight = this.maxHeight;
      image.onload = imageEvent => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const originWidth = image.width ;
        const originHeight = image.height;

        let targetWidth = originWidth,
            targetHeight = originHeight;

        // 图片尺寸超过 maxWidth x maxHeight 的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
        }

        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 用image 绘制 canvas
        context.drawImage(image, 0, 0, targetWidth, targetHeight);
        
        const dataUrl = canvas.toDataURL(file.type,this.imgQuality);
        //binary large object
        const blobData = _this.dataURItoBlob(dataUrl, file.type);
        //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件
        resolve(blobData);
      };
      reader.onload = e => {
        image.src = e.target.result;
      };
      //读取文件内容，结果用data:url的字符串形式表示
      reader.readAsDataURL(file);
    });
  }
}