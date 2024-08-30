# Yank Note 数学扩展

by Mirion

## 实用功能

### 自定义背景图

外观设置中添加 `背景图路径` 和 `背景图不透明度` 选项.

命令面板中添加 `math: 切换背景图 (Shift+Alt+B)` 选项.

### 中文标点替换

命令面板中添加 `math: 替换标点符号 (Shift+Alt+F)` 选项.

## 语法增强

### 定理环境

添加下列仿 LaTeX 命令

`\begin{env}[info]`, 开始环境.

- `env`, 环境名, 要求存在. 末尾加 `*` 跳过编号.
- `info`, 附加信息.

`\end{env}`, 结束环境.

- `env`, 环境名, 要求与最近的 `\begin` 一致, 包括 `*`.

`\newtheorem{env}[shared]{text}[level]`, 新增定理环境.

- `env`, 环境名, 要求满足正则表达式 `[a-zA-Z@]+`.
- `shared`, 要共享计数器的环境名, 要求为空或存在且计数器非共享. 默认为空, 代表不共享. 若非空, 则优先于 `level`.
- `text`, 显示文本.
- `level`, 编号层级, 要求为 0-6 的整数. 默认为 0, 代表不编号.

`\setcounter{env}{number}`, 设置计数器.

- `env`, 环境名, 要求存在且计数器非共享.
- `number`, 要设置的数值, 要求是整数.

`\settheorem{env}{data}`, 设置环境属性.

- `env`, 环境名, 要求存在.
- `data`, 要设置的属性, 要求是合法的 JSON 表达式, 省略外层大括号, 不含 `text` 和 `counter` 项.

若参数跨行, 则需按以下格式指定限定符, 限定符不能为空.

```latex
\command{...}{<限定符>
...
<限定符>}{...}
```

### ~~TikZJax~~

~~添加 TikZJax 支持~~

### ~~引用~~

~~添加引用语法~~

### ~~目录增强~~

~~支持在目录中渲染 Markdown 行内语法~~

### KaTeX 增强

命令面板中添加 `math: 打开 KaTeX 配置文件` 和 ~~`math: 嵌入/移除嵌入的 KaTeX 配置`~~ 选项.

添加 KaTeX 配置项 `keepDisplayMode: boolean`, 设置为 `true` 统一以行间模式渲染. 其它配置项参见[官方文档](https://katex.org/docs/options.html).

~~支持来自 Markdown 语法的加粗, 倾斜~~.

## 主题样式

### Banana Space [预览](https://pic2.imgdb.cn/item/64586b980d2dde5777557ea5.png)

仿[香蕉空间](https://www.bananaspace.org/)主题, 支持暗色模式, 定理环境

添加下列样式

| **选择器** | **效果** |
| :--: | -- |
| `.skip-number` | 跳过编号 |
| `.auto-invert` | 暗色模式下反色 |
| `h1 + p` | 署名等附加信息 |

### Cyb's Note [预览](https://pic2.imgdb.cn/item/64586b980d2dde5777557e4a.png)

仿 Cyb 笔记主题, 支持暗色主题, 定理环境

添加下列样式

| **选择器** | **效果** |
| :--: | -- |
| `.skip-number` | 跳过编号 |
| `.auto-invert` | 暗色模式下反色 |
| `h1 + p` | 署名等附加信息 |
| `h2.reference + ol` | 参考文献列表 |