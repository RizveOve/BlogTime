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
const COMMENTS_COLLECTION = 'comments';
const REACTIONS_COLLECTION = 'reactions';

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
  },

  // Update user
  async updateUser(id, userData) {
    try {
      const docRef = doc(db, USERS_COLLECTION, id);
      const updateData = {
        ...userData,
        updatedAt: serverTimestamp()
      };
      await updateDoc(docRef, updateData);
      return {
        id,
        ...userData
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

// Comments Service
export const commentService = {
  // Get comments for a specific post
  async getCommentsByPost(postId) {
    try {
      // Ensure postId is treated as string for consistency
      const normalizedPostId = postId.toString();
      console.log('Fetching comments for postId:', normalizedPostId, 'Type:', typeof normalizedPostId);
      
      const commentsRef = collection(db, COMMENTS_COLLECTION);
      
      // First try with orderBy, if it fails due to index, fallback to simple query
      try {
        const q = query(
          commentsRef,
          where('postId', '==', normalizedPostId),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const comments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Found comments with orderBy:', comments.length, comments);
        return comments;
      } catch (indexError) {
        console.warn('Index not available, falling back to simple query:', indexError.message);
        
        // Fallback: Simple query without orderBy, then sort in memory
        const simpleQuery = query(commentsRef, where('postId', '==', normalizedPostId));
        const snapshot = await getDocs(simpleQuery);
        const comments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort in memory by createdAt (newest first)
        comments.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          const aTime = a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const bTime = b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          return bTime - aTime;
        });
        
        console.log('Found comments with fallback:', comments.length, comments);
        return comments;
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Add a new comment
  async addComment(commentData, user, postId) {
    try {
      // Ensure postId is stored as string for consistency
      const normalizedPostId = postId.toString();
      console.log('Adding comment for postId:', normalizedPostId, 'Type:', typeof normalizedPostId);
      
      const newComment = {
        content: commentData.content,
        postId: normalizedPostId,
        authorId: user.id,
        authorName: user.name,
        authorEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      console.log('Comment data to be saved:', newComment);
      const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), newComment);
      return {
        id: docRef.id,
        ...newComment
      };
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  // Update a comment
  async updateComment(commentId, content) {
    try {
      const docRef = doc(db, COMMENTS_COLLECTION, commentId);
      const updateData = {
        content: content,
        updatedAt: serverTimestamp()
      };
      await updateDoc(docRef, updateData);
      return { id: commentId, content };
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },

  // Delete a comment
  async deleteComment(commentId) {
    try {
      const docRef = doc(db, COMMENTS_COLLECTION, commentId);
      await deleteDoc(docRef);
      return commentId;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },

  // Get comment count for a post
  async getCommentCount(postId) {
    try {
      // Ensure postId is treated as string for consistency
      const normalizedPostId = postId.toString();
      console.log('Getting comment count for postId:', normalizedPostId, 'Type:', typeof normalizedPostId);
      
      const commentsRef = collection(db, COMMENTS_COLLECTION);
      const q = query(commentsRef, where('postId', '==', normalizedPostId));
      const snapshot = await getDocs(q);
      console.log('Comment count result:', snapshot.size);
      return snapshot.size;
    } catch (error) {
      console.error('Error getting comment count:', error);
      return 0;
    }
  }
};

// Reactions Service (Likes/Dislikes)
export const reactionService = {
  // Get reactions for a specific post
  async getReactionsByPost(postId) {
    try {
      const normalizedPostId = postId.toString();
      const reactionsRef = collection(db, REACTIONS_COLLECTION);
      const q = query(reactionsRef, where('postId', '==', normalizedPostId));
      const snapshot = await getDocs(q);
      
      const reactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Separate likes and dislikes
      const likes = reactions.filter(r => r.type === 'like');
      const dislikes = reactions.filter(r => r.type === 'dislike');

      return {
        likes,
        dislikes,
        likeCount: likes.length,
        dislikeCount: dislikes.length
      };
    } catch (error) {
      console.error('Error fetching reactions:', error);
      return { likes: [], dislikes: [], likeCount: 0, dislikeCount: 0 };
    }
  },

  // Add or update a reaction
  async addReaction(postId, userId, userName, userEmail, type) {
    try {
      const normalizedPostId = postId.toString();
      
      // First, check if user already has a reaction for this post
      const reactionsRef = collection(db, REACTIONS_COLLECTION);
      const existingQuery = query(
        reactionsRef, 
        where('postId', '==', normalizedPostId),
        where('userId', '==', userId)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        // Update existing reaction
        const existingDoc = existingSnapshot.docs[0];
        const existingReaction = existingDoc.data();
        
        if (existingReaction.type === type) {
          // Same reaction - remove it (toggle off)
          await deleteDoc(doc(db, REACTIONS_COLLECTION, existingDoc.id));
          return { action: 'removed', type };
        } else {
          // Different reaction - update it
          await updateDoc(doc(db, REACTIONS_COLLECTION, existingDoc.id), {
            type: type,
            updatedAt: serverTimestamp()
          });
          return { action: 'updated', type, previousType: existingReaction.type };
        }
      } else {
        // Create new reaction
        const newReaction = {
          postId: normalizedPostId,
          userId: userId,
          userName: userName,
          userEmail: userEmail,
          type: type, // 'like' or 'dislike'
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        await addDoc(reactionsRef, newReaction);
        return { action: 'added', type };
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
      throw error;
    }
  },

  // Get user's reaction for a specific post
  async getUserReaction(postId, userId) {
    try {
      const normalizedPostId = postId.toString();
      const reactionsRef = collection(db, REACTIONS_COLLECTION);
      const q = query(
        reactionsRef,
        where('postId', '==', normalizedPostId),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const reaction = snapshot.docs[0].data();
        return reaction.type; // 'like' or 'dislike'
      }
      
      return null; // No reaction
    } catch (error) {
      console.error('Error getting user reaction:', error);
      return null;
    }
  },

  // Remove a reaction
  async removeReaction(postId, userId) {
    try {
      const normalizedPostId = postId.toString();
      const reactionsRef = collection(db, REACTIONS_COLLECTION);
      const q = query(
        reactionsRef,
        where('postId', '==', normalizedPostId),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const docToDelete = snapshot.docs[0];
        await deleteDoc(doc(db, REACTIONS_COLLECTION, docToDelete.id));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error removing reaction:', error);
      throw error;
    }
  }
};