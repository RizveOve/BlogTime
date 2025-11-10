import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isMaster, canEditPost, loading } = useAuth();
  const { posts, deletePost, getUserPosts, getPendingPosts, approvePost, rejectPost } = useBlog();
  
  // Add safety checks
  if (loading) {
    return <div className="container">Loading...</div>;
  }
  
  if (!user) {
    return <div className="container">No user found. Please log in.</div>;
  }
  
  const userPosts = isMaster() ? posts : getUserPosts(user.id);
  const pendingPosts = getPendingPosts();
  


  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePost(id);
      } catch (error) {
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      await approvePost(id);
    } catch (error) {
      alert('Failed to approve post. Please try again.');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectPost(id);
    } catch (error) {
      alert('Failed to reject post. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Welcome back, {user.name}!</h1>
          <Link to="/edit" className="btn">
            Create New Post
          </Link>
        </header>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{userPosts?.length || 0}</h3>
            <p>{isMaster() ? 'Total Posts' : 'My Posts'}</p>
          </div>
          <div className="stat-card">
            <h3>{userPosts?.filter(p => p.status === 'published').length || 0}</h3>
            <p>Published</p>
          </div>
          {isMaster() && (
            <div className="stat-card">
              <h3>{pendingPosts?.length || 0}</h3>
              <p>Pending Approval</p>
            </div>
          )}
        </div>

        {isMaster() && pendingPosts && pendingPosts.length > 0 && (
          <section className="posts-management">
            <h2>Pending Approval</h2>
            <div className="posts-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Author</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPosts.map(post => (
                    <tr key={post.id}>
                      <td>
                        <span className="post-title-link">{post.title}</span>
                      </td>
                      <td>{post.date}</td>
                      <td>{post.createdBy}</td>
                      <td className="actions">
                        <button 
                          onClick={() => handleApprove(post.id)}
                          className="btn btn-small btn-success"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(post.id)}
                          className="btn btn-small btn-warning"
                        >
                          Reject
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id, post.title)}
                          className="btn btn-small btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="posts-management">
          <h2>{isMaster() ? 'All Posts' : 'My Posts'}</h2>
          <div className="posts-table">
            {!userPosts || userPosts.length === 0 ? (
              <p>No posts yet. <Link to="/edit">Create your first post!</Link></p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userPosts.map(post => (
                    <tr key={post.id}>
                      <td>
                        {post.status === 'published' ? (
                          <Link to={`/post/${post.id}`} className="post-title-link">
                            {post.title}
                          </Link>
                        ) : (
                          <span className="post-title-link">{post.title}</span>
                        )}
                      </td>
                      <td>{post.date}</td>
                      <td>{post.createdBy}</td>
                      <td>
                        <span className={`status-badge status-${post.status}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="actions">
                        {canEditPost(post) && (
                          <Link to={`/edit/${post.id}`} className="btn btn-small">
                            Edit
                          </Link>
                        )}
                        {canEditPost(post) && (
                          <button 
                            onClick={() => handleDelete(post.id, post.title)}
                            className="btn btn-small btn-danger"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;