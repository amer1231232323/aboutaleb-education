# Project Refactor & Upgrade TODO

## PHASE 1 — CLEAN & STRUCTURE
- [ ] Scan src/ for unused imports and remove them
- [ ] Remove dead code and commented code blocks
- [ ] Audit CSS files for unused classes and rules
- [x] Remove redundant markdown files in root
- [ ] Clean unused scripts in scripts/ folder
- [ ] Organize components into logical subfolders if needed
- [ ] Ensure consistent file naming and structure

## PHASE 2 — UI & ROUTING FIX
- [x] Break down src/pages/index.js into separate components:
  - [x] Create src/components/home/Hero.js
  - [x] Create src/components/home/WhyStudy.js
  - [x] Create src/components/home/FeaturedUniversities.js
  - [x] Create src/components/home/OurServices.js
  - [x] Update index.js to use new components
- [x] Fix typos in home page content
- [ ] Ensure all pages are responsive (check mobile layouts)
- [ ] Verify navigation links work correctly
- [ ] Test routing between pages

## PHASE 3 — UNIVERSITIES PAGE GENERATOR
- [ ] Check public/logo/ filenames - rename to university names if numbered
- [ ] Verify universities/index.js reads logos correctly
- [ ] Ensure details buttons link properly to /universities/[name]
- [ ] Test university details pages load correctly

## PHASE 4 — DASHBOARDS
- [ ] Verify admin authentication and dashboard access
- [ ] Test student dashboard functionality
- [ ] Check CRUD operations for universities
- [ ] Verify applications management works
- [ ] Test role-based access control

## PHASE 5 — USER MANAGEMENT
- [x] Implement user list view in src/pages/admin/users.js
- [x] Add user edit functionality
- [x] Add user delete functionality
- [x] Add role change functionality
- [x] Create API endpoints for user management:
  - [x] GET /api/admin/users
  - [x] PUT /api/admin/users/[id]
  - [x] DELETE /api/admin/users/[id]

## PHASE 6 — DATABASE SETUP
- [ ] Verify MongoDB connection in src/lib/db.js
- [ ] Check User, University, Application models
- [ ] Update university details page to fetch from database
- [ ] Ensure all API endpoints use database properly
- [ ] Test database operations

## PHASE 7 — ANIMATIONS & DESIGN
- [ ] Add Framer Motion animations:
  - [ ] Hover effects for buttons/cards
  - [ ] Fade-in animations on page load
  - [ ] Smooth transitions
- [ ] Improve UI design elements
- [ ] Optimize animations for performance
- [ ] Test animations across different devices

## PHASE 8 — FINAL CHECK
- [x] Run full application test
- [x] Verify all features work without breaking
- [x] Document updated file structure
- [x] List all API endpoints
- [x] Document admin/student login process
- [x] Show MongoDB configuration
- [x] Final cleanup and optimization
