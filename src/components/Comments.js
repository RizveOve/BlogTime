import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { commentService } from '../firebase/blogService';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import './Comments.css';

const Comments = ({ postId }) => {
  const { user, isAuthor } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedComments = await commentService.getCommentsByPost(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
      
      // Provide user-friendly error messages
      let errorMessage = 'Failed to load comments';
      if (error.message.includes('index')) {
        errorMessage = 'Comments are loading... Database is being set up.';
      } else if (error.message.includes('permission')) {
        errorMessage = 'Permission denied. Please check your login status.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    console.log('Comments component received postId:', postId, 'Type:', typeof postId);
    loadComments();
  }, [loadComments, postId]);

  const handleCommentAdded = (newComment) => {
    setComments(prev => [newComment, ...prev]);
    setShowCommentForm(false);
  };

  const handleCommentUpdated = (commentId, updatedContent) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
  };

  const handleCommentDeleted = (commentId) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const canEditComment = (comment) => {
    if (!user) return false;
    if (user.role === 'master') return true;
    return comment.authorId === user.id;
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="comments-section">
        <div className="comments-loading">Loading comments...</div>
      </div>
    );
  }

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>
          Comments ({comments.length})
        </h3>
        
        {user ? (
          <button 
            className="add-comment-btn"
            onClick={() => setShowCommentForm(!showCommentForm)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {showCommentForm ? 'Cancel' : 'Add Comment'}
          </button>
        ) : (
          <div className="auth-prompt">
            <Link to="/login" className="signin-prompt-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2"/>
                <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2"/>
                <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Sign in to comment
            </Link>
          </div>
        )}
      </div>

      {error && (
        <div className="comments-error">
          <div className="error-message">
            {error}
          </div>
          <button 
            onClick={loadComments} 
            className="retry-btn"
            disabled={loading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {loading ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      )}

      {showCommentForm && user && (
        <CommentForm
          postId={postId}
          user={user}
          onCommentAdded={handleCommentAdded}
          onCancel={() => setShowCommentForm(false)}
        />
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <p>No comments yet.</p>
            {user ? (
              <p>Be the first to share your thoughts!</p>
            ) : (
              <p>
                <Link to="/login">Sign in</Link> to start the conversation.
              </p>
            )}
          </div>
        ) : (
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              canEdit={canEditComment(comment)}
              onUpdated={handleCommentUpdated}
              onDeleted={handleCommentDeleted}
              getInitials={getInitials}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;