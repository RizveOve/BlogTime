import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from './config';

const POSTS_COLLECTION = 'blogPosts';
const USERS_COLLECTION = 'users';

// Blog Posts Service
export const blogService = {
  // Get all posts
  async getAllPosts() {
    try {
      const postsRef = collection(db, POSTS_COLLECTION);
      const q = query(postsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Get published posts only
  async getPublishedPosts() {
    try {
      const postsRef = collection(db, POSTS_COLLECTION);
      const q = query(
        postsRef, 
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching published posts:', error);
      throw error;
    }
  },

  // Get pending posts
  async getPendingPosts() {
    try {
      const postsRef = collection(db, POSTS_COLLECTION);
      const q = query(
        postsRef, 
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching pending posts:', error);
      throw error;
    }
  },

  // Get posts by user
  async getUserPosts(userId) {
    try {
      const postsRef = collection(db, POSTS_COLLECTION);
      const q = query(
        postsRef, 
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  },

  // Get single post
  async getPost(id) {
    try {
      const docRef = doc(db, POSTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Add new post
  async addPost(postData, user) {
    try {
      console.log('Adding post with user:', user);
      console.log('Post data:', postData);
      
      const newPost = {
        title: postData.title || '',
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        image: postData.image || '',
        author: postData.author || user.name,
        date: new Date().toISOString().split('T')[0],
        authorId: user.id || 'unknown',
        status: user.role === 'master' ? 'published' : 'pending',
        createdBy: user.name || 'Unknown Author',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      console.log('Attempting to add post to Firestore:', newPost);
      const docRef = await addDoc(collection(db, POSTS_COLLECTION), newPost);
      console.log('Post added successfully with ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...newPost
      };
    } catch (error) {
      console.error('Error adding post:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  },

  // Update post
  async updatePost(id, updatedData) {
    try {
      const docRef = doc(db, POSTS_COLLECTION, id);
      const updateData = {
        ...updatedData,
        updatedAt: serverTimestamp()
      };
      await updateDoc(docRef, updateData);
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  // Delete post
  async deletePost(id) {
    try {
      const docRef = doc(db, POSTS_COLLECTION, id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // Approve post
  async approvePost(id) {
    try {
      const docRef = doc(db, POSTS_COLLECTION, id);
      await updateDoc(docRef, {
        status: 'published',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error approving post:', error);
      throw error;
    }
  },

  // Reject post
  async rejectPost(id) {
    try {
      const docRef = doc(db, POSTS_COLLECTION, id);
      await updateDoc(docRef, {
        status: 'rejected',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error rejecting post:', error);
      throw error;
    }
  }
};

// Users Service
export const userService = {
  // Get all users
  async getAllUsers() {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const snapshot = await getDocs(usersRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Add new user
  async addUser(userData) {
    try {
      const docRef = await addDoc(collection(db, USERS_COLLECTION), {
        ...userData,
        createdAt: serverTimestamp()
      });
      return {
        id: docRef.id,
        ...userData
      };
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  // Get user by email
  async getUserByEmail(email) {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(usersRef, where('email', '==', email));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data()
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }
};