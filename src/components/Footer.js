import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2024 BlogTime. All rights reserved.</p>
          <div className="social-links">
            <a
              href="https://x.com/Rizve_Ove"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Twitter
            </a>
            <a
              href="https://github.com/RizveOve"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mrizvehasan/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
