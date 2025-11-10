import { createContext, useContext, useEffect, useState } from 'react';

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
    // Initialize users list to ensure master user exists
    getUsers();
    
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const getUsers = () => {
    const users = localStorage.getItem('blogUsers');
    if (users) {
      return JSON.parse(users);
    } else {
      // Initialize with master user
      const defaultUsers = [
        {
          id: 1,
          email: 'master@blog.com',
          password: 'master123',
          name: 'Master Author',
          role: 'master'
        }
      ];
      localStorage.setItem('blogUsers', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem('blogUsers', JSON.stringify(users));
  };

  const register = (userData) => {
    const users = getUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      ...userData,
      role: 'author'
    };

    users.push(newUser);
    saveUsers(users);
    
    return { success: true, user: newUser };
  };

  const login = (email, password) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
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