# Deployment Guide for Vercel

## Prerequisites
- Vercel account
- MongoDB Atlas database
- Cloudinary account (for image uploads)

## Step-by-Step Deployment

### 1. Prepare Environment Variables
Before deploying, make sure you have all required environment variables ready:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure your project:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. Add Environment Variables:
   - Go to Settings → Environment Variables
   - Add all variables from `.env.example`

6. Click "Deploy"

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### 3. Post-Deployment Checklist

✅ Verify all environment variables are set correctly
✅ Check MongoDB connection is working
✅ Test authentication (login/register)
✅ Test file uploads (Cloudinary integration)
✅ Check all API routes are responding
✅ Test university pages loading
✅ Verify i18n (internationalization) is working
✅ Check admin dashboard access

### 4. Common Issues and Solutions

#### Build Errors
- **Module not found**: Run `npm install` locally and commit `package-lock.json`
- **TypeScript errors**: Check `tsconfig.json` settings
- **ESLint errors**: Fix code issues or adjust `.eslintrc.json`

#### Runtime Errors
- **Database connection failed**: Verify `MONGODB_URI` in Vercel environment variables
- **JWT errors**: Check `JWT_SECRET` is set
- **Image upload fails**: Verify Cloudinary credentials

#### Performance Issues
- Enable Image Optimization in `next.config.js`
- Use dynamic imports for heavy components
- Implement caching strategies

### 5. Update Deployment
```bash
# Push changes to Git
git add .
git commit -m "Your commit message"
git push origin main

# Vercel will automatically redeploy
```

### 6. Environment-Specific Configuration

**Development:**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Production:**
```
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
```

### 7. Domain Configuration
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel

### 8. Monitoring
- Check Vercel Analytics for performance insights
- Monitor error logs in Vercel Dashboard
- Set up alerts for deployment failures

## Support
For issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- Project README.md
