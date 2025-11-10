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

    let existingMaster = await userService.getUserByEmail(masterUser.email);
    if (!existingMaster) {
      existingMaster = await userService.addUser(masterUser);
      console.log('Master user created:', existingMaster.id);
    } else {
      console.log('Master user already exists:', existingMaster.id);
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
        date: post.date,
        status: 'published',
        authorId: existingMaster.id,
        createdBy: post.author
      };

      try {
        const newPost = await blogService.addPost(postData, existingMaster);
        migratedPosts.push(newPost);
        console.log(`Migrated post: ${post.title}`);
      } catch (error) {
        console.error(`Error migrating post "${post.title}":`, error);
      }
    }

    console.log(`Migration completed! Migrated ${migratedPosts.length} posts.`);
    return {
      success: true,
      migratedPosts: migratedPosts.length,
      masterUser: existingMaster
    };

  } catch (error) {
    console.error('Migration failed:', error);
    return {
      success: false,
      error: error.message
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