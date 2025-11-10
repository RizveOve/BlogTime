import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <div className="login-form">
          <h1>Author Login</h1>
          <p>Sign in to manage your blog posts</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="author@blog.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            
            <button type="submit" className="btn login-btn">
              Sign In
            </button>
          </form>
          
          <div className="auth-links">
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>

          <div className="demo-credentials">
            <h3>Demo Credentials:</h3>
            <p>Master: master@blog.com / master123</p>
            <p>Or create your own account above</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;