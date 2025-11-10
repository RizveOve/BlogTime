import { createContext, useContext, useEffect, useState } from 'react';
import { blogService } from '../firebase/blogService';
import { checkMigrationStatus, migrateDataToFirebase } from '../firebase/migrationScript';
import { testFirebaseConnection } from '../firebase/testConnection';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializePosts();
  }, []);

  const initializePosts = async () => {
    try {
      setLoading(true);
      
      // First, test Firebase connection
      console.log('Testing Firebase connection...');
      const connectionTest = await testFirebaseConnection();
      
      if (!connectionTest.success) {
        throw new Error(`Firebase connection failed: ${connectionTest.error}`);
      }
      
      console.log('✅ Firebase connection successful');
      
      // Check if we have data in Firebase
      const hasMigratedData = await checkMigrationStatus();
      
      if (!hasMigratedData) {
        console.log('No data found in Firebase, running migration...');
        const migrationResult = await migrateDataToFirebase();
        console.log('Migration result:', migrationResult);
      }
      
      // Load posts from Firebase
      const firebasePosts = await blogService.getAllPosts();
      setPosts(firebasePosts);
      
    } catch (error) {
      console.error('Error initializing posts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = async () => {
    try {
      const firebasePosts = await blogService.getAllPosts();
      setPosts(firebasePosts);
    } catch (error) {
      console.error('Error refreshing posts:', error);
      setError(error.message);
    }
  };

  const addPost = async (post, user) => {
    try {
      const newPost = await blogService.addPost(post, user);
      await refreshPosts();
      return newPost;
    } catch (error) {
      console.error('Error adding post:', error);
      setError(error.message);
      throw error;
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      await blogService.updatePost(id, updatedPost);
      await refreshPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      setError(error.message);
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      await blogService.deletePost(id);
      await refreshPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      setError(error.message);
      throw error;
    }
  };

  const getPost = (id) => {
    return posts.find(post => post.id === id);
  };

  const approvePost = async (id) => {
    try {
      await blogService.approvePost(id);
      await refreshPosts();
    } catch (error) {
      console.error('Error approving post:', error);
      setError(error.message);
      throw error;
    }
  };

  const rejectPost = async (id) => {
    try {
      await blogService.rejectPost(id);
      await refreshPosts();
    } catch (error) {
      console.error('Error rejecting post:', error);
      setError(error.message);
      throw error;
    }
  };

  const getPublishedPosts = () => {
    return posts.filter(post => post.status === 'published');
  };

  const getPendingPosts = () => {
    return posts.filter(post => post.status === 'pending');
  };

  const getUserPosts = (userId) => {
    return posts.filter(post => post.authorId === userId);
  };

  const value = {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    getPost,
    approvePost,
    rejectPost,
    getPublishedPosts,
    getPendingPosts,
    getUserPosts,
    refreshPosts
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};