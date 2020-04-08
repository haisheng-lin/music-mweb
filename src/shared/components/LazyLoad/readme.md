## 懒加载

### 用法

```TypeScript
import LazyLoad from '@shared/components/LazyLoad';

const loading = (
  <img
    width="100%"
    height="300"
    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586344030088&di=aa9da75e2b400b964715d2d0f64adbc8&imgtype=0&src=http%3A%2F%2Fpn.gexing.com%2FG1%2FM00%2FAF%2F36%2FrBACFFZnl53xA2y3AABgimrtu8Q395.jpg"
    alt="loading"
  />
);

<LazyLoad loading={loading}>
  <img width="100%" height="300" src="your-image.png" alt="hello" />
</LazyLoad>
```

### API

| 参数    | 说明                     | 类型   | 默认值 |
| ------- | ------------------------ | ------ | ------ |
| loading | 可选，加载中展示的图片   | string | -      |
| error   | 可选，加载出错展示的图片 | string | -      |
| src     | 可选，要加载的图片       | string | -      |
