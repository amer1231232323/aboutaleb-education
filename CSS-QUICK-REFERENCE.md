# 🎨 CSS Quick Reference Guide

## Common CSS Classes & Usage

### Buttons

```html
<button class="btn primary">Primary Button</button>
<button class="btn secondary">Secondary Button</button>
<button class="btn outline">Outline Button</button>
<button class="btn whatsapp">WhatsApp Button</button>
<button class="btn success">Success Button</button>
<button class="btn error">Error Button</button>
<button class="btn text">Text Button</button>

<!-- Sizes -->
<button class="btn small">Small</button>
<button class="btn large">Large</button>
<button class="btn full">Full Width</button>

<!-- Button Groups -->
<div class="btn-group">
  <button class="btn primary">Save</button>
  <button class="btn secondary">Cancel</button>
</div>
```

### Layout & Containers

```html
<!-- Container (max-width 1200px, centered) -->
<div class="container">Content</div>

<!-- Grid Systems -->
<div class="grid grid-2">  <!-- Auto 2-column -->
<div class="grid grid-3">  <!-- Auto 3-column -->
<div class="grid grid-4">  <!-- Auto 4-column -->

<!-- Flex Utilities -->
<div class="flex">Item 1</div>
<div class="flex-center">Centered</div>
<div class="flex-between">Left → Right</div>
<div class="flex flex-col gap-16">Vertical</div>

<!-- Gaps -->
<div class="gap-4">4px gap</div>
<div class="gap-8">8px gap</div>
<div class="gap-16">16px gap</div>
<div class="gap-24">24px gap</div>
```

### Spacing Utilities

```html
<!-- Margins -->
<div class="mt-8 mt-16 mt-24 mt-32">Top margin</div>
<div class="mb-8 mb-16 mb-24 mb-32">Bottom margin</div>

<!-- Padding -->
<div class="p-16">All sides</div>
<div class="px-16">Horizontal</div>
<div class="py-24">Vertical</div>

<!-- Text Alignment -->
<div class="text-center">Centered text</div>
<div class="text-right">Right aligned</div>
```

### Cards

```html
<!-- Basic Card -->
<div class="card">
  <div class="card-body">Content here</div>
</div>

<!-- Card with Header & Footer -->
<div class="card">
  <div class="card-header">Header</div>
  <div class="card-body">Body</div>
  <div class="card-footer">Footer</div>
</div>

<!-- University Card -->
<div class="university-card">
  <img src="logo.png" alt="University" />
  <h3>University Name</h3>
  <p>Description</p>
  <a href="#" class="btn small primary">Details</a>
</div>

<!-- Info Card -->
<div class="info-card">
  <h4>Feature Title</h4>
  <p>Feature description</p>
</div>

<!-- Trust/Stats Cards -->
<div class="trust-item">
  <h3>50000+</h3>
  <p>Students Enrolled</p>
</div>

<!-- Journey Step Cards -->
<div class="journey-step">
  <span>1</span>
  <h3>Step Title</h3>
  <p>Step description</p>
</div>

<!-- Why Cards -->
<div class="why-card">
  <h3>Benefit Title</h3>
  <p>Benefit description</p>
</div>

<!-- Admin Cards -->
<div class="admin-card">
  <h3>Admin Feature</h3>
  <p>Feature description</p>
</div>
```

### Navigation & Header

```html
<header class="header">
  <div class="container header-content">
    <!-- Logo -->
    <a href="/" class="logo">ABOU <span>TALEB</span></a>
    
    <!-- Navigation -->
    <nav class="nav open">
      <a href="/" class="active">Home</a>
      <a href="/universities">Universities</a>
      <a href="/contact">Contact</a>
      <a href="#" class="btn whatsapp small">WhatsApp</a>
    </nav>
    
    <!-- Mobile Menu -->
    <div class="burger active">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</header>
```

### Footer

```html
<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-col">
      <h3>About Us</h3>
      <p>Description</p>
    </div>
    <div class="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <p>Email: info@example.com</p>
    </div>
  </div>
  <div class="footer-bottom">
    Copyright © 2024 ABOU TALEB
  </div>
</footer>
```

### Forms

```html
<!-- Form Group -->
<div class="form-group">
  <label for="email" class="required">Email Address</label>
  <input type="email" id="email" placeholder="your@email.com" />
  <span class="form-hint">We'll never share your email</span>
</div>

<!-- With Error -->
<div class="form-group">
  <label for="password">Password</label>
  <input type="password" id="password" class="error" />
  <span class="form-error">Password must be at least 8 characters</span>
</div>

<!-- With Success -->
<div class="form-group">
  <label for="confirm">Confirm</label>
  <input type="email" id="confirm" class="success" />
  <span class="form-success">Email verified!</span>
</div>

<!-- Checkboxes -->
<div class="checkbox-group">
  <label>
    <input type="checkbox" /> Remember me
  </label>
  <label>
    <input type="checkbox" /> Subscribe to newsletter
  </label>
</div>

<!-- Radios -->
<div class="radio-group">
  <label>
    <input type="radio" name="option" /> Option 1
  </label>
  <label>
    <input type="radio" name="option" /> Option 2
  </label>
</div>

<!-- Form Row (Multi-column) -->
<div class="form-row">
  <input type="text" placeholder="First name" />
  <input type="text" placeholder="Last name" />
</div>

<!-- Form Actions -->
<div class="form-actions">
  <button class="btn primary">Submit</button>
  <button class="btn secondary">Cancel</button>
</div>
```

### Sections

```html
<!-- Hero Section -->
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-text">
      <h1>Main Title<br><span>Accent Color</span></h1>
      <p>Description paragraph</p>
      <div class="hero-buttons">
        <a href="#" class="btn primary">CTA 1</a>
        <a href="#" class="btn secondary">CTA 2</a>
      </div>
    </div>
    <div class="hero-image">
      <img src="image.png" alt="Hero" />
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="cta">
  <div class="container">
    <h2>Ready to Start?</h2>
    <p>Get in touch with us today</p>
    <a href="https://wa.me/..." class="btn whatsapp">Contact Us</a>
  </div>
</section>

<!-- Trust Section -->
<section class="trust">
  <div class="container">
    <h2 class="section-title">Why Choose Us</h2>
    <div class="trust-grid">
      <div class="trust-item">
        <h3>50000+</h3>
        <p>Students Enrolled</p>
      </div>
    </div>
  </div>
</section>

<!-- Journey Section -->
<section class="journey">
  <div class="container">
    <h2 class="section-title">Our Process</h2>
    <div class="journey-grid">
      <div class="journey-step">
        <span>1</span>
        <h3>Contact Us</h3>
        <p>Get a free consultation</p>
      </div>
    </div>
  </div>
</section>

<!-- Universities Section -->
<section class="universities">
  <div class="container">
    <h2 class="section-title">Our Universities</h2>
    <div class="universities-grid">
      <div class="university-card">
        <img src="logo.png" alt="University" />
        <h3>University Name</h3>
        <a href="#" class="btn small primary">Details</a>
      </div>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section class="contact">
  <div class="container contact-grid">
    <div class="contact-info">
      <h1>Contact Us</h1>
      <p>Description</p>
      <ul>
        <li>📞 Phone</li>
        <li>📧 Email</li>
        <li>📍 Location</li>
      </ul>
    </div>
    <form class="contact-form">
      <input type="text" placeholder="Your name" />
      <input type="email" placeholder="Your email" />
      <textarea placeholder="Your message"></textarea>
      <button class="btn primary">Send Message</button>
    </form>
  </div>
</section>

<!-- Auth Section -->
<section class="auth-page">
  <div class="container auth-box">
    <h1>Sign In</h1>
    <p>Enter your credentials to continue</p>
    
    <form>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button class="btn primary full">Sign In</button>
    </form>
    
    <p class="auth-link">
      Don't have an account? <a href="/register">Sign up here</a>
    </p>
  </div>
</section>
```

### Responsive Utilities

```html
<!-- Desktop Only -->
<div class="desktop-only">Visible only on desktop</div>

<!-- Mobile Only -->
<div class="mobile-only">Visible only on mobile</div>

<!-- Display Utilities -->
<div class="d-none">Hidden</div>
<div class="d-block">Block display</div>
<div class="d-inline">Inline display</div>
<div class="d-inline-block">Inline-block display</div>
```

---

## CSS Variables Reference

### Spacing
```css
--spacing-4: 4px
--spacing-8: 8px
--spacing-12: 12px
--spacing-16: 16px
--spacing-24: 24px
--spacing-32: 32px
--spacing-40: 40px
--spacing-48: 48px
--spacing-56: 56px
--spacing-64: 64px
```

### Colors (Primary - Blue)
```css
--primary: #2563eb
--primary-light: #3b82f6
--primary-lighter: #60a5fa
--primary-dark: #1d4ed8
--primary-darker: #1e40af
```

### Colors (Secondary - Green)
```css
--secondary: #10b981
--secondary-light: #34d399
--secondary-dark: #059669
```

### Colors (Grays - 10 shades)
```css
--gray-50: #f9fafb      /* Lightest */
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827      /* Darkest */
```

### Semantic Colors
```css
--white: #ffffff
--dark: #111827
--error: #ef4444
--success: #10b981
--warning: #f59e0b
```

### Typography
```css
--font-family-body: "Cairo", "Segoe UI", sans-serif
--font-family-mono: "Courier New"

--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-size-xl: 20px
--font-size-2xl: 24px
--font-size-3xl: 28px
--font-size-4xl: 32px
--font-size-5xl: 36px

--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
```

### Radius
```css
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px
--radius-2xl: 16px
--radius-full: 9999px
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-elevation: 0 15px 35px rgba(0, 0, 0, 0.1)
```

---

## Responsive Breakpoints

```css
/* Desktop (1024px and above) */
@media (min-width: 1024px) { }

/* Tablet (768px to 1023px) */
@media (max-width: 1023px) { }

/* Mobile (480px to 767px) */
@media (max-width: 767px) { }

/* Small Mobile (below 480px) */
@media (max-width: 480px) { }
```

---

## Tips & Tricks

1. **Use Grid for Layouts** - `.grid-2`, `.grid-3`, `.grid-4` auto-adjust
2. **Leverage Spacing Variables** - Always use `--spacing-*` instead of hardcoded values
3. **Mobile First** - Default styles work on mobile, add desktop enhancements
4. **Color Semantic Usage** - Use `--error`, `--success`, `--warning` for consistent messaging
5. **Responsive Text** - Font sizes automatically adjust with `@media` queries
6. **Button Groups** - Use `.btn-group` to align multiple buttons
7. **Form Validation** - Add `.error` or `.success` class to inputs
8. **Section Padding** - Sections auto-have `padding: var(--spacing-64) 0`

---

**Need help?** Check `CSS-MODERNIZATION.md` for detailed documentation!
