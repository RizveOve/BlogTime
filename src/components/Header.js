import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import SignInButton from './SignInButton';
import UserDropdown from './UserDropdown';

const Header = () => {
  const { isAuthor } = useAuth();

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
              <UserDropdown />
            ) : (
              <SignInButton />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;