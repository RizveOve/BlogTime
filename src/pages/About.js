import './About.css';

const About = () => {
  return (
    <div className="container">
      <div className="about-page">
        <header className="about-header">
          <h1>About Me</h1>
          <div className="about-image">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQGC4ugrLZjEEA/profile-displayphoto-scale_400_400/B4DZlSh9F5JQAg-/0/1758026257463?e=1764201600&v=beta&t=QotknPNoS8Sh4Uugz8zxQkdzfOAc2B4lSM85ebMAH4g" alt="Profile" />
          </div>
        </header>
        
        <div className="about-content">
          <section>
            <h2>Hello, I'm a Developer</h2>
            <p>
              Welcome to my blog! I'm passionate about web development, modern JavaScript, 
              and creating amazing user experiences. This blog is where I share my thoughts, 
              tutorials, and insights about the ever-evolving world of technology.
            </p>
          </section>
          
          <section>
            <h2>What I Write About</h2>
            <ul>
              <li>React and modern JavaScript frameworks</li>
              <li>Web development best practices</li>
              <li>CSS and responsive design</li>
              <li>Performance optimization</li>
              <li>Developer tools and workflows</li>
            </ul>
          </section>
          
          <section>
            <h2>Get In Touch</h2>
            <p>
              I love connecting with fellow developers and tech enthusiasts. 
              Feel free to reach out if you have questions, suggestions, or just want to chat!
            </p>
            <div className="contact-links">
              <a href="mailto:hello@example.com" className="btn">Email Me</a>
              <a href="#" className="btn">Follow on Twitter</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;