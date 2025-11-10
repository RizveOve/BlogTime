import { Link } from 'react-router-dom';
import './SignInButton.css';

const SignInButton = () => {
  return (
    <Link to="/login" className="signin-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2"/>
        <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2"/>
        <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
      </svg>
      Sign In
    </Link>
  );
};

export default SignInButton;