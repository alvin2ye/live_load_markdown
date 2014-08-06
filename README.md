### 缘起

编辑器我只爱vim, 用vim写markdown总觉得不爽, 没有一个如意的插件, 就写了这个工具.

### 安装
```
git clone https://github.com/alvin2ye/live_load_markdown.git
cd live_load_markdown
npm install node-markdown
```

### 运行方式

```
FILE=README.md node live_load_markdown.js
```

打开 http://localhost:8000

node会自动看文件是否改了, 改了刷新浏览器, 实际上是 long pulling

样式就自己加吧

加上分屏工具, 写得真爽
