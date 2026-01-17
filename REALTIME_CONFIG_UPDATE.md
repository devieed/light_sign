# 实时配置更新 & 文字方向控制

## 更新内容

### 1. 新增配置选项

#### 滚动方向 (scrollDirection)
- **自动检测** (`auto`): PC端横向滚动，移动端纵向滚动
- **横向滚动** (`horizontal`): 强制横向滚动
  - 从右到左 (←)
  - 从左到右 (→)
- **纵向滚动** (`vertical`): 强制纵向滚动
  - 从下到上 (↑)
  - 从上到下 (↓)

#### 文字方向 (textOrientation)
- **横排文字** (`horizontal`): 文字从左到右横向排列（默认）
- **竖排文字** (`vertical`): 文字从上到下竖向排列（类似传统中文竖排）

### 2. 实时配置生效

- **移除了"应用设置"按钮**
- **配置修改后立即生效**：使用 Vue 的 `watch` 监听配置变化，自动同步到显示效果
- **自动保存**：配置变化时自动保存到 localStorage

### 3. 使用场景

#### 场景 1: 手机竖屏显示
- **滚动方向**: 自动检测 → 纵向滚动（从下到上）
- **文字方向**: 
  - 横排文字：适合横屏拿手机，文字正常横向排列，垂直滚动
  - 竖排文字：适合竖屏拿手机，文字竖向排列（传统中文排版）

#### 场景 2: 手机横屏显示
- **滚动方向**: 手动选择"横向滚动"
- **文字方向**: 横排文字（从左到右）

#### 场景 3: PC大屏展示
- **滚动方向**: 自动检测 → 横向滚动（从右到左）
- **文字方向**: 横排文字

#### 场景 4: LED竖屏展示（店铺门牌）
- **滚动方向**: 纵向滚动（从下到上）
- **文字方向**: 竖排文字（传统风格）

## 技术实现

### 配置数据结构

```javascript
const config = reactive({
  text: '欢迎使用跑马灯',
  textColor: '#ffffff',
  bgColor: '#000000',
  fontSize: 50,  // 百分比
  speed: 15,
  scrollDirection: 'auto',  // 'auto', 'horizontal', 'vertical'
  direction: 'left',  // 'left', 'right', 'up', 'down'
  textOrientation: 'horizontal',  // 'horizontal', 'vertical'
  bold: true
})
```

### 实时同步机制

```javascript
// 监听配置变化，自动同步到显示配置
watch(() => ({ ...config }), (newConfig) => {
  Object.assign(currentConfig, newConfig)
  marqueeKey.value++ // 强制重新渲染
  saveConfig() // 自动保存
}, { deep: true })
```

### CSS writing-mode

```css
/* 横排文字 */
writing-mode: horizontal-tb;
text-orientation: mixed;

/* 竖排文字 */
writing-mode: vertical-rl;  /* 从右到左排列列 */
text-orientation: upright;  /* 文字正立 */
```

## 更新的文件

1. **src/i18n.js**
   - 添加 19 种语言的翻译：
     - `textOrientation`: 文字方向
     - `textOrientationHorizontal`: 横排文字
     - `textOrientationVertical`: 竖排文字
     - `scrollDirection`: 滚动方向
     - `horizontalScroll`: 横向滚动
     - `verticalScroll`: 纵向滚动
     - `autoDetectDirection`: 自动检测

2. **src/components/MarqueeText.vue**
   - 添加 `textOrientation` prop
   - 根据 `textOrientation` 动态设置 `writing-mode`
   - 将文字方向和滚动方向解耦

3. **src/views/Home.vue**
   - 添加 `scrollDirection` 和 `textOrientation` 配置项
   - 实现实时配置同步（watch）
   - 移除"应用设置"按钮及相关函数
   - 更新 UI：动态显示方向选项（根据滚动方向）
   - 向后兼容：处理旧配置格式

## 用户体验优化

1. **即时反馈**：修改任何配置立即看到效果
2. **智能默认**：自动检测设备类型，设置最佳滚动方向
3. **灵活控制**：支持手动覆盖自动设置
4. **传统美学**：支持竖排文字，适合中文、日文等东亚文字
5. **无需确认**：去掉中间步骤，简化操作流程

## 测试建议

1. **自动检测测试**
   - PC浏览器：应默认横向滚动
   - 手机浏览器：应默认纵向滚动

2. **文字方向测试**
   - 横排 + 横向滚动：文字正常横排，左右移动 ✓
   - 横排 + 纵向滚动：文字正常横排，上下移动 ✓
   - 竖排 + 横向滚动：文字竖排，左右移动 ✓
   - 竖排 + 纵向滚动：文字竖排，上下移动 ✓

3. **实时配置测试**
   - 修改文字：立即更新显示
   - 修改颜色：立即更新颜色
   - 修改字号：立即更新大小
   - 修改速度：立即更新速度
   - 修改方向：立即更新方向

4. **持久化测试**
   - 修改配置后刷新页面：配置应保持
   - 清除缓存后访问：应显示默认配置

## 部署

直接推送到 GitHub，GitHub Actions 会自动部署到 `botcode.cc`。

```bash
git add .
git commit -m "feat: 添加实时配置和文字方向控制"
git push origin main
```

---

**更新时间**: 2026-01-17  
**版本**: v2.0  
**作者**: AI Assistant

