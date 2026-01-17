# 修复手机端竖排文字居中问题

## 问题描述
手机端纵向滚动时，竖排文字（`writing-mode: vertical-rl`）显示在屏幕右侧，而不是居中显示。

## 问题原因

### CSS writing-mode 的特性
当使用 `writing-mode: vertical-rl` 时：
- `vertical`: 文字竖向排列（从上到下）
- `rl`: Right to Left，文字列从右到左排列
- **默认行为**：文字会从右侧开始排列

对于单列竖排文字，这会导致文字紧贴屏幕右侧。

## 解决方案

使用 `margin: 0 auto` 来水平居中竖排文字元素：

```javascript
if (isVertical) {
  // 纵向滚动：文字从屏幕底部进入
  el.style.paddingTop = '0'
  el.style.paddingBottom = '100vh'
  el.style.paddingLeft = '0'
  el.style.paddingRight = '0'
  el.style.height = 'auto'
  el.style.position = 'relative'
  
  // 竖排文字时需要居中
  if (props.textOrientation === 'vertical') {
    el.style.width = 'auto' // 宽度自适应内容
    el.style.margin = '0 auto' // ✅ 水平居中
    el.style.textAlign = 'center'
  } else {
    // 横排文字纵向滚动
    el.style.width = '100%'
    el.style.margin = '0'
    el.style.textAlign = 'center'
  }
}
```

## 技术细节

### 为什么使用 margin: 0 auto？

1. **不冲突**：
   - `margin` 控制元素本身的位置
   - `transform` 用于 CSS 动画
   - 两者互不干扰

2. **简单可靠**：
   - 标准的 CSS 居中方法
   - 浏览器兼容性好
   - 不影响其他样式

3. **自适应**：
   - 配合 `width: auto`
   - 元素宽度自适应内容
   - 自动居中显示

### 其他尝试过的方案（不推荐）

#### ❌ 方案 1: position: absolute + transform
```css
position: absolute;
left: 50%;
transform: translateX(-50%);
```
**问题**：与 CSS 动画的 `transform` 冲突

#### ❌ 方案 2: flexbox 在父元素
```css
/* 父元素 */
display: flex;
justify-content: center;
```
**问题**：父元素已经用于动画，改动会影响现有逻辑

#### ✅ 方案 3: margin: 0 auto（最终采用）
```css
width: auto;
margin: 0 auto;
```
**优点**：简单、可靠、不冲突

## 效果对比

### 修复前
```
┌─────────────────────┐
│                 文 │  ← 文字在右侧
│                 字 │
│                 滚 │
│                 动 │
└─────────────────────┘
```

### 修复后
```
┌─────────────────────┐
│        文          │  ← 文字居中
│        字          │
│        滚          │
│        动          │
└─────────────────────┘
```

## 各种场景的布局逻辑

### 场景 1: 纵向滚动 + 竖排文字（手机竖屏）
```javascript
paddingBottom: '100vh'  // 从底部开始
width: 'auto'           // 宽度自适应
margin: '0 auto'        // ✅ 居中
textAlign: 'center'
```

### 场景 2: 纵向滚动 + 横排文字
```javascript
paddingBottom: '100vh'  // 从底部开始
width: '100%'           // 全宽
margin: '0'
textAlign: 'center'     // 文字居中
```

### 场景 3: 横向滚动 + 横排文字（PC端）
```javascript
paddingRight: '100vw'   // 从右侧开始
width: 'auto'           // 宽度自适应
margin: '0'
textAlign: 'left'
```

### 场景 4: 横向滚动 + 竖排文字
```javascript
paddingRight: '100vw'   // 从右侧开始
width: 'auto'           // 宽度自适应
margin: '0'
textAlign: 'left'
```

## 测试场景

### 测试 1: 手机竖屏 + 纵向滚动 + 竖排文字
1. 打开手机浏览器（竖屏）
2. 设置滚动方向：自动检测（纵向）
3. 设置文字方向：竖排文字
4. **预期**：文字在屏幕中央垂直滚动

### 测试 2: 手机横屏 + 纵向滚动 + 竖排文字
1. 手机横屏
2. 设置滚动方向：纵向滚动
3. 设置文字方向：竖排文字
4. **预期**：文字在屏幕中央垂直滚动

### 测试 3: 手机竖屏 + 纵向滚动 + 横排文字
1. 手机竖屏
2. 设置滚动方向：纵向滚动
3. 设置文字方向：横排文字
4. **预期**：文字在屏幕中央垂直滚动

### 测试 4: PC端各种组合
1. PC浏览器
2. 测试所有滚动方向和文字方向的组合
3. **预期**：所有组合都能正常显示

## CSS writing-mode 知识点

### vertical-rl vs vertical-lr

```css
/* vertical-rl: 从右到左排列列（Right to Left） */
writing-mode: vertical-rl;
/* 效果：文字列从右侧开始 */
第一列在右侧 ← 第二列在左侧

/* vertical-lr: 从左到右排列列（Left to Right） */
writing-mode: vertical-lr;
/* 效果：文字列从左侧开始 */
第一列在左侧 → 第二列在右侧
```

### 为什么选择 vertical-rl？
- ✅ 符合传统中文、日文竖排习惯
- ✅ 从右向左阅读
- ✅ 单列文字配合居中效果最佳

### text-orientation

```css
/* upright: 文字正立 */
text-orientation: upright;
/* 效果：每个字符保持正立方向 */
正
立
文
字

/* mixed: 混合方向 */
text-orientation: mixed;
/* 效果：字符根据语言自动调整 */
```

## 更新文件

✅ `src/components/MarqueeText.vue`

## 部署

```bash
git add src/components/MarqueeText.vue
git commit -m "fix: 修复手机端竖排文字居中问题"
git push origin main
```

---

**修复完成！** 🎉

现在手机端纵向滚动时，竖排文字会正确居中显示了。

