# 🐛 问题修复说明

## 问题描述
用户反馈：页面只显示黑色背景，没有看到文字滚动。

## 问题原因
1. 初始配置 `config.text` 为空字符串
2. `currentConfig` 初始化时复制了空的 `config`
3. `loadConfig()` 没有正确设置默认文字
4. 语言初始化顺序问题：`t.value.welcome` 在语言设置前访问

## 修复方案

### 修改 1: 优化 loadConfig 函数
```javascript
// 加载配置
const loadConfig = () => {
  const saved = localStorage.getItem('marqueeConfig')
  if (saved) {
    try {
      const savedConfig = JSON.parse(saved)
      Object.assign(config, savedConfig)
      Object.assign(currentConfig, savedConfig)
      if (savedConfig.language) {
        currentLanguage.value = savedConfig.language
      }
    } catch (e) {
      console.error('加载配置失败:', e)
    }
  }
  
  // 如果没有文字，使用默认欢迎文字
  if (!config.text) {
    config.text = t.value.welcome
  }
  if (!currentConfig.text) {
    currentConfig.text = t.value.welcome
  }
}
```

### 修改 2: 优化 onMounted 执行顺序
```javascript
onMounted(() => {
  // 1. 初始化语言（必须先执行）
  initLanguage()
  
  // 2. 加载配置
  loadConfig()
  
  // 3. 确保有默认文字
  if (!currentConfig.text) {
    currentConfig.text = t.value.welcome
    config.text = t.value.welcome
  }

  // 4. 检查是否首次访问
  const hasVisited = localStorage.getItem('hasVisited')
  if (!hasVisited) {
    showWelcome.value = true
  }
})
```

## 验证步骤

### 1. 清除浏览器缓存
打开浏览器开发者工具（F12）：
```
Application → Storage → Clear site data
```
或者使用隐身模式测试。

### 2. 访问网站
```
http://localhost:5174/
```

### 3. 预期行为

#### 首次访问（没有缓存）
1. ✅ 显示欢迎弹窗
2. ✅ 背景是黑色（默认）
3. ✅ 弹窗后面应该有白色文字滚动（默认欢迎语）
4. ✅ 点击"开始配置"打开设置面板
5. ✅ 可以看到默认文字已经填入

#### 点击"开始配置"后
1. ✅ 欢迎弹窗关闭
2. ✅ 设置面板打开
3. ✅ 看到默认文字在滚动
4. ✅ 可以修改文字、颜色等
5. ✅ 点击"应用设置"生效

#### 再次访问（有缓存）
1. ✅ 不显示欢迎弹窗
2. ✅ 直接显示上次保存的配置
3. ✅ 文字正常滚动

### 4. 测试不同语言

#### 英语
```
http://localhost:5174/?lang=en
```
应该显示: "Welcome to LED Scrolling Sign ✨"

#### 简体中文
```
http://localhost:5174/?lang=zh-CN
```
应该显示: "欢迎使用跑马灯提示牌 ✨"

#### 日语
```
http://localhost:5174/?lang=ja
```
应该显示: "LEDスクロールサインへようこそ ✨"

## 如果仍然有问题

### 检查 1: 浏览器控制台
打开开发者工具（F12）→ Console 标签
- 查看是否有错误信息
- 查看是否有红色错误

### 检查 2: Vue DevTools
如果安装了 Vue DevTools：
- 检查 `currentConfig.text` 的值
- 检查 `config.text` 的值
- 应该都不为空

### 检查 3: LocalStorage
开发者工具 → Application → Local Storage
- 查看 `marqueeConfig` 的值
- 查看 `hasVisited` 的值

### 手动重置
如果需要完全重置：
```javascript
// 在浏览器控制台执行
localStorage.clear()
location.reload()
```

## 调试命令

### 启动开发服务器
```bash
cd /soft/light_sign
npm run dev
```

### 构建测试
```bash
npm run build
npm run preview
```

## 常见问题

### Q1: 欢迎弹窗显示，但后面还是黑色
**A**: 这是正常的，欢迎弹窗会覆盖整个屏幕。点击"开始配置"或点击弹窗外的区域关闭它，就能看到滚动文字了。

### Q2: 关闭欢迎弹窗后看不到文字
**A**: 检查：
1. 文字颜色是否与背景颜色相同（默认白色文字，黑色背景）
2. 字体大小是否太小
3. 浏览器控制台是否有错误

### Q3: 文字不滚动
**A**: 检查：
1. CSS 动画是否被禁用
2. 浏览器是否支持 CSS animations
3. 滚动速度是否设置过大

### Q4: 语言切换不生效
**A**: 
1. 清除浏览器缓存
2. 检查 URL 参数是否正确
3. 查看控制台错误信息

## 技术细节

### 默认配置
```javascript
config = {
  text: '',  // 初始为空，会在 onMounted 中设置
  textColor: '#ffffff',  // 白色
  bgColor: '#000000',    // 黑色
  fontSize: 80,          // 80px
  speed: 15,             // 15秒
  direction: 'left',     // 从右到左
  bold: true             // 粗体
}
```

### 默认欢迎文字（根据语言）
- 英语: "Welcome to LED Scrolling Sign ✨"
- 中文: "欢迎使用跑马灯提示牌 ✨"
- 日语: "LEDスクロールサインへようこそ ✨"
- ...等 19 种语言

## 修复确认

修复已应用到：
- ✅ `/soft/light_sign/src/views/Home.vue`

需要重启开发服务器：
```bash
# 如果服务器正在运行，按 Ctrl+C 停止
# 然后重新运行
npm run dev
```

或者直接刷新浏览器（Vite 会热更新）。

