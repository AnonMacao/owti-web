# OWTI

`OWTI` 是一个基于《守望先锋》角色人格设定的单页测试网站。用户完成题目后，页面会根据人格向量匹配最接近的角色类型，并生成可导出的分享图。

## 本地预览

如果只是查看页面，直接打开 [index.html](./index.html) 也可以。

如果你要测试“导出分享图”这类浏览器下载行为，推荐走本地服务器而不是 `file://`：

```powershell
powershell -ExecutionPolicy Bypass -File .\start-local-server.ps1
```

然后在浏览器里打开：

```text
http://localhost:4173/
```

## 当前功能

- `100` 题题库中每次随机抽 `30` 题
- `8` 个连续人格维度
- `12` 个首发角色人格向量
- Top 1 / Top 3 匹配结果
- 角色 Q 版图接入
- 结果页分享图导出

## 项目结构

- [index.html](./index.html): 页面结构
- [styles.css](./styles.css): 页面样式
- [app.js](./app.js): 测试逻辑、结果渲染、分享图导出
- [model.js](./model.js): 角色设定、人格代号、向量数据
- [questions.js](./questions.js): 题库
- [assets/heroes](./assets/heroes): 角色立绘
- [start-local-server.ps1](./start-local-server.ps1): 本地预览服务器

## 发布到 GitHub Pages

这个项目是纯静态网站，最适合直接部署到 GitHub Pages。

### 方式一：网页直接上传

适合当前这台机器没有安装 `git` 的情况。

1. 去 GitHub 新建一个仓库，例如 `owti-web`
2. 打开仓库首页，点击 `Add file` -> `Upload files`
3. 把这个文件夹里的内容全部拖进去：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `model.js`
   - `questions.js`
   - `assets/`
   - `.nojekyll`
   - `README.md`
4. 上传完成后，进入仓库 `Settings` -> `Pages`
5. 在 `Build and deployment` 中选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
6. 保存后等待 1-3 分钟

最后你的网站通常会是：

```text
https://你的用户名.github.io/owti-web/
```

### 方式二：以后装好 git 再推送

如果你后面装了 git，可以在项目目录运行：

```powershell
git init
git add .
git commit -m "Initial OWTI site"
git branch -M main
git remote add origin https://github.com/你的用户名/owti-web.git
git push -u origin main
```

## 后续建议

- 加一个 favicon 和社交分享图
- 给结果页做手机端长图优化
- 接入统计，看各角色分布和完成率
- 如果后续想上自定义域名，可以再接 Cloudflare 或 GitHub Pages 自带域名配置
