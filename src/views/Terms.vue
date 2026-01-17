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
        <h1>Terms of Service</h1>
        <p class="last-updated">Last Updated: January 17, 2026</p>
        
        <section class="content-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using LED Scrolling Sign ("the Service"), you accept and agree to be bound 
            by the terms and provision of this agreement. If you do not agree to these terms, please do 
            not use the Service.
          </p>
        </section>

        <section class="content-section">
          <h2>2. Description of Service</h2>
          <p>
            LED Scrolling Sign is a free web-based tool that allows users to create and display scrolling 
            text messages with customizable colors, fonts, and animation speeds. The Service is provided 
            "as is" without warranties of any kind.
          </p>
        </section>

        <section class="content-section">
          <h2>3. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use the Service in compliance with all applicable laws and regulations</li>
            <li>Not use the Service for any illegal, harmful, or offensive purposes</li>
            <li>Not display content that infringes on intellectual property rights</li>
            <li>Not display content that is defamatory, obscene, or hateful</li>
            <li>Not attempt to disrupt or interfere with the Service's operation</li>
            <li>Not use automated systems to access the Service without permission</li>
          </ul>
        </section>

        <section class="content-section">
          <h2>4. Intellectual Property</h2>
          <p>
            The Service's code, design, and related materials are provided under open-source licenses 
            where applicable. Users retain full ownership of any content they create using the Service. 
            The LED Scrolling Sign name and branding remain the property of the project maintainers.
          </p>
        </section>

        <section class="content-section">
          <h2>5. Privacy and Data</h2>
          <p>
            All user settings and content are stored locally in your browser. We do not collect, store, 
            or transmit your personal information or message content to our servers. Please review our 
            <router-link to="/privacy">Privacy Policy</router-link> for more information.
          </p>
        </section>

        <section class="content-section">
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER 
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
            FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that:
          </p>
          <ul>
            <li>The Service will meet your specific requirements</li>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from using the Service will be accurate or reliable</li>
            <li>Any errors in the Service will be corrected</li>
          </ul>
        </section>

        <section class="content-section">
          <h2>7. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL THE SERVICE PROVIDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
            SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS 
            OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
          </p>
          <ul>
            <li>The use or inability to use the Service</li>
            <li>Unauthorized access to or alteration of your data</li>
            <li>Any other matter relating to the Service</li>
          </ul>
        </section>

        <section class="content-section">
          <h2>8. Third-Party Services</h2>
          <p>
            The Service may include links to third-party websites or services that are not owned or 
            controlled by us. We have no control over and assume no responsibility for the content, 
            privacy policies, or practices of any third-party services.
          </p>
        </section>

        <section class="content-section">
          <h2>9. Analytics</h2>
          <p>
            We use Google Analytics to understand how users interact with the Service. This helps us 
            improve the user experience. Analytics data is collected in accordance with Google's 
            privacy policies and our own Privacy Policy.
          </p>
        </section>

        <section class="content-section">
          <h2>10. Modifications to Service</h2>
          <p>
            We reserve the right to modify or discontinue the Service, temporarily or permanently, 
            with or without notice. We shall not be liable to you or any third party for any 
            modification, suspension, or discontinuance of the Service.
          </p>
        </section>

        <section class="content-section">
          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these Terms of Service at any time without prior 
            notice. Your continued use of the Service after any such changes constitutes your acceptance 
            of the new Terms of Service.
          </p>
        </section>

        <section class="content-section">
          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable international 
            laws, without regard to its conflict of law provisions.
          </p>
        </section>

        <section class="content-section">
          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
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
          <p>By using LED Scrolling Sign, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
          <router-link to="/" class="cta-button">
            Back to Home →
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
  margin-bottom: 10px;
  text-align: center;
}

.last-updated {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-bottom: 40px;
}

.content-section {
  margin-bottom: 35px;
}

.content-section h2 {
  font-size: 24px;
  color: #667eea;
  margin-bottom: 15px;
  margin-top: 30px;
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
  margin-left: 20px;
}

.content-section li {
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

.content-section li::before {
  content: "•";
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

.cta-section {
  text-align: center;
  background: #f8f9fa;
  padding: 40px;
  border-radius: 12px;
  margin-top: 50px;
  border: 2px solid #e9ecef;
}

.cta-section p {
  color: #2c3e50;
  font-size: 16px;
  margin-bottom: 25px;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 40px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
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
    font-size: 20px;
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

