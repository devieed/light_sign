import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Terms from './views/Terms.vue'
import Privacy from './views/Privacy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'LED Scrolling Sign - Simple scrolling text display tool',
      description: 'Create beautiful scrolling LED signs with custom text, colors, and animation speed. Perfect for events, shops, and presentations.'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Us - LED Scrolling Sign',
      description: 'Learn more about LED Scrolling Sign and our mission to provide simple, effective scrolling text display solutions.'
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
    meta: {
      title: 'Terms of Service - LED Scrolling Sign',
      description: 'Read our terms of service and understand your rights and responsibilities when using LED Scrolling Sign.'
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
    meta: {
      title: 'Privacy Policy - LED Scrolling Sign',
      description: 'Learn how we collect, use, and protect your personal information.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 更新页面标题和描述
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }
  next()
})

export default router

