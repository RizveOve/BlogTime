# React Blog

A modern, responsive blog application built with React that features user authentication, content management, and a clean, intuitive interface for both readers and authors.

## Features

### For Readers

- **Browse Posts**: View all published blog posts on the homepage
- **Read Full Articles**: Click on any post to read the complete content
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **About Page**: Learn more about the blog and its authors

### For Authors

- **User Registration**: Create author accounts to start writing
- **Authentication System**: Secure login/logout functionality
- **Content Creation**: Rich text editor for creating and editing posts
- **Draft Management**: Save posts as drafts before publishing
- **Personal Dashboard**: Manage all your posts in one place

### For Master Users

- **Content Moderation**: Approve or reject posts from other authors
- **User Management**: Oversee all authors and their content
- **Full Editorial Control**: Edit, delete, or manage any post
- **Analytics Dashboard**: View statistics about posts and authors

## Technology Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.8.0
- **Styling**: CSS3 with responsive design
- **State Management**: React Context API
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (ready for integration)
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Firebase project (for data storage)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd react-blog
```

2. Install dependencies:

```bash
npm install
```

3. Firebase Setup:

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Update the Firebase configuration in `src/firebase/config.js` with your project credentials
   - Set up Firestore security rules (see Firebase Configuration section below)

4. Start the development server:

```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

The app will automatically migrate existing sample data to Firebase on first run.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Firebase Configuration

### Firestore Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to published blog posts
    match /blogPosts/{document} {
      allow read: if resource.data.status == 'published' || request.auth != null;
      allow write: if request.auth != null;
    }

    // Allow authenticated users to manage users collection
    match /users/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Environment Variables (Optional)

For production, consider using environment variables for Firebase config:

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

## Demo Credentials

The application comes with a pre-configured master account:

- **Email**: master@blog.com
- **Password**: master123

You can also register new author accounts through the registration page.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Site footer
│   └── ProtectedRoute.js # Route protection for authenticated users
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state management
│   └── BlogContext.js  # Blog posts state management
├── data/               # Static data and initial content
│   └── blogPosts.js    # Sample blog posts
├── pages/              # Main application pages
│   ├── Home.js         # Homepage with post listings
│   ├── About.js        # About page
│   ├── Login.js        # User login
│   ├── Register.js     # User registration
│   ├── Dashboard.js    # Author dashboard
│   ├── BlogPost.js     # Individual post view
│   └── EditPost.js     # Post creation/editing
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Key Features Explained

### Authentication System

- Role-based access control (Master, Author)
- Persistent login sessions using localStorage
- Protected routes for authenticated content
- User registration with email validation

### Content Management

- CRUD operations for blog posts
- Post status system (Published, Pending, Rejected)
- Image support for featured images
- Rich content editing with markdown support

### User Roles

**Master User**:

- Can approve/reject posts from other authors
- Full access to edit or delete any content
- View comprehensive dashboard with all posts
- Manage user permissions

**Author**:

- Create and edit their own posts
- Submit posts for approval (if not master)
- View personal dashboard with their content
- Cannot modify other authors' posts

### Data Persistence

Uses Firebase Firestore for data persistence, providing:

- Real-time data synchronization
- Scalable cloud storage
- Automatic data migration from sample posts
- Secure access with authentication rules
- Offline support (when configured)

## Customization

### Styling

All components have corresponding CSS files that can be modified to match your brand:

- Global styles in `src/index.css`
- Component-specific styles in respective `.css` files
- Responsive breakpoints already configured

### Content

- Modify initial blog posts in `src/data/blogPosts.js`
- Update site branding in `src/components/Header.js`
- Customize the About page content in `src/pages/About.js`

### Features

The modular architecture makes it easy to:

- Add new post categories
- Implement comment systems
- Add social sharing
- Integrate analytics
- Add search functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] Database integration
- [ ] Comment system
- [ ] Social media sharing
- [ ] Search functionality
- [ ] Categories and tags
- [ ] Email notifications
- [ ] SEO optimization
- [ ] Performance analytics
- [ ] Mobile app version

## Troubleshooting

### Firebase Connection Issues

If you encounter Firebase connection problems:

1. **Check your Firebase configuration** in `src/firebase/config.js`
2. **Verify Firestore is enabled** in your Firebase project
3. **Check browser console** for detailed error messages
4. **Test Firebase connection** by opening browser dev tools and running:
   ```javascript
   import("./src/utils/testFirebase.js").then((module) =>
     module.testFirebaseConnection()
   );
   ```

### Common Issues

- **"Permission denied" errors**: Check your Firestore security rules
- **"Firebase not initialized"**: Verify your Firebase config is correct
- **Posts not loading**: Check browser network tab for failed requests
- **Migration not running**: Clear browser cache and reload

## Support

If you encounter any issues or have questions, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

Built with ❤️ using React
