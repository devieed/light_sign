# 文字旋转角度功能

## 更新时间
2026-01-17

## 新增功能

添加了**文字旋转角度**选项，支持 4 种旋转角度：
- **0°** - 正常显示（默认）
- **45°** - 向右倾斜 45 度
- **90°** - 垂直显示（旋转 90 度）
- **135°** - 向左倾斜 135 度

## 功能特点

### 1. 实时预览
- 修改旋转角度后**立即生效**
- 无需点击"应用"按钮
- 配置自动保存

### 2. 多语言支持
为 19 种语言添加了旋转相关的翻译：
- 中文（简体/繁体）
- 英语、日语、韩语
- 西班牙语、法语、德语、俄语
- 阿拉伯语、葡萄牙语、意大利语
- 荷兰语、波兰语、土耳其语
- 越南语、泰语、印尼语、印地语

### 3. 与其他功能组合
可以与以下功能组合使用：
- ✅ 滚动方向（横向/纵向）
- ✅ 文字方向（横排/竖排）
- ✅ 文字颜色
- ✅ 文字大小
- ✅ 滚动速度
- ✅ 粗体

## 使用场景

### 场景 1: 45° 创意展示
```
设置：
- 滚动方向：横向滚动
- 文字方向：横排文字
- 旋转角度：45°

效果：文字向右倾斜 45 度滚动
适合：活动海报、创意广告
```

### 场景 2: 90° 竖直滚动
```
设置：
- 滚动方向：横向滚动
- 文字方向：横排文字
- 旋转角度：90°

效果：文字竖直排列，横向滚动
适合：竖屏展示、门店标牌
```

### 场景 3: 135° 左倾效果
```
设置：
- 滚动方向：纵向滚动
- 文字方向：横排文字
- 旋转角度：135°

效果：文字向左倾斜，垂直滚动
适合：艺术展示、特殊效果
```

### 场景 4: 0° + 竖排文字（传统风格）
```
设置：
- 滚动方向：纵向滚动
- 文字方向：竖排文字
- 旋转角度：0°

效果：传统中文竖排，垂直滚动
适合：中式店铺、传统活动
```

## 技术实现

### CSS rotate 属性

```javascript
// 在 MarqueeText.vue 中
el.style.rotate = `${props.textRotation}deg`
```

**优点**：
- ✅ 简单直观
- ✅ 性能好（GPU 加速）
- ✅ 不影响布局
- ✅ 不与动画冲突

### 配置数据结构

```javascript
const config = reactive({
  // ... 其他配置
  textRotation: 0,  // 0, 45, 90, 135
})
```

### Props 定义

```javascript
textRotation: {
  type: Number,
  default: 0,
  validator: (value) => [0, 45, 90, 135].includes(value)
}
```

## UI 界面

### 配置面板
```html
<div class="form-group">
  <label>🔄 {{ t.textRotation }}:</label>
  <select v-model.number="config.textRotation">
    <option :value="0">{{ t.rotation0 }}</option>   <!-- 0° (正常) -->
    <option :value="45">{{ t.rotation45 }}</option>  <!-- 45° (右倾) -->
    <option :value="90">{{ t.rotation90 }}</option>  <!-- 90° (竖直) -->
    <option :value="135">{{ t.rotation135 }}</option> <!-- 135° (左倾) -->
  </select>
</div>
```

## 多语言翻译示例

### 中文简体
```javascript
textRotation: '文字旋转角度',
rotation0: '0° (正常)',
rotation45: '45° (右倾)',
rotation90: '90° (竖直)',
rotation135: '135° (左倾)',
```

### English
```javascript
textRotation: 'Text Rotation',
rotation0: '0° (Normal)',
rotation45: '45° (Tilt Right)',
rotation90: '90° (Vertical)',
rotation135: '135° (Tilt Left)',
```

### 日本語
```javascript
textRotation: 'テキストの回転角度',
rotation0: '0° (通常)',
rotation45: '45° (右傾き)',
rotation90: '90° (垂直)',
rotation135: '135° (左傾き)',
```

## 与现有功能的兼容性

### ✅ 完全兼容
- 滚动方向：横向/纵向
- 文字方向：横排/竖排
- 动画效果：不受影响
- 实时配置：立即生效

### 组合效果示例

| 滚动方向 | 文字方向 | 旋转角度 | 效果 |
|---------|---------|---------|------|
| 横向 ← | 横排 → | 0° | 标准横向滚动 |
| 横向 ← | 横排 → | 45° | 倾斜横向滚动 |
| 横向 ← | 横排 → | 90° | 竖直文字横向滚动 |
| 纵向 ↑ | 横排 → | 0° | 横排文字纵向滚动 |
| 纵向 ↑ | 竖排 ↓ | 0° | 传统竖排纵向滚动 |
| 纵向 ↑ | 横排 → | 45° | 倾斜文字纵向滚动 |

## 性能优化

### 重新渲染策略
只有在以下情况才重新创建组件：
- 滚动方向改变
- 文字方向改变
- **旋转角度改变** ✨ (新增)

其他配置（颜色、大小、速度）通过 props 自动更新，不重新创建组件。

```javascript
const needsRerender = 
  newConfig.scrollDirection !== oldConfig?.scrollDirection ||
  newConfig.direction !== oldConfig?.direction ||
  newConfig.textOrientation !== oldConfig?.textOrientation ||
  newConfig.textRotation !== oldConfig?.textRotation  // ✅ 新增
```

## 测试场景

### 测试 1: 基本旋转
1. 打开配置面板
2. 选择不同的旋转角度（0°, 45°, 90°, 135°）
3. **预期**：文字立即以对应角度显示

### 测试 2: 旋转 + 滚动
1. 设置旋转角度：45°
2. 设置滚动方向：横向滚动
3. **预期**：文字倾斜 45° 并横向滚动

### 测试 3: 旋转 + 竖排
1. 设置文字方向：竖排文字
2. 设置旋转角度：90°
3. **预期**：竖排文字旋转 90°

### 测试 4: 多语言
1. 切换不同语言
2. 检查旋转选项的翻译是否正确
3. **预期**：所有语言都正确显示

### 测试 5: 持久化
1. 修改旋转角度
2. 刷新页面
3. **预期**：旋转角度保持不变

## 视觉效果

### 0° - 正常
```
Welcome to LED Scrolling Sign ✨
→ 正常横向文字
```

### 45° - 右倾
```
    W e l c o m e
      t o   L E D
→ 向右倾斜 45 度
```

### 90° - 竖直
```
W
e
l
c
→ 完全竖直（90 度）
```

### 135° - 左倾
```
e m o c l e W
  D E L   o t
→ 向左倾斜 135 度（逆时针）
```

## 更新的文件

1. ✅ `src/i18n.js` - 添加 19 种语言的旋转翻译
2. ✅ `src/components/MarqueeText.vue` - 添加 textRotation prop 和样式
3. ✅ `src/views/Home.vue` - 添加旋转配置和 UI

## CSS rotate vs transform: rotate()

我们选择使用 CSS `rotate` 属性而不是 `transform: rotate()`：

### ✅ 使用 rotate (我们的选择)
```css
rotate: 45deg;
```
**优点**：
- 不与动画的 `transform` 冲突
- 语法更简洁
- 独立控制旋转

### ❌ 使用 transform: rotate()
```css
transform: rotate(45deg);
```
**缺点**：
- 会覆盖动画的 `transform: translateX/Y()`
- 需要组合多个 transform
- 更复杂

## 浏览器兼容性

CSS `rotate` 属性支持：
- ✅ Chrome 104+
- ✅ Firefox 72+
- ✅ Safari 14.1+
- ✅ Edge 104+
- ✅ 所有现代移动浏览器

**降级方案**：
如果浏览器不支持 `rotate`，可以考虑使用 `transform: rotate()` 作为备选。

## 部署

```bash
git add .
git commit -m "feat: 添加文字旋转角度功能 (0°/45°/90°/135°)"
git push origin main
```

---

**功能完成！** 🎉

现在用户可以通过旋转文字创造更多创意效果，让 LED 跑马灯更加灵活多样！

