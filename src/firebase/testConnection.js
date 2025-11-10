import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './config';

// Simple test to verify Firebase connection and permissions
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test 1: Try to read from a collection
    console.log('Test 1: Reading from blogPosts collection...');
    const postsRef = collection(db, 'blogPosts');
    const snapshot = await getDocs(postsRef);
    console.log('✅ Read test passed. Found', snapshot.size, 'documents');
    
    // Test 2: Try to write a test document
    console.log('Test 2: Writing test document...');
    const testDoc = {
      title: 'Test Post',
      content: 'This is a test',
      createdAt: new Date(),
      test: true
    };
    
    const docRef = await addDoc(collection(db, 'test'), testDoc);
    console.log('✅ Write test passed. Document ID:', docRef.id);
    
    return {
      success: true,
      message: 'Firebase connection successful',
      documentsFound: snapshot.size
    };
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// Test function you can run in browser console
if (typeof window !== 'undefined') {
  window.testFirebase = testFirebaseConnection;
}