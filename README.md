
编辑器我只爱vim, 用vim写markdown总觉得不爽, 没有一个如意的插件。

So 花了1个小时，写了这个工具

运行方式

FILE=/Users/alvin/Projects/方案.md node live_load_markdown.js

再打开 http://localhost:8000

node 会自动看文件是否改了，改了刷新浏览器, 实际上是 long pulling
