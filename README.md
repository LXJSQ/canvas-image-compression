# canvas-image-compression

一款基于 `canvas` 的前端压缩工具

## 特性

- 基于 `canvas` 开发 图片压缩工具 
- 可以在 `react`，`vue`，`H5` 多端适配运行
- 提供友好的 API，可灵活的使用组件

## 关于 canvas-image-compression

canvas-image-compression 基于canvas API drawImage、及toDataURL对大于指定宽高（不指定是默认宽高400*500）的图片进行缩小尺寸压缩，不指定图片质量的情况下，默认原来图片质量的0.92。


## 安装

```bash
npm install canvas-image-compression
```

## 使用

在代码中 `import` 需要的组件并按照文档说明使用

```js
import { Compression } from 'canvas-image-compression'

let compression = new Compression(maxWidth,maxHeight,imgQuilty);
let newfile = compression.compressionIMage(originFile);
```

