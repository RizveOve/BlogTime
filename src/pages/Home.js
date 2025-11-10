import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const Home = () => {
  const { getPublishedPosts } = useBlog();
  const posts = getPublishedPosts();

  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to My Blog</h1>
        <p>Discover insights about web development, programming, and technology</p>
      </section>
      
      <section className="blog-posts">
        <h2>Latest Posts</h2>
        <div className="blog-grid">
          {posts.map(post => (
            <article key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} />
              <div className="blog-card-content">
                <div className="blog-meta">
                  By {post.author} • {post.date}
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link to={`/post/${post.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;