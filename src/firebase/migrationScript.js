import { blogPosts } from '../data/blogPosts';
import { blogService, userService } from './blogService';

// Migration script to move existing data to Firebase
export const migrateDataToFirebase = async () => {
  try {
    console.log('Starting migration to Firebase...');

    // First, create the master user if it doesn't exist
    const masterUser = {
      email: 'master@blog.com',
      password: 'master123', // In production, this should be hashed
      name: 'Master Author',
      role: 'master'
    };

    let existingMaster;
    try {
      existingMaster = await userService.getUserByEmail(masterUser.email);
      if (!existingMaster) {
        console.log('Creating master user...');
        existingMaster = await userService.addUser(masterUser);
        console.log('Master user created:', existingMaster.id);
      } else {
        console.log('Master user already exists:', existingMaster.id);
      }
    } catch (error) {
      console.error('Error with master user:', error);
      // Create a fallback user object
      existingMaster = {
        id: 'master-fallback',
        email: 'master@blog.com',
        name: 'Master Author',
        role: 'master'
      };
    }

    // Migrate blog posts
    console.log('Migrating blog posts...');
    const migratedPosts = [];

    for (const post of blogPosts) {
      const postData = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        author: post.author,
        date: post.date
      };

      try {
        console.log(`Attempting to migrate: ${post.title}`);
        const newPost = await blogService.addPost(postData, existingMaster);
        migratedPosts.push(newPost);
        console.log(`✅ Migrated post: ${post.title}`);
      } catch (error) {
        console.error(`❌ Error migrating post "${post.title}":`, error);
        console.error('Error details:', error.code, error.message);
      }
    }

    console.log(`Migration completed! Migrated ${migratedPosts.length} out of ${blogPosts.length} posts.`);
    return {
      success: true,
      migratedPosts: migratedPosts.length,
      totalPosts: blogPosts.length,
      masterUser: existingMaster
    };

  } catch (error) {
    console.error('Migration failed:', error);
    console.error('Error details:', error.code, error.message);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// Function to check if migration is needed
export const checkMigrationStatus = async () => {
  try {
    const posts = await blogService.getAllPosts();
    return posts.length > 0;
  } catch (error) {
    console.error('Error checking migration status:', error);
    return false;
  }
};