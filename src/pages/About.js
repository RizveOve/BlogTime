import "./About.css";

const About = () => {
  return (
    <div className="container">
      <div className="about-page">
        <header className="about-header">
          <h1>About BlogTime</h1>
        </header>

        <div className="about-content">
          <section>
            <h2>Welcome to BlogTime</h2>
            <p>
              BlogTime is a modern, interactive blogging platform designed to
              foster meaningful conversations and knowledge sharing in the tech
              community. Built with cutting-edge technologies like React and
              Firebase, our platform offers a seamless experience for both
              readers and content creators.
            </p>
            <p>
              Whether you're a seasoned developer, a curious beginner, or
              someone passionate about technology, BlogTime provides the perfect
              space to discover insights, share experiences, and connect with
              like-minded individuals from around the world.
            </p>
          </section>

          <section>
            <h2>What Makes BlogTime Special</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>🚀 Modern Technology</h3>
                <p>
                  Built with React, Firebase, and modern web standards for
                  optimal performance and user experience.
                </p>
              </div>
              <div className="feature-item">
                <h3>💬 Interactive Community</h3>
                <p>
                  Engage with content through comments, likes, and meaningful
                  discussions with fellow readers.
                </p>
              </div>
              <div className="feature-item">
                <h3>📱 Responsive Design</h3>
                <p>
                  Enjoy a seamless reading experience across all devices -
                  desktop, tablet, and mobile.
                </p>
              </div>
              <div className="feature-item">
                <h3>✍️ Author-Friendly</h3>
                <p>
                  Intuitive content management system with real-time editing and
                  publishing capabilities.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2>Our Content Focus</h2>
            <p>
              At BlogTime, we cover a wide range of topics that matter to the
              modern developer and tech enthusiast:
            </p>
            <ul>
              <li>
                <strong>Web Development:</strong> React, JavaScript, CSS, and
                modern frameworks
              </li>
              <li>
                <strong>Best Practices:</strong> Code quality, testing, and
                development workflows
              </li>
              <li>
                <strong>Technology Trends:</strong> Emerging technologies and
                industry insights
              </li>
              <li>
                <strong>Career Growth:</strong> Professional development and
                learning resources
              </li>
              <li>
                <strong>Open Source:</strong> Contributing to and building open
                source projects
              </li>
              <li>
                <strong>Performance:</strong> Optimization techniques and
                scalability solutions
              </li>
            </ul>
          </section>

          <section>
            <h2>Join Our Community</h2>
            <p>
              BlogTime is more than just a blog - it's a community of passionate
              developers, designers, and technology enthusiasts. We believe in
              the power of shared knowledge and collaborative learning.
            </p>
            <p>
              <strong>For Readers:</strong> Discover high-quality content,
              engage in discussions, and stay updated with the latest in
              technology.
            </p>
            <p>
              <strong>For Authors:</strong> Share your expertise, build your
              personal brand, and contribute to the developer community with our
              easy-to-use publishing platform.
            </p>
          </section>

          <section>
            <h2>Connect With Us</h2>
            <p>
              Have questions, suggestions, or want to contribute? We'd love to
              hear from you! Connect with us through any of the following
              channels:
            </p>
            <div className="contact-links">
              <a
                href="https://x.com/Rizve_Ove"
                target="_blank"
                rel="noopener noreferrer"
                className="btn contact-btn twitter"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow on Twitter
              </a>
              <a
                href="https://github.com/RizveOve"
                target="_blank"
                rel="noopener noreferrer"
                className="btn contact-btn github"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mrizvehasan/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn contact-btn linkedin"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
              <button
                className="btn contact-btn email"
                onClick={(e) => {
                  e.preventDefault();
                  
                  const email = "thisisrizve@gmail.com";
                  
                  // Try Gmail first (most reliable for web users)
                  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
                  const gmailWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");
                  
                  // If Gmail window didn't open (popup blocked), show options
                  if (!gmailWindow || gmailWindow.closed) {
                    const userChoice = window.confirm(
                      `Click OK to try opening your default email client, or Cancel to copy the email address to clipboard.\n\nEmail: ${email}`
                    );
                    
                    if (userChoice) {
                      // User chose to try default email client
                      window.location.href = `mailto:${email}`;
                    } else {
                      // User chose to copy to clipboard
                      navigator.clipboard.writeText(email).then(() => {
                        alert(`Email address copied to clipboard: ${email}`);
                      }).catch(() => {
                        alert(`Please email me at: ${email}`);
                      });
                    }
                  }
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Send Email
              </button>
            </div>
          </section>

          <section>
            <h2>About the Creator</h2>
            <p>
              BlogTime was created by <strong>Rizve Hasan</strong>, a passionate
              full-stack developer with expertise in modern web technologies.
              With a focus on creating user-centric applications and fostering
              developer communities, Rizve brings years of experience in React,
              JavaScript, and cloud technologies to this platform.
            </p>
            <p>
              The vision behind BlogTime is to create a space where knowledge
              flows freely, where both beginners and experts can learn from each
              other, and where the developer community can thrive through
              meaningful interactions and shared experiences.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
