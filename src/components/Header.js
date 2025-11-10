import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { logout, isAuthor } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>BlogTime</h1>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            {isAuthor() ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button onClick={logout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;