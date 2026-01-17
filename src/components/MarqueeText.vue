<template>
  <div class="marquee-wrapper" ref="wrapperRef">
    <div 
      class="marquee-text" 
      ref="textRef"
      v-html="displayText"
    ></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  fontSize: {
    type: Number,
    default: 60
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  speed: {
    type: Number,
    default: 15
  },
  direction: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right', 'up', 'down'].includes(value)
  },
  textOrientation: {
    type: String,
    default: 'horizontal', // 'horizontal' or 'vertical'
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  textRotation: {
    type: Number,
    default: 0, // 0, 90, 180, 270
    validator: (value) => [0, 90, 180, 270].includes(value)
  },
  bold: {
    type: Boolean,
    default: false
  }
})

const textRef = ref(null)
const wrapperRef = ref(null)
const debugTimer = ref(null)
const isMounted = ref(false)

// 显示的文字
const displayText = computed(() => {
  const text = props.text || 'LED Scrolling Sign'
  const separator = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' // HTML空格
  return `${text}${separator}${text}${separator}${text}${separator}${text}`
})

// 应用样式的函数
const applyStyles = () => {
  if (!textRef.value || !wrapperRef.value) return
  
  const el = textRef.value
  const wrapper = wrapperRef.value
  
  // 计算实际字体大小：百分比基于容器高度
  const wrapperHeight = wrapper.offsetHeight
  const actualFontSize = Math.floor(wrapperHeight * (props.fontSize / 100))
  
  // 判断是横向还是纵向滚动
  const isVertical = props.direction === 'up' || props.direction === 'down'
  
  // 直接操作 DOM 设置样式
  el.style.fontSize = `${actualFontSize}px`
  el.style.color = props.textColor
  el.style.fontWeight = props.bold ? 'bold' : 'normal'
  el.style.display = 'inline-block'
  el.style.position = 'relative'
  el.style.zIndex = '10'
  
  // ✅ 使用 CSS 变量传递旋转角度，让动画可以组合 rotate 和 translate
  el.style.setProperty('--rotation', `${props.textRotation}deg`)
  
  // 根据文字方向设置排列方式
  if (props.textOrientation === 'vertical') {
    // 竖排文字（从上到下）
    el.style.writingMode = 'vertical-rl' // 竖排文字，从右到左列
    el.style.textOrientation = 'upright' // 文字正立
    el.style.whiteSpace = 'nowrap'
  } else {
    // 横排文字（从左到右）
    el.style.writingMode = 'horizontal-tb' // 横排文字
    el.style.textOrientation = 'mixed'
    el.style.whiteSpace = 'nowrap'
  }
  
  // 根据滚动方向设置不同的起始位置
  if (isVertical) {
    // 纵向滚动：文字从屏幕底部进入
    el.style.paddingTop = '0'
    el.style.paddingBottom = '100vh' // 使用 vh 确保从底部开始
    el.style.paddingLeft = '0'
    el.style.paddingRight = '0'
    el.style.height = 'auto'
    el.style.position = 'relative'
    
    // 竖排文字时需要居中
    if (props.textOrientation === 'vertical') {
      el.style.width = 'auto'
      el.style.margin = '0 auto' // 水平居中
      el.style.textAlign = 'center'
    } else {
      // 横排文字纵向滚动
      el.style.width = '100%'
      el.style.margin = '0'
      el.style.textAlign = 'center'
    }
  } else {
    // 横向滚动：文字从屏幕右侧进入
    el.style.paddingLeft = '0'
    el.style.paddingRight = '100vw' // 使用 vw 确保从右侧开始
    el.style.paddingTop = '0'
    el.style.paddingBottom = '0'
    el.style.height = 'auto'
    el.style.width = 'auto'
    el.style.position = 'relative'
    el.style.margin = '0'
    el.style.textAlign = 'left'
  }
  
  // 设置动画 - 使用CSS变量确保平滑过渡
  const animationName = getAnimationName(props.direction)
  el.style.animation = 'none'
  
  // 强制重排
  void el.offsetWidth
  
  // 重新应用动画
  requestAnimationFrame(() => {
    el.style.animation = `${animationName} ${props.speed}s linear infinite`
  })
  
  console.log('✅ 样式已直接应用到 DOM')
  console.log('实际字体大小:', actualFontSize, 'px', '(百分比:', props.fontSize, '%)')
  console.log('滚动方向:', props.direction, '动画:', animationName)
}

// 获取动画名称
const getAnimationName = (direction) => {
  const animations = {
    left: 'scrollLeft',
    right: 'scrollRight',
    up: 'scrollUp',
    down: 'scrollDown'
  }
  return animations[direction] || 'scrollLeft'
}

// 监听属性变化
watch(() => [props.text, props.fontSize, props.textColor, props.speed, props.direction, props.textOrientation, props.textRotation, props.bold], () => {
  nextTick(() => {
    applyStyles()
  })
}, { deep: true })

onMounted(() => {
  isMounted.value = true
  console.log('MarqueeText 已挂载')
  console.log('wrapper:', wrapperRef.value)
  console.log('text元素:', textRef.value)
  
  nextTick(() => {
    applyStyles()
    
    // 延迟检查 - 只在组件还存在时执行
    debugTimer.value = setTimeout(() => {
      if (!isMounted.value) return // 组件已销毁，不执行
      
      if (textRef.value) {
        console.log('📊 最终检查:')
        console.log('- 元素存在:', !!textRef.value)
        console.log('- innerHTML:', textRef.value.innerHTML?.substring(0, 50))
        console.log('- offsetWidth:', textRef.value.offsetWidth)
        console.log('- offsetHeight:', textRef.value.offsetHeight)
        
        const rect = textRef.value.getBoundingClientRect()
        console.log('- 位置:', { width: rect.width, height: rect.height })
        
        const computed = window.getComputedStyle(textRef.value)
        console.log('- 样式:', {
          fontSize: computed.fontSize,
          color: computed.color,
          animation: computed.animation
        })
      } else {
        console.error('❌ textRef.value 为 null')
      }
    }, 500)
  })
})

onUnmounted(() => {
  isMounted.value = false
  if (debugTimer.value) {
    clearTimeout(debugTimer.value)
  }
  console.log('MarqueeText 已卸载')
})
</script>

<style>
/* 不使用 scoped，确保样式一定能应用 */
.marquee-wrapper {
  width: 100%;
  height: 100%;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative !important;
  overflow: hidden !important;
  background: transparent !important;
}

.marquee-text {
  line-height: 1.2 !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3) !important;
  backface-visibility: hidden !important;
  -webkit-backface-visibility: hidden !important;
}

/* 横向滚动动画 */
@keyframes scrollLeft {
  from {
    transform: translateX(0) rotate(var(--rotation, 0deg));
  }
  to {
    transform: translateX(-50%) rotate(var(--rotation, 0deg));
  }
}

@keyframes scrollRight {
  from {
    transform: translateX(-50%) rotate(var(--rotation, 0deg));
  }
  to {
    transform: translateX(0) rotate(var(--rotation, 0deg));
  }
}

/* 纵向滚动动画 */
@keyframes scrollUp {
  from {
    transform: translateY(0) rotate(var(--rotation, 0deg));
  }
  to {
    transform: translateY(-50%) rotate(var(--rotation, 0deg));
  }
}

@keyframes scrollDown {
  from {
    transform: translateY(-50%) rotate(var(--rotation, 0deg));
  }
  to {
    transform: translateY(0) rotate(var(--rotation, 0deg));
  }
}

/* Webkit 前缀（兼容性） */
@-webkit-keyframes scrollLeft {
  from {
    -webkit-transform: translateX(0) rotate(var(--rotation, 0deg));
  }
  to {
    -webkit-transform: translateX(-50%) rotate(var(--rotation, 0deg));
  }
}

@-webkit-keyframes scrollRight {
  from {
    -webkit-transform: translateX(-50%) rotate(var(--rotation, 0deg));
  }
  to {
    -webkit-transform: translateX(0) rotate(var(--rotation, 0deg));
  }
}

@-webkit-keyframes scrollUp {
  from {
    -webkit-transform: translateY(0) rotate(var(--rotation, 0deg));
  }
  to {
    -webkit-transform: translateY(-50%) rotate(var(--rotation, 0deg));
  }
}

@-webkit-keyframes scrollDown {
  from {
    -webkit-transform: translateY(-50%) rotate(var(--rotation, 0deg));
  }
  to {
    -webkit-transform: translateY(0) rotate(var(--rotation, 0deg));
  }
}
</style>

