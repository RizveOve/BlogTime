import { Link } from "react-router-dom";
import CommentCount from "../components/CommentCount";
import ReactionCount from "../components/ReactionCount";
import { useBlog } from "../context/BlogContext";

const Home = () => {
  const { getPublishedPosts, loading, error } = useBlog();
  const posts = getPublishedPosts();

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error loading posts: {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to BlogTime</h1>
        <p>
          Discover insights about web development, programming, and technology
        </p>
      </section>

      <section className="blog-posts">
        <h2>Latest Posts</h2>
        <div className="blog-grid">
          {posts.length === 0 ? (
            <p>No posts available yet.</p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="blog-card">
                <img src={post.image} alt={post.title} />
                <div className="blog-card-content">
                  <div className="blog-meta">
                    By {post.author} • {post.date}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-card-stats">
                      <CommentCount postId={post.id} />
                      <ReactionCount postId={post.id} />
                    </div>
                    <Link to={`/post/${post.id}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
