# 🔍 调试指南 - 文字不显示问题

## 当前状态
- ✅ 背景颜色可以修改（说明组件在工作）
- ❌ 跑马灯文字不显示

## 已完成的修复

### 修复 1: 设置默认文字
```javascript
// 配置数据现在有默认值
const config = reactive({
  text: 'Welcome to LED Scrolling Sign ✨',  // 不再是空字符串
  textColor: '#ffffff',
  bgColor: '#000000',
  fontSize: 80,
  speed: 15,
  direction: 'left',
  bold: true
})
```

### 修复 2: MarqueeText 组件默认值
```javascript
// 如果没有传入文字，显示默认文字
const displayText = computed(() => {
  const text = props.text || 'LED Scrolling Sign'
  return `${text}　　　　　${text}　　　　　${text}　　　　　${text}`
})
```

### 修复 3: 简化文字传递
```vue
<!-- 直接传递 currentConfig.text -->
<MarqueeText 
  :text="currentConfig.text"
  ...
/>
```

## 🧪 测试步骤

### 测试 1: 纯 HTML 测试
打开浏览器访问:
```
http://localhost:5174/test.html
```

**预期结果**: 应该看到白色文字在黑色背景上滚动

**如果看不到**:
- 检查浏览器是否支持 CSS animations
- 按 F12 查看控制台输出
- 检查文字元素是否存在

### 测试 2: Vue 应用测试

#### 2.1 清除缓存
```javascript
// 在浏览器控制台（F12）执行
localStorage.clear()
sessionStorage.clear()
location.reload()
```

#### 2.2 访问主页
```
http://localhost:5174/
```

#### 2.3 检查控制台
按 F12，在 Console 标签执行:
```javascript
// 检查 Vue 实例
console.log('Text:', document.querySelector('.marquee-text'))
console.log('Text content:', document.querySelector('.marquee-text')?.textContent)
console.log('Text style:', document.querySelector('.marquee-text')?.style.cssText)

// 检查容器
console.log('Container:', document.querySelector('.marquee-container'))
console.log('Container bg:', document.querySelector('.marquee-container')?.style.backgroundColor)
```

#### 2.4 检查元素
在 Elements 标签中：
1. 找到 `.marquee-container`
2. 找到 `.marquee-text`
3. 查看其内容和样式

### 测试 3: 检查 Vue DevTools（如果已安装）

打开 Vue DevTools:
1. 找到 `Home` 组件
2. 查看 `currentConfig.text` 的值
3. 查看 `config.text` 的值
4. 应该都是 "Welcome to LED Scrolling Sign ✨"

## 🔍 可能的原因

### 原因 1: CSS 动画被禁用
**检查方法**:
```javascript
// 在控制台执行
const text = document.querySelector('.marquee-text')
console.log(getComputedStyle(text).animation)
```

**应该显示**: `marquee-left 15s linear 0s infinite normal none running`

**如果不是**: 浏览器可能禁用了动画

### 原因 2: 文字颜色与背景相同
**检查方法**:
```javascript
const text = document.querySelector('.marquee-text')
const container = document.querySelector('.marquee-container')
console.log('Text color:', getComputedStyle(text).color)
console.log('Background:', getComputedStyle(container).backgroundColor)
```

**应该是**:
- Text color: `rgb(255, 255, 255)` (白色)
- Background: `rgb(0, 0, 0)` (黑色)

### 原因 3: z-index 问题
**检查方法**:
```javascript
const welcome = document.querySelector('.welcome-overlay')
const config = document.querySelector('.config-panel')
console.log('Welcome z-index:', welcome?.style.zIndex)
console.log('Config z-index:', config?.style.zIndex)
```

欢迎弹窗和配置面板的 z-index 都很高，可能遮挡了文字。

### 原因 4: 字体大小为 0
**检查方法**:
```javascript
const text = document.querySelector('.marquee-text')
console.log('Font size:', getComputedStyle(text).fontSize)
```

**应该是**: `80px`

### 原因 5: 文字在屏幕外
**检查方法**:
```javascript
const text = document.querySelector('.marquee-text')
const rect = text?.getBoundingClientRect()
console.log('Text position:', rect)
console.log('Viewport:', {width: window.innerWidth, height: window.innerHeight})
```

## 🛠️ 手动修复

### 方案 1: 强制显示文字
在浏览器控制台执行:
```javascript
const text = document.querySelector('.marquee-text')
if (text) {
  text.style.color = '#ff0000'  // 改为红色，更明显
  text.style.fontSize = '100px'
  text.style.zIndex = '9999'
  text.textContent = 'TEST TEXT - 测试文字'
}
```

### 方案 2: 临时禁用欢迎弹窗
在浏览器控制台执行:
```javascript
localStorage.setItem('hasVisited', 'true')
location.reload()
```

### 方案 3: 临时关闭配置面板
在浏览器控制台执行:
```javascript
const panel = document.querySelector('.config-panel')
if (panel) panel.style.display = 'none'
```

## 📸 请提供以下信息

如果问题仍然存在，请提供：

1. **浏览器信息**:
   - 浏览器名称和版本
   - 操作系统

2. **控制台输出**:
   - F12 → Console 标签
   - 截图或复制所有错误信息

3. **元素检查**:
   - F12 → Elements 标签
   - 找到 `.marquee-text` 元素
   - 截图显示其 HTML 和 Styles

4. **测试结果**:
   - test.html 能否显示？
   - 文字颜色是否正确？
   - 控制台有什么输出？

## 🚀 快速测试命令

在浏览器控制台一次性运行所有检查:
```javascript
console.log('=== 跑马灯调试信息 ===')
const text = document.querySelector('.marquee-text')
const container = document.querySelector('.marquee-container')
const wrapper = document.querySelector('.marquee-wrapper')

console.log('1. 文字元素:', text)
console.log('2. 文字内容:', text?.textContent?.substring(0, 50))
console.log('3. 文字颜色:', getComputedStyle(text).color)
console.log('4. 字体大小:', getComputedStyle(text).fontSize)
console.log('5. 动画:', getComputedStyle(text).animation)
console.log('6. 背景色:', getComputedStyle(container).backgroundColor)
console.log('7. 容器尺寸:', container?.getBoundingClientRect())
console.log('8. 文字位置:', text?.getBoundingClientRect())
console.log('9. Wrapper:', wrapper?.getBoundingClientRect())
console.log('10. LocalStorage:', {
  hasVisited: localStorage.getItem('hasVisited'),
  config: localStorage.getItem('marqueeConfig')
})
console.log('=== 调试信息结束 ===')
```

将输出结果发给我，我可以帮你进一步诊断！

