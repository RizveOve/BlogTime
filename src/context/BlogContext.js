import { createContext, useContext, useEffect, useState } from 'react';
import { blogPosts as initialPosts } from '../data/blogPosts';

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

  useEffect(() => {
    // Load posts from localStorage or use initial posts
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      const loadedPosts = JSON.parse(savedPosts);
      setPosts(loadedPosts);
    } else {
      // Add status and authorId to initial posts
      const postsWithStatus = initialPosts.map(post => ({
        ...post,
        status: 'published',
        authorId: 1,
        createdBy: post.author
      }));
      setPosts(postsWithStatus);
      localStorage.setItem('blogPosts', JSON.stringify(postsWithStatus));
    }
  }, []);

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
  };

  const addPost = (post, user) => {
    const newPost = {
      ...post,
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      date: new Date().toISOString().split('T')[0],
      authorId: user.id,
      status: user.role === 'master' ? 'published' : 'pending',
      createdBy: user.name
    };
    const newPosts = [newPost, ...posts];
    savePosts(newPosts);
    return newPost;
  };

  const updatePost = (id, updatedPost) => {
    const newPosts = posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    );
    savePosts(newPosts);
  };

  const deletePost = (id) => {
    const newPosts = posts.filter(post => post.id !== id);
    savePosts(newPosts);
  };

  const getPost = (id) => {
    return posts.find(post => post.id === parseInt(id));
  };

  const approvePost = (id) => {
    const newPosts = posts.map(post => 
      post.id === id ? { ...post, status: 'published' } : post
    );
    savePosts(newPosts);
  };

  const rejectPost = (id) => {
    const newPosts = posts.map(post => 
      post.id === id ? { ...post, status: 'rejected' } : post
    );
    savePosts(newPosts);
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
    addPost,
    updatePost,
    deletePost,
    getPost,
    approvePost,
    rejectPost,
    getPublishedPosts,
    getPendingPosts,
    getUserPosts
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};