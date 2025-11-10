import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import PostReactions from "../components/PostReactions";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";
import "./BlogPost.css";

const BlogPost = () => {
  const { id } = useParams();
  const { getPost } = useBlog();
  const { canEditPost } = useAuth();
  const post = getPost(id);

  if (!post || post.status !== "published") {
    return (
      <div className="container">
        <h1>Post not found</h1>
        <Link to="/" className="btn">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <article className="blog-post">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <header className="post-header">
          <img src={post.image} alt={post.title} className="post-image" />
          <div className="post-meta">
            <span>By {post.author}</span>
            <span>{post.date}</span>
            {canEditPost(post) && (
              <Link to={`/edit/${post.id}`} className="edit-link">
                Edit Post
              </Link>
            )}
          </div>
          <h1>{post.title}</h1>
        </header>

        <div className="post-content">
          {post.content.split("\n").map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={index}>{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("```")) {
              return null; // Handle code blocks separately if needed
            }
            if (paragraph.trim() === "") {
              return <br key={index} />;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        <PostReactions postId={post.id} />
        <Comments postId={post.id} />
      </article>
    </div>
  );
};

export default BlogPost;
