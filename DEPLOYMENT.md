# BlogTime Deployment Guide

## Pre-deployment Checklist

### 1. Environment Setup

- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all Firebase configuration values in `.env`
- [ ] Test the app locally with `npm start`
- [ ] Build the app successfully with `npm run build`

### 2. Firebase Setup

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Security rules configured (see README.md)
- [ ] Test Firebase connection locally

### 3. Code Preparation

- [ ] All sensitive data moved to environment variables
- [ ] `.env` file added to `.gitignore`
- [ ] Code committed to Git repository
- [ ] Repository pushed to GitHub/GitLab

## Netlify Deployment Steps

### 1. Connect Repository

1. Log in to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose your Git provider (GitHub, GitLab, etc.)
4. Select your BlogTime repository

### 2. Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `build`
- **Node version**: 18 or higher (set in environment variables if needed)

### 3. Environment Variables

Add these in Site Settings → Environment Variables:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Deploy

1. Click "Deploy site"
2. Wait for build to complete
3. Test the deployed site
4. Check browser console for any errors

## Post-deployment Testing

### 1. Basic Functionality

- [ ] Site loads without errors
- [ ] Navigation works correctly
- [ ] Posts display properly
- [ ] Images load correctly

### 2. Authentication

- [ ] Login page works
- [ ] Registration works
- [ ] Dashboard accessible after login
- [ ] Logout functionality works

### 3. Content Management

- [ ] Create new post works
- [ ] Edit existing post works
- [ ] Delete post works
- [ ] Post approval workflow (for master users)

### 4. Firebase Integration

- [ ] Posts save to Firestore
- [ ] Real-time updates work
- [ ] No permission errors in console
- [ ] Data migration completed successfully

## Troubleshooting

### Common Issues

1. **Build Fails**

   - Check Node.js version compatibility (use Node 18.x)
   - Verify all dependencies are installed
   - Check for TypeScript/ESLint errors
   - ESLint warnings treated as errors in CI (fixed with CI=false in build script)

2. **Environment Variables Not Working**

   - Ensure variables start with `REACT_APP_`
   - Check for typos in variable names
   - Verify values are set in Netlify dashboard

3. **Firebase Connection Issues**

   - Verify all Firebase config values are correct
   - Check Firestore security rules
   - Ensure Firebase project is active

4. **Routing Issues**
   - Verify `netlify.toml` is in root directory
   - Check redirect rules are configured
   - Test direct URL access to pages

### Getting Help

If you encounter issues:

1. Check browser console for errors
2. Review Netlify build logs
3. Test locally with production build: `npm run build && npx serve -s build`
4. Check Firebase console for any issues

## Security Notes

- Never commit `.env` file to version control
- Use Firestore security rules appropriate for your use case
- Consider implementing proper authentication for production
- Regularly update dependencies for security patches
