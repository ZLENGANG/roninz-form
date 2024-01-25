# roninz-form | 基于 element-plus 的数据驱动表单组件

## 说明

roninz-form 是基于 [element-plus form](https://element-plus.org/zh-CN/component/form.html) 的二次封装, 主要特点:

- 内置 20 多种表单类型, 包括`单选`、`多选`、`标签`、`级联选择器`等;
- 内置表单校检;
- 表单布局和响应式表单
- 联动显示/隐藏、启用/禁用、重新获取 options 值
- 可以通过插槽自定义表单项;

而上面所说的一切只需要一行 html 和 数据即可实现, 即保证了质量, 又使得开发速度仿佛坐上 🚀!

## 安装

```bash
npm install roninz-form --save
```

## 使用

```js
import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import 'roninz-form/css';
import ElementPlus from 'element-plus';
import RoninzForm from 'roninz-form'

const app = createApp(App);
app.use(RoninzForm).use(ElementPlus).mount('#app');
```
