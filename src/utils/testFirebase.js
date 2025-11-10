import { blogService } from '../firebase/blogService';
import { checkMigrationStatus, migrateDataToFirebase } from '../firebase/migrationScript';

// Test Firebase connection and migration
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Check if migration is needed
    const hasMigratedData = await checkMigrationStatus();
    console.log('Has migrated data:', hasMigratedData);
    
    if (!hasMigratedData) {
      console.log('Running migration...');
      const migrationResult = await migrateDataToFirebase();
      console.log('Migration result:', migrationResult);
    }
    
    // Test fetching posts
    const posts = await blogService.getAllPosts();
    console.log('Fetched posts:', posts.length);
    
    return {
      success: true,
      postsCount: posts.length
    };
    
  } catch (error) {
    console.error('Firebase test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Run test if this file is imported directly
if (typeof window !== 'undefined') {
  window.testFirebase = testFirebaseConnection;
}