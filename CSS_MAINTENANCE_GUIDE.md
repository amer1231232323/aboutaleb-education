# CSS Maintenance & Update Guide

## Quick Reference

### Where to Make CSS Changes

#### 🎨 Design System Changes
**File:** `src/styles/base.css`
- Colors
- Fonts  
- Spacing values
- Shadows
- Border radius
- Transitions
- CSS Variables

#### 📐 Layout & Grid Changes
**File:** `src/styles/layout.css`
- Container widths
- Grid layouts
- Flexbox utilities
- Spacing utilities
- Alignment classes
- Display utilities

#### 🧩 Form & Input Styling
**File:** `src/styles/components/inputs.css`
- Input fields
- Textareas
- Select dropdowns
- Labels
- Form validation states
- Button styles

#### 📄 Page Section Styling
**Files in `src/styles/sections/`:**
- `hero.css` - Hero section with gradient
- `universities.css` - University cards & listings
- `services.css` - Services section
- `cta.css` - Call-to-action section

#### 🏠 Page-Specific Styling
**Files in `src/styles/`:**
- `home..css` - Home page specific overrides
- `university.css` - University detail page
- `dashboard.css` - Dashboard layout
- `contact.css` - Contact page & forms

---

## Common Tasks

### Add a New Color
```css
/* In base.css, within :root { } */
--color-custom-blue: #1e40af;
```

### Add a New Spacing Size
```css
/* In base.css, within :root { } */
--spacing-80: 80px;
```

### Create a New Layout Grid
```css
/* In layout.css */
.grid-5 {
  grid-template-columns: repeat(5, 1fr);
}
```

### Add Component Button Style
```css
/* In components/inputs.css */
.btn-custom {
  background-color: var(--color-custom);
  padding: var(--spacing-12) var(--spacing-20);
}
```

### Style a Page Section
```css
/* Create or update src/styles/sections/your-section.css */
@import './sections/your-section.css'; /* Add to globals.css if new */

.your-section {
  padding: var(--spacing-48);
  background-color: var(--color-gray-50);
}
```

### Override Styles for Specific Page
```css
/* In university.css (or appropriate page file) */
.university-detail {
  background-color: var(--color-white);
  padding: var(--spacing-32);
}

.university-detail .card {
  border: 2px solid var(--color-primary);
}
```

---

## CSS Class Naming Conventions

### Utility Classes (from layout.css)
```
.container        Container with max-width
.container-lg     Large container
.grid-2           2 column grid
.flex             Flex display
.flex-center      Centered flex
.p-16             Padding 16px
.m-24             Margin 24px
.mb-8             Margin-bottom 8px
.text-primary     Blue text
.text-center      Centered text
```

### Component Classes (from components/inputs.css)
```
.btn-primary      Primary button
.btn-secondary    Secondary button
.btn-outline      Outline button
.form-group       Form group wrapper
.form-label       Form label
.form-control     Form input
.form-error       Error message
.card             Card container
.card-header      Card header section
.card-body        Card body content
.card-footer      Card footer section
```

### Section Classes (from sections/*.css)
```
.hero             Hero section
.hero-gradient    Hero with gradient
.universities     Universities section
.services         Services section
.cta              Call-to-action section
```

---

## Testing CSS Changes

### Local Development
```bash
npm run dev
# Open http://localhost:3000
# Browser DevTools (F12) will show which CSS file styles come from
```

### Build for Production
```bash
npm run build
# Check build output for CSS errors
```

### Check CSS Loading
```javascript
// In browser console:
const style = window.getComputedStyle(document.querySelector('button'));
console.log(style.backgroundColor); // Should show #2563eb or your color
```

---

## Import Order (DO NOT CHANGE)

This order is critical for CSS cascade:
1. Google Fonts (external)
2. base.css (variables)
3. layout.css (utilities)
4. components/inputs.css (components)
5. sections/* (section styles)
6. page-specific (overrides)

Later files override earlier ones = proper cascade.

---

## File Size Guide

Keep individual files manageable:
- `base.css` - ~300 lines (variables only)
- `layout.css` - ~700 lines (utilities)
- Section files - ~200 lines each (focused styles)
- Page files - ~100-200 lines (specific overrides)

If a file exceeds 500 lines, consider splitting it.

---

## Color Palette

### Primary Colors
- `--color-primary`: #2563eb (Main Blue)
- `--color-primary-dark`: #1d4ed8 (Darker Blue)
- `--color-primary-light`: #3b82f6 (Lighter Blue)

### Secondary Colors
- `--color-secondary`: #10b981 (Green)
- `--color-secondary-dark`: #059669 (Dark Green)

### Neutral Colors
- `--color-white`: #ffffff
- `--color-gray-50` to `--color-gray-900` (9 shades)

### Semantic Colors
- `--color-success`: #10b981 (Green)
- `--color-error`: #ef4444 (Red)
- `--color-warning`: #f59e0b (Amber)
- `--color-info`: #3b82f6 (Blue)

---

## Typography

### Fonts
- **Arabic Text:** 'Cairo', sans-serif
- **English Text:** 'Inter', sans-serif
- **Code:** 'Courier New', monospace

### Font Sizes
- `--font-size-xs`: 12px
- `--font-size-sm`: 14px
- `--font-size-base`: 16px
- `--font-size-lg`: 18px
- `--font-size-xl`: 20px
- `--font-size-2xl`: 24px
- `--font-size-5xl`: 36px

### Font Weights
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## Responsive Breakpoints

### Mobile First Approach
```css
/* Mobile (480px and below) */
@media (max-width: 480px) { }

/* Tablet (768px and below) */
@media (max-width: 768px) { }

/* Desktop (1024px and above) */
/* Default styles (no media query) */
```

### Test Sizes
- iPhone: 375px
- iPad: 768px
- Desktop: 1024px+

---

## Performance Tips

1. **Use CSS Variables** instead of hardcoding values
   - ✅ `color: var(--color-primary);`
   - ❌ `color: #2563eb;`

2. **Reuse Utility Classes** instead of custom CSS
   - ✅ `<div class="flex-center p-24">`
   - ❌ `<div style="display: flex; align-items: center; padding: 24px">`

3. **Group Related Styles** in their own file
   - ✅ Section-specific CSS in `sections/section-name.css`
   - ❌ Everything in one giant `globals.css`

4. **Use Transitions** for smooth interactions
   - ✅ `transition: var(--transition-base);`
   - ❌ No transition (jarring)

5. **Cache Busting** - Styles auto-update on save in dev mode
   - Run `npm run dev` to see changes immediately

---

## Debugging CSS Issues

### Styles Not Applying?
1. Check file is imported in `globals.css`
2. Check CSS selector specificity
3. Check browser DevTools (F12) for which file applies
4. Clear browser cache (Ctrl+Shift+R)

### Wrong Colors/Sizes?
1. Search for hardcoded values instead of CSS variables
2. Check if page-specific CSS is overriding
3. Verify variable names match in base.css

### Responsive Not Working?
1. Check media query breakpoints
2. Verify mobile-first approach (modify defaults, then add media queries)
3. Test with browser DevTools responsive mode

### Performance Issues?
1. Check for unused CSS rules
2. Remove duplicate styles
3. Consider lazy-loading large images
4. Use CSS variables for reusable values

---

## Getting Help

**CSS File Issues?**
- Check the CSS_AUDIT_REPORT.md for file locations and status

**Variable Names?**
- Open base.css and search for `--` to see all available variables

**Class Names?**
- Open layout.css to see all utility classes

**Component Styles?**
- Check components/inputs.css for form styling

**Section Styles?**
- Check sections/ folder for specific section styles

---

## Summary

✅ CSS is organized, modular, and maintainable  
✅ All files are properly imported in globals.css  
✅ Use CSS variables for consistency  
✅ Follow the folder structure when adding new styles  
✅ Test responsiveness on all device sizes  
✅ Keep files focused and under 500 lines
