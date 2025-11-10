# Firestore Indexes Required

If you encounter "The query requires an index" errors, you need to create composite indexes in Firestore.

## Required Indexes

### Comments Collection

- **Collection**: `comments`
- **Fields**:
  - `postId` (Ascending)
  - `createdAt` (Descending)

## How to Create Indexes

### Method 1: Automatic (Recommended)

1. When you see the error in the browser console, it will include a link like:
   ```
   https://console.firebase.google.com/v1/r/project/your-project/firestore/indexes?create_composite=...
   ```
2. Click this link while logged into your Firebase account
3. Click "Create Index" in the Firebase Console
4. Wait for the index to build (usually takes a few minutes)

### Method 2: Manual

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Firestore Database → Indexes
4. Click "Create Index"
5. Set up the index:
   - **Collection ID**: `comments`
   - **Field 1**: `postId` (Ascending)
   - **Field 2**: `createdAt` (Descending)
6. Click "Create"

## Fallback Behavior

The app includes fallback logic that:

- Tries the optimized query first
- Falls back to a simple query if indexes aren't available
- Sorts results in memory (slower but functional)
- Shows user-friendly error messages

This means comments will work even without indexes, just with slightly slower performance.
