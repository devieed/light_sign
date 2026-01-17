<template>
  <div class="app-container" @click="handleInteraction" @touchstart="handleInteraction" @keydown="handleInteraction">
    <!-- 首次访问欢迎弹窗 -->
    <div v-if="showWelcome" class="welcome-overlay" @click.self="closeWelcome">
      <div class="welcome-modal">
        <h2>{{ t.firstTimeTitle }}</h2>
        <p>{{ t.firstTimeDesc }}</p>
        <button class="welcome-btn" @click="startConfig">
          {{ t.getStarted }}
        </button>
      </div>
    </div>

    <!-- 全屏提示（仅PC端） -->
    <div v-if="showFullscreenHint" class="fullscreen-hint" @click="closeFullscreenHint">
      <div class="hint-content" @click.stop>
        <div class="hint-icon">🖥️</div>
        <h3>💡 提示</h3>
        <p>按 <kbd>F11</kbd> 或点击下方按钮进入全屏模式</p>
        <p class="hint-sub">获得最佳展示效果</p>
        <div class="hint-buttons">
          <button class="hint-btn primary" @click="enterFullscreen">
            进入全屏
          </button>
          <button class="hint-btn secondary" @click="closeFullscreenHint">
            稍后再说
          </button>
        </div>
      </div>
    </div>

    <!-- 配置面板 -->
    <div class="config-panel" :class="{ 'hidden': !showConfig }">
      <div class="config-header">
        <h2>{{ t.configTitle }}</h2>
        <button class="close-btn" @click="showConfig = false">×</button>
      </div>
      
      <div class="config-content">
        <!-- 语言选择 -->
        <div class="form-group">
          <label>🌐 {{ t.language }}:</label>
          <select v-model="currentLanguage" @change="changeLanguage">
            <option v-for="(name, code) in languages" :key="code" :value="code">
              {{ name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>📝 {{ t.text }}:</label>
          <input 
            v-model="config.text" 
            type="text" 
            :placeholder="t.textPlaceholder"
            maxlength="200"
          />
        </div>

        <div class="form-group">
          <label>🎨 {{ t.textColor }}:</label>
          <div class="color-picker-group">
            <input v-model="config.textColor" type="color" />
            <input v-model="config.textColor" type="text" class="color-input" />
          </div>
        </div>

        <div class="form-group">
          <label>🖼️ {{ t.bgColor }}:</label>
          <div class="color-picker-group">
            <input v-model="config.bgColor" type="color" />
            <input v-model="config.bgColor" type="text" class="color-input" />
          </div>
        </div>

        <div class="form-group">
          <label>📏 {{ t.fontSize }}: {{ config.fontSize }}%</label>
          <input 
            v-model.number="config.fontSize" 
            type="range" 
            min="10" 
            max="100" 
            step="5"
          />
          <small>（百分比基于屏幕高度，100%表示完全铺满）</small>
        </div>

        <div class="form-group">
          <label>⚡ {{ t.speed }}: {{ config.speed }}s</label>
          <input 
            v-model.number="config.speed" 
            type="range" 
            min="5" 
            max="60" 
            step="1"
          />
          <small>{{ t.speedHint }}</small>
        </div>

        <div class="form-group">
          <label>↔️ {{ t.scrollDirection }}:</label>
          <select v-model="config.scrollDirection">
            <option value="auto">{{ t.autoDetectDirection }}</option>
            <option value="horizontal">{{ t.horizontalScroll }}</option>
            <option value="vertical">{{ t.verticalScroll }}</option>
          </select>
        </div>

        <div class="form-group" v-if="config.scrollDirection === 'horizontal'">
          <label>🔄 {{ t.direction }}:</label>
          <select v-model="config.direction">
            <option value="left">{{ t.directionLeft }}</option>
            <option value="right">{{ t.directionRight }}</option>
          </select>
        </div>

        <div class="form-group" v-if="config.scrollDirection === 'vertical'">
          <label>🔄 {{ t.direction }}:</label>
          <select v-model="config.direction">
            <option value="up">{{ t.directionUp }}</option>
            <option value="down">{{ t.directionDown }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>📐 {{ t.textOrientation }}:</label>
          <select v-model="config.textOrientation">
            <option value="horizontal">{{ t.textOrientationHorizontal }}</option>
            <option value="vertical">{{ t.textOrientationVertical }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>🔄 {{ t.textRotation }}:</label>
          <select v-model.number="config.textRotation">
            <option :value="0">{{ t.rotation0 }}</option>
            <option :value="90">{{ t.rotation90 }}</option>
            <option :value="180">{{ t.rotation180 }}</option>
            <option :value="270">{{ t.rotation270 }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="config.bold" />
            <strong>{{ t.bold }}</strong>
          </label>
        </div>

        <!-- 页面链接 -->
        <div class="footer-nav">
          <router-link to="/about">{{ t.about }}</router-link>
          <router-link to="/terms">{{ t.terms }}</router-link>
          <router-link to="/privacy">{{ t.privacy }}</router-link>
        </div>
      </div>
    </div>

    <!-- 跑马灯显示区域 -->
    <div class="marquee-container" :style="containerStyle">
      <MarqueeText 
        :text="currentConfig.text"
        :fontSize="currentConfig.fontSize"
        :textColor="currentConfig.textColor"
        :speed="currentConfig.speed"
        :direction="getActualDirection"
        :textOrientation="currentConfig.textOrientation"
        :textRotation="currentConfig.textRotation"
        :bold="currentConfig.bold"
        :key="marqueeKey"
      />
      
      <!-- 设置按钮 -->
      <transition name="fade">
        <button 
          v-show="showButtons"
          class="settings-btn" 
          @click.stop="showConfig = true"
          :title="t.settings"
        >
          ⚙️
        </button>
      </transition>

      <!-- 全屏切换按钮（PC端） -->
      <transition name="fade">
        <button 
          v-if="!isMobile()"
          v-show="showButtons"
          class="fullscreen-btn" 
          @click.stop="toggleFullscreen"
          :title="isFullscreen ? '退出全屏 (ESC)' : '全屏显示 (F11)'"
        >
          {{ isFullscreen ? '🗗' : '⛶' }}
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import MarqueeText from '../components/MarqueeText.vue'
import { languages, translations, getBrowserLanguage, getLanguageFromURL, setLanguageToURL } from '../i18n.js'
import { useSEO } from '../composables/useSEO.js'

const showConfig = ref(false)
const showWelcome = ref(false)
const showFullscreenHint = ref(false)
const marqueeKey = ref(0)
const currentLanguage = ref('en')
const isFullscreen = ref(false)
const showButtons = ref(true)
const hideButtonsTimer = ref(null)

// 翻译文本
const t = computed(() => translations[currentLanguage.value] || translations['en'])

// 配置数据
const config = reactive({
  text: 'Welcome to LED Scrolling Sign ✨',
  textColor: '#ffffff',
  bgColor: '#000000',
  fontSize: 50,  // 改为百分比：50% 表示屏幕高度的50%
  speed: 15,
  scrollDirection: 'auto',  // 'auto', 'horizontal', 'vertical'
  direction: 'auto',  // 默认自动：PC横向(left)，手机纵向(up)
  textOrientation: 'horizontal',  // 'horizontal', 'vertical'
  textRotation: 0,  // 0, 45, 90, 135 degrees
  bold: true
})

// 当前生效的配置（实时同步）
const currentConfig = reactive({
  text: 'Welcome to LED Scrolling Sign ✨',
  textColor: '#ffffff',
  bgColor: '#000000',
  fontSize: 50,
  speed: 15,
  scrollDirection: 'auto',
  direction: 'auto',
  textOrientation: 'horizontal',
  textRotation: 0,
  bold: true
})

// 获取实际滚动方向
const getActualDirection = computed(() => {
  // 如果是自动模式
  if (currentConfig.scrollDirection === 'auto') {
    return isMobile() ? 'up' : 'left'
  }
  // 如果是横向/纵向模式
  if (currentConfig.scrollDirection === 'horizontal') {
    return currentConfig.direction === 'right' ? 'right' : 'left'
  }
  if (currentConfig.scrollDirection === 'vertical') {
    return currentConfig.direction === 'down' ? 'down' : 'up'
  }
  // 兼容旧版本：直接指定方向
  return currentConfig.direction
})

// 容器样式
const containerStyle = computed(() => ({
  backgroundColor: currentConfig.bgColor
}))

// 切换语言
const changeLanguage = () => {
  setLanguageToURL(currentLanguage.value)
  
  // 应用 SEO
  const { applySEO } = useSEO(currentLanguage.value)
  applySEO()
  
  saveConfig()
}

// 实时同步配置：监听 config 的变化，自动更新 currentConfig
watch(() => ({ ...config }), (newConfig, oldConfig) => {
  Object.assign(currentConfig, newConfig)
  
  // 只在需要重新渲染的情况下更新 key（例如：滚动方向或文字方向改变）
  // 其他属性（颜色、大小、速度等）通过 props 自动更新，不需要重新创建组件
  const needsRerender = 
    newConfig.scrollDirection !== oldConfig?.scrollDirection ||
    newConfig.direction !== oldConfig?.direction ||
    newConfig.textOrientation !== oldConfig?.textOrientation ||
    newConfig.textRotation !== oldConfig?.textRotation
  
  if (needsRerender) {
    marqueeKey.value++
  }
  
  saveConfig()
}, { deep: true })

// 开始自动隐藏按钮的计时器
const startHideButtonsTimer = () => {
  // 清除旧的计时器
  if (hideButtonsTimer.value) {
    clearTimeout(hideButtonsTimer.value)
  }
  
  // 显示按钮
  showButtons.value = true
  
  // 5秒后隐藏（仅当不在配置模式时）
  hideButtonsTimer.value = setTimeout(() => {
    if (!showConfig.value) {
      showButtons.value = false
    }
  }, 5000)
}

// 显示按钮（用户交互时）
const handleInteraction = () => {
  // 只要不是在欢迎界面和全屏提示，就重新显示按钮
  if (!showWelcome.value && !showFullscreenHint.value) {
    startHideButtonsTimer()
  }
}

// 关闭欢迎弹窗
const closeWelcome = () => {
  showWelcome.value = false
  localStorage.setItem('hasVisited', 'true')
  
  // PC端显示全屏提示
  if (!isMobile() && !localStorage.getItem('fullscreenHintShown')) {
    setTimeout(() => {
      showFullscreenHint.value = true
    }, 2000)
  }
}

// 开始配置
const startConfig = () => {
  showWelcome.value = false
  showConfig.value = true
  localStorage.setItem('hasVisited', 'true')
  
  // 打开配置面板时，清除自动隐藏计时器
  if (hideButtonsTimer.value) {
    clearTimeout(hideButtonsTimer.value)
  }
  showButtons.value = true
}

// 关闭全屏提示
const closeFullscreenHint = () => {
  showFullscreenHint.value = false
  localStorage.setItem('fullscreenHintShown', 'true')
}

// 进入全屏
const enterFullscreen = () => {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen()
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen()
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen()
  }
  closeFullscreenHint()
  isFullscreen.value = true
}

// 退出全屏
const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
  isFullscreen.value = false
}

// 切换全屏
const toggleFullscreen = () => {
  if (isFullscreen.value) {
    exitFullscreen()
  } else {
    enterFullscreen()
  }
}

// 检测是否为移动设备
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 保存配置
const saveConfig = () => {
  const saveData = {
    ...config,
    language: currentLanguage.value
  }
  localStorage.setItem('marqueeConfig', JSON.stringify(saveData))
}

// 加载配置
const loadConfig = () => {
  const saved = localStorage.getItem('marqueeConfig')
  if (saved) {
    try {
      const savedConfig = JSON.parse(saved)
      
      // 向后兼容：处理旧的 direction: 'auto' 格式
      if (savedConfig.direction === 'auto' && !savedConfig.scrollDirection) {
        savedConfig.scrollDirection = 'auto'
        savedConfig.direction = 'left' // 默认方向
      }
      
      // 确保新字段有默认值
      if (!savedConfig.scrollDirection) {
        savedConfig.scrollDirection = 'auto'
      }
      if (!savedConfig.textOrientation) {
        savedConfig.textOrientation = 'horizontal'
      }
      
      // 如果有保存的配置，使用保存的配置
      Object.assign(config, savedConfig)
      Object.assign(currentConfig, savedConfig)
      if (savedConfig.language) {
        currentLanguage.value = savedConfig.language
      }
    } catch (e) {
      console.error('加载配置失败:', e)
    }
  } else {
    // 首次访问，使用当前语言的欢迎文字
    const welcomeText = t.value.welcome
    config.text = welcomeText
    currentConfig.text = welcomeText
  }
}

// 初始化语言
const initLanguage = () => {
  // 优先使用 URL 参数
  const urlLang = getLanguageFromURL()
  if (urlLang) {
    currentLanguage.value = urlLang
    return
  }

  // 然后使用保存的语言
  const saved = localStorage.getItem('marqueeConfig')
  if (saved) {
    try {
      const savedConfig = JSON.parse(saved)
      if (savedConfig.language && translations[savedConfig.language]) {
        currentLanguage.value = savedConfig.language
        setLanguageToURL(savedConfig.language)
        return
      }
    } catch (e) {
      // 忽略错误
    }
  }

  // 最后使用浏览器语言
  currentLanguage.value = getBrowserLanguage()
  setLanguageToURL(currentLanguage.value)
}

onMounted(() => {
  console.log('Home 组件 mounted')
  
  // 初始化语言（必须先初始化，因为 t.value 依赖语言）
  initLanguage()
  console.log('语言初始化完成:', currentLanguage.value)
  
  // 应用初始 SEO
  const { applySEO } = useSEO(currentLanguage.value)
  applySEO()
  
  // 加载配置（会使用 t.value.welcome）
  loadConfig()
  console.log('配置加载完成')
  console.log('config.text:', config.text)
  console.log('currentConfig.text:', currentConfig.text)

  // 检查是否首次访问
  const hasVisited = localStorage.getItem('hasVisited')
  if (!hasVisited) {
    showWelcome.value = true
    console.log('首次访问，显示欢迎弹窗')
  } else {
    console.log('非首次访问')
    // 非首次访问，5秒后自动隐藏按钮
    startHideButtonsTimer()
  }
  
  // 监听全屏状态变化
  const fullscreenChange = () => {
    isFullscreen.value = !!(document.fullscreenElement || 
                            document.webkitFullscreenElement || 
                            document.mozFullScreenElement || 
                            document.msFullscreenElement)
  }
  
  document.addEventListener('fullscreenchange', fullscreenChange)
  document.addEventListener('webkitfullscreenchange', fullscreenChange)
  document.addEventListener('mozfullscreenchange', fullscreenChange)
  document.addEventListener('MSFullscreenChange', fullscreenChange)
  
  // 延迟检查 DOM 元素
  setTimeout(() => {
    const marqueeText = document.querySelector('.marquee-text')
    const marqueeContainer = document.querySelector('.marquee-container')
    console.log('=== DOM 检查 ===')
    console.log('marquee-container:', marqueeContainer)
    console.log('marquee-text:', marqueeText)
    if (marqueeText) {
      console.log('✅ 文字元素存在')
      console.log('文字内容:', marqueeText.textContent?.substring(0, 50))
      const styles = window.getComputedStyle(marqueeText)
      console.log('文字样式:', {
        color: styles.color,
        fontSize: styles.fontSize,
        display: styles.display,
        visibility: styles.visibility
      })
    }
  }, 1000)
})
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.welcome-modal {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 60px 50px;
  border-radius: 24px;
  max-width: 550px;
  text-align: center;
  animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes modalSlideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.welcome-modal h2 {
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-modal p {
  font-size: 18px;
  color: #5a6c7d;
  margin-bottom: 35px;
  line-height: 1.7;
  font-weight: 500;
}

.welcome-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 18px 60px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  letter-spacing: 0.5px;
}

.welcome-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.config-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 450px;
  height: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transform: translateX(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.config-panel.hidden {
  transform: translateX(-100%);
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.config-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.close-btn {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: rotate(90deg);
  border-color: rgba(255, 255, 255, 0.5);
}

.config-content {
  padding: 30px 25px;
}

.form-group {
  margin-bottom: 28px;
  animation: slideInUp 0.5s ease forwards;
  opacity: 0;
}

.form-group:nth-child(1) { animation-delay: 0.05s; }
.form-group:nth-child(2) { animation-delay: 0.1s; }
.form-group:nth-child(3) { animation-delay: 0.15s; }
.form-group:nth-child(4) { animation-delay: 0.2s; }
.form-group:nth-child(5) { animation-delay: 0.25s; }
.form-group:nth-child(6) { animation-delay: 0.3s; }
.form-group:nth-child(7) { animation-delay: 0.35s; }
.form-group:nth-child(8) { animation-delay: 0.4s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 15px;
  letter-spacing: -0.2px;
}

.form-group input[type="text"],
.form-group select {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e8eaf0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.form-group input[type="text"]:focus,
.form-group select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.color-picker-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.color-picker-group input[type="color"] {
  width: 70px;
  height: 50px;
  border: 3px solid #e8eaf0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.color-picker-group input[type="color"]:hover {
  transform: scale(1.05);
  border-color: #667eea;
}

.color-input {
  flex: 1;
  padding: 14px 16px;
  border: 2px solid #e8eaf0;
  border-radius: 12px;
  font-size: 15px;
  font-family: 'Monaco', 'Menlo', monospace;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.color-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-group input[type="range"] {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #e8eaf0 0%, #667eea 100%);
  outline: none;
  -webkit-appearance: none;
  transition: all 0.3s ease;
}

.form-group input[type="range"]:hover {
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.form-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.form-group input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
}

.form-group input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.form-group input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.2);
}

.form-group small {
  display: block;
  margin-top: 8px;
  color: #6c757d;
  font-size: 13px;
  line-height: 1.5;
}

.form-group input[type="checkbox"] {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #667eea;
}

.footer-nav {
  display: flex;
  justify-content: space-around;
  margin-top: 35px;
  padding-top: 25px;
  border-top: 2px solid #e8eaf0;
}

.footer-nav a {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
}

.footer-nav a:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.marquee-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.settings-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.95);
  color: white;
  font-size: 28px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-btn:hover {
  transform: scale(1.1) rotate(90deg);
  background: rgba(118, 75, 162, 0.95);
}

.fullscreen-btn {
  position: fixed;
  bottom: 30px;
  right: 110px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(52, 152, 219, 0.95);
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-btn:hover {
  transform: scale(1.1);
  background: rgba(41, 128, 185, 0.95);
}

/* 全屏提示 */
.fullscreen-hint {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
  animation: fadeIn 0.3s ease;
}

.hint-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease;
}

.hint-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.hint-content h3 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.hint-content p {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
  line-height: 1.6;
}

.hint-sub {
  font-size: 14px;
  color: #999;
  margin-bottom: 25px;
}

.hint-content kbd {
  display: inline-block;
  padding: 3px 8px;
  font-family: monospace;
  font-size: 14px;
  color: #333;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.hint-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.hint-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hint-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.hint-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.hint-btn.secondary {
  background: #f0f0f0;
  color: #666;
}

.hint-btn.secondary:hover {
  background: #e0e0e0;
}

/* 按钮淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media screen and (max-width: 768px) and (orientation: landscape) {
  .config-panel {
    max-width: 320px;
  }
  
  .config-header h2 {
    font-size: 18px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .settings-btn {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
    font-size: 24px;
  }

  .welcome-modal {
    padding: 30px 25px;
    margin: 20px;
  }

  .welcome-modal h2 {
    font-size: 24px;
  }

  .welcome-modal p {
    font-size: 16px;
  }
}

@media screen and (max-width: 768px) and (orientation: portrait) {
  .config-panel {
    max-width: 100%;
  }
}
</style>

