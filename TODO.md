# Website Update Tasks

## 1. Universities Cards Design
- [x] Update FeaturedUniversities.js: reorder card elements (name top, logo centered, agent text below)
- [x] Update universities.css: add styles for new classes

## 2. Fix Services Link
- [x] Update Footer.js: change Services link from /universities to /services

## 3. Language Cleanup (English Default)
- [ ] Translate Arabic text to English in:
- [x] src/pages/universities/[id].js
  - [x] src/pages/universities/index.js
  - [x] src/pages/student/dashboard.js
  - [x] src/pages/contact.js
  - [ ] src/pages/admin/users.js
  - [ ] src/pages/admin/universities/add.js
  - [ ] src/pages/admin/universities/[id].js
  - [ ] src/pages/admin/universities/index.js
  - [ ] src/pages/api/admin/universities.js
  - [ ] src/pages/api/admin/add-university.js
  - [ ] src/scripts/hash-password.js
  - [ ] src/pages/api/upload.js

## 4. Multi-Language Support
- [x] Install react-i18next and i18next packages
- [x] Create i18n configuration file
- [x] Create translation JSON files for: English, Arabic, Turkish, Persian, Russian, French
- [x] Update Header.js: add language switcher dropdown
- [x] Update _app.js: wrap with I18nextProvider
- [x] Update _document.js: handle RTL for Arabic/Persian

## 5. Website Categorization
- [x] Review and improve navigation structure (navigation is already well-structured)

## 6. WhatsApp Contact Button
- [x] Create global floating WhatsApp component
- [x] Add to Layout.js

## Followup
- [x] Test multi-language switching and RTL (server running at http://localhost:3000)
- [x] Verify all routes and functionality
- [x] Ensure responsiveness
