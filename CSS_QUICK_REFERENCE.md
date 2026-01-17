# 🎨 CSS Quick Reference Card

## At a Glance

| Aspect | Details |
|--------|---------|
| **Master File** | `src/styles/globals.css` (80 lines) |
| **Total CSS** | ~1,912 lines across 13 files |
| **CSS Files** | 13 (1 import file + 12 style files) |
| **Variables** | 50+ CSS custom properties |
| **Utility Classes** | 100+ reusable classes |
| **Build Status** | ✅ 0 Errors, 27 routes compiled |
| **Import Order** | 1. Fonts 2. Variables 3. Layout 4. Components 5. Sections 6. Pages |

---

## File Quick Reference

### Where Is What?

**Need to change colors?**  
→ Edit `src/styles/base.css` (look for `--color-*`)

**Need to change spacing?**  
→ Edit `src/styles/base.css` (look for `--spacing-*`)

**Need to change grid/layout?**  
→ Edit `src/styles/layout.css` (look for `.grid-`, `.flex-`)

**Need to style forms?**  
→ Edit `src/styles/components/inputs.css` (or create new file)

**Need to style hero section?**  
→ Edit `src/styles/sections/hero.css`

**Need to style home page?**  
→ Edit `src/styles/home..css`

**Need to style university detail page?**  
→ Edit `src/styles/university.css`

**Need to style dashboard?**  
→ Edit `src/styles/dashboard.css`

**Need to style contact page?**  
→ Edit `src/styles/contact.css`

---

## CSS Variables Available

### Colors
```css
--color-primary: #2563eb          /* Main blue */
--color-primary-dark: #1d4ed8     /* Darker blue */
--color-primary-light: #3b82f6    /* Lighter blue */
--color-secondary: #10b981        /* Green */
--color-white: #ffffff
--color-gray-50 to --color-gray-900
--color-success, --color-error, --color-warning
```

### Spacing (4px base unit)
```css
--spacing-2: 2px
--spacing-4: 4px
--spacing-8: 8px
--spacing-12: 12px
--spacing-16: 16px
--spacing-24: 24px
--spacing-32: 32px
--spacing-48: 48px
--spacing-64: 64px
```

### Fonts
```css
--font-family-primary: 'Cairo', sans-serif    /* Arabic */
--font-family-secondary: 'Inter', sans-serif  /* English */
--font-family-mono: 'Courier New', monospace  /* Code */

--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-size-xl: 20px
--font-size-2xl: 24px
--font-size-5xl: 36px
```

### Effects
```css
--shadow-sm, --shadow-md, --shadow-lg, --shadow-xl
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px
--radius-full: 9999px
--transition-fast: 150ms ease
--transition-base: 250ms ease
--transition-slow: 350ms ease
```

---

## Utility Classes

### Layout
```css
.container         /* Max-width container */
.container-sm      /* 640px max-width */
.container-lg      /* 1200px max-width */
.grid              /* CSS Grid display */
.grid-2            /* 2 column grid */
.grid-3            /* 3 column grid */
.grid-4            /* 4 column grid */
.flex              /* Flexbox display */
.flex-center       /* Centered flex (center align & justify) */
.flex-between      /* Space-between flex */
.flex-col          /* Column direction */
```

### Spacing
```css
.p-4               /* Padding 4px all sides */
.p-16              /* Padding 16px all sides */
.px-8              /* Padding left & right 8px */
.py-16             /* Padding top & bottom 16px */
.m-0               /* Margin 0 */
.m-auto            /* Margin auto (center) */
.mb-8              /* Margin-bottom 8px */
.mt-16             /* Margin-top 16px */
.mx-auto           /* Margin left & right auto */
.gap-8             /* Gap between flex/grid items */
```

### Text
```css
.text-primary      /* Primary color text */
.text-center       /* Text align center */
.text-left         /* Text align left */
.text-right        /* Text align right */
.text-muted        /* Gray text */
```

### Display
```css
.block             /* Display block */
.inline-block      /* Display inline-block */
.flex              /* Display flex */
.hidden            /* Display none */
```

---

## Component Classes

### Buttons
```css
.btn-primary       /* Blue button */
.btn-secondary     /* Gray button */
.btn-outline       /* Outlined button */
.btn-success       /* Green button */
.btn-danger        /* Red button */
.btn-sm            /* Small button */
.btn-lg            /* Large button */
.btn-full          /* Full width button */
```

### Forms
```css
.form-group        /* Form field wrapper */
.form-label        /* Form label text */
.form-control      /* Form input/textarea/select */
.form-error        /* Error message */
.form-text         /* Helper text */
```

### Cards
```css
.card              /* Card container */
.card-header       /* Card top section */
.card-body         /* Card content */
.card-footer       /* Card bottom section */
.card-image        /* Card image container */
```

### Other
```css
.badge             /* Badge/tag */
.alert             /* Alert message */
.table-wrapper     /* Table container */
```

---

## How to Use

### Add a Class to HTML
```html
<button class="btn-primary">Click</button>
<div class="container grid-3 p-24">
  <div class="card">
    <div class="card-body">Content</div>
  </div>
</div>
```

### Use CSS Variables in Your CSS
```css
.my-element {
  color: var(--color-primary);           /* Blue */
  padding: var(--spacing-16);            /* 16px */
  font-family: var(--font-family-primary); /* Cairo */
  box-shadow: var(--shadow-lg);          /* Large shadow */
  border-radius: var(--radius-lg);       /* 8px radius */
}
```

### Create New Style (Best Practices)
```css
/* In appropriate CSS file (not globals.css) */

/* Use variables instead of hardcoding */
.my-new-button {
  background: var(--color-primary);
  padding: var(--spacing-12) var(--spacing-24);
  font-size: var(--font-size-base);
  border-radius: var(--radius-lg);
  transition: var(--transition-base);
}

.my-new-button:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-lg);
}
```

---

## Common Updates

### Change Primary Color
```css
/* In base.css */
:root {
  --color-primary: #NEW_COLOR;  /* Change this */
  /* All buttons, links, etc. update automatically */
}
```

### Add New Spacing Size
```css
/* In base.css */
:root {
  --spacing-100: 100px;  /* Add this */
}

/* Now use in HTML: class="p-100" */
```

### Change Button Appearance
```css
/* In components/inputs.css */
.btn-primary {
  background-color: var(--color-primary);
  /* Modify any properties */
}
```

### Add Section Styling
```css
/* In sections/my-section.css */
.my-section {
  padding: var(--spacing-48);
  background: var(--color-gray-50);
}

/* Add import to globals.css:
@import './sections/my-section.css'; */
```

---

## Build & Test Commands

```bash
# Start dev server (watch mode)
npm run dev

# Build for production
npm run build

# Check for CSS errors
npm run build  # Look at output
```

---

## Responsive Design

### Mobile First Approach
```css
/* Default: Mobile */
.my-element { font-size: 14px; }

/* Tablet 768px+ */
@media (min-width: 768px) {
  .my-element { font-size: 16px; }
}

/* Desktop 1024px+ */
@media (min-width: 1024px) {
  .my-element { font-size: 18px; }
}
```

### Available Breakpoints
- 480px - Mobile
- 768px - Tablet  
- 1024px - Desktop

---

## Browser DevTools Tips

### Check Applied Styles
1. Right-click element → Inspect
2. Look at "Styles" panel
3. File path shows which CSS file
4. Click filename to jump to CSS

### Debug CSS Issues
```javascript
// In browser console (F12)
const el = document.querySelector('button');
const style = window.getComputedStyle(el);
console.log(style.backgroundColor); // Shows actual color
```

---

## File Organization

```
src/styles/
├── globals.css              ← Entry point (import only!)
├── base.css                 ← Modify: colors, spacing, fonts
├── layout.css               ← Modify: grid, flex, utilities
├── home..css                ← Modify: home page styles
├── contact.css              ← Modify: contact page styles
├── university.css           ← Modify: university page styles
├── dashboard.css            ← Modify: dashboard page styles
├── components/
│   └── inputs.css           ← Modify: forms, buttons
└── sections/
    ├── hero.css             ← Modify: hero section
    ├── cta.css              ← Modify: CTA section
    ├── universities.css     ← Modify: universities section
    └── services.css         ← Modify: services section
```

---

## Checklist Before Making Changes

- ✅ Understand which file contains the styles
- ✅ Use CSS variables instead of hardcoding values
- ✅ Use utility classes instead of inline styles
- ✅ Test in browser (npm run dev)
- ✅ Check DevTools to verify styles apply
- ✅ Test responsive design on mobile
- ✅ Build successfully before deploying (npm run build)

---

## Quick Wins

**Make everything blue?**  
Change `--color-primary` in base.css

**Make everything bigger?**  
Increase `--font-size-base` in base.css

**Change button colors?**  
Edit `.btn-primary` in components/inputs.css

**Add rounded corners?**  
Use class `rounded-lg` or change `--radius-lg`

**Add padding to everything?**  
Add `p-16` class to container

**Responsive grid?**  
Use `.grid-2` (becomes single column on mobile auto)

---

## Resources

📄 **CSS_AUDIT_REPORT.md** - Full technical details  
📄 **CSS_MAINTENANCE_GUIDE.md** - How to update styles  
📄 **CSS_ARCHITECTURE.md** - Visual diagrams of CSS structure  
📄 **THIS FILE** - Quick reference  

---

## Summary

✅ CSS properly connected  
✅ 13 organized files  
✅ 50+ variables available  
✅ 100+ utility classes  
✅ Build status: 0 errors  
✅ Ready for development  

**Start making changes! Changes auto-reload in dev mode ⚡**
