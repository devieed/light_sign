<template>
  <div class="page-container">
    <header class="page-header">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>💡 LED Scrolling Sign</h1>
        </router-link>
        <nav class="nav-menu">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/terms">Terms</router-link>
          <router-link to="/privacy">Privacy</router-link>
        </nav>
      </div>
    </header>

    <main class="page-content">
      <div class="content-wrapper">
        <h1>About Us</h1>
        
        <section class="content-section">
          <h2>🎯 Our Mission</h2>
          <p>
            LED Scrolling Sign is a simple, free, and powerful tool designed to help you create 
            beautiful scrolling text displays for any occasion. Whether you're organizing an event, 
            running a shop, or giving a presentation, our tool makes it easy to communicate your 
            message in an eye-catching way.
          </p>
        </section>

        <section class="content-section">
          <h2>✨ What We Offer</h2>
          <ul>
            <li><strong>Easy to Use:</strong> No registration required, start creating immediately</li>
            <li><strong>Fully Customizable:</strong> Choose your text, colors, size, and scroll speed</li>
            <li><strong>Mobile Optimized:</strong> Works perfectly on smartphones in landscape mode</li>
            <li><strong>Free Forever:</strong> All features available at no cost</li>
            <li><strong>Privacy Focused:</strong> Your data stays in your browser</li>
            <li><strong>Multi-language Support:</strong> Available in 19+ languages</li>
          </ul>
        </section>

        <section class="content-section">
          <h2>💡 Perfect For</h2>
          <div class="use-cases">
            <div class="use-case">
              <span class="emoji">🎉</span>
              <h3>Events & Celebrations</h3>
              <p>Display welcome messages, announcements, or congratulations</p>
            </div>
            <div class="use-case">
              <span class="emoji">🏪</span>
              <h3>Retail & Business</h3>
              <p>Show promotions, sales, or important information</p>
            </div>
            <div class="use-case">
              <span class="emoji">💼</span>
              <h3>Presentations</h3>
              <p>Create dynamic text displays for meetings and conferences</p>
            </div>
            <div class="use-case">
              <span class="emoji">📱</span>
              <h3>Handheld Signs</h3>
              <p>Use your phone or tablet as a portable scrolling sign</p>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2>🌍 Global Reach</h2>
          <p>
            We support 19 languages including English, Chinese, Japanese, Korean, Spanish, French, 
            German, Russian, Arabic, Portuguese, Italian, Dutch, Polish, Turkish, Vietnamese, Thai, 
            Indonesian, and Hindi. Our goal is to make scrolling text displays accessible to everyone, 
            everywhere.
          </p>
        </section>

        <section class="content-section">
          <h2>🔒 Your Privacy Matters</h2>
          <p>
            We believe in privacy-first design. All your settings and configurations are stored 
            locally in your browser. We don't collect, store, or transmit your personal data or 
            message content. Your scrolling signs are yours alone.
          </p>
        </section>

        <section class="content-section">
          <h2>📧 Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <p>
            <strong>Service Email:</strong> 
            <a href="mailto:service@botcode.cc">service@botcode.cc</a>
          </p>
          <p>
            You can also reach out through our 
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
          </p>
        </section>

        <section class="content-section cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Create your first scrolling sign in seconds!</p>
          <router-link to="/" class="cta-button">
            Start Creating →
          </router-link>
        </section>
      </div>
    </main>

    <footer class="page-footer">
      <div class="footer-content">
        <p>© 2026 LED Scrolling Sign - Simple scrolling text display tool</p>
        <div class="footer-links">
          <router-link to="/about">About</router-link>
          <router-link to="/terms">Terms</router-link>
          <router-link to="/privacy">Privacy</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  overflow-y: auto;
  overflow-x: hidden;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.logo {
  text-decoration: none;
  color: white;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
  padding: 5px 10px;
  border-radius: 5px;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.page-content {
  flex: 1;
  padding: 60px 20px;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.content-wrapper h1 {
  font-size: 42px;
  color: #2c3e50;
  margin-bottom: 40px;
  text-align: center;
}

.content-section {
  margin-bottom: 40px;
}

.content-section h2 {
  font-size: 28px;
  color: #667eea;
  margin-bottom: 20px;
}

.content-section p {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
}

.content-section ul {
  list-style: none;
  padding: 0;
}

.content-section li {
  padding: 12px 0;
  padding-left: 30px;
  position: relative;
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

.content-section li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
  font-size: 20px;
}

.content-section a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.content-section a:hover {
  text-decoration: underline;
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

.use-case {
  text-align: center;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.use-case:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
}

.use-case .emoji {
  font-size: 48px;
  display: block;
  margin-bottom: 15px;
}

.use-case h3 {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.use-case p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.cta-section {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 50px;
  border-radius: 12px;
  margin-top: 50px;
}

.cta-section h2 {
  color: white;
  margin-bottom: 15px;
}

.cta-section p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 25px;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 15px 40px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.page-footer {
  background: #2c3e50;
  color: white;
  padding: 30px 20px;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-content p {
  margin-bottom: 15px;
  opacity: 0.9;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}

.footer-links a {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 1;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 30px 20px;
  }

  .content-wrapper h1 {
    font-size: 32px;
  }

  .content-section h2 {
    font-size: 24px;
  }

  .use-cases {
    grid-template-columns: 1fr;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-menu {
    width: 100%;
  }
}
</style>

