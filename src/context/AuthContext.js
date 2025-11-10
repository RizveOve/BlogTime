import { createContext, useContext, useEffect, useState } from 'react';
import { userService } from '../firebase/blogService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      // Check if email already exists
      const existingUser = await userService.getUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'Email already exists' };
      }

      const newUser = {
        ...userData,
        role: 'author'
      };

      const createdUser = await userService.addUser(newUser);
      return { success: true, user: createdUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const login = async (email, password) => {
    try {
      const foundUser = await userService.getUserByEmail(email);
      
      if (foundUser && foundUser.password === password) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role
        };
        setUser(userData);
        localStorage.setItem('blogUser', JSON.stringify(userData));
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blogUser');
  };

  const isAuthor = () => {
    return user && (user.role === 'author' || user.role === 'master');
  };

  const isMaster = () => {
    return user && user.role === 'master';
  };

  const canEditPost = (post) => {
    if (!user) return false;
    if (user.role === 'master') return true;
    return post.authorId === user.id;
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthor,
    isMaster,
    canEditPost,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};