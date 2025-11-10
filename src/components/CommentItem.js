import { useState } from 'react';
import { commentService } from '../firebase/blogService';
import CommentForm from './CommentForm';
import './CommentItem.css';

const CommentItem = ({ comment, canEdit, onUpdated, onDeleted, getInitials }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdated = (commentId, updatedContent) => {
    setIsEditing(false);
    onUpdated(commentId, updatedContent);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    setLoading(true);
    try {
      await commentService.deleteComment(comment.id);
      onDeleted(comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    // Handle Firestore timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  if (isEditing) {
    return (
      <div className="comment-item editing">
        <CommentForm
          postId={comment.postId}
          user={{ id: comment.authorId, name: comment.authorName, role: 'author' }}
          initialContent={comment.content}
          isEditing={true}
          commentId={comment.id}
          onUpdated={handleUpdated}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className="comment-item">
      <div className="comment-avatar">
        <div className="user-avatar small">
          <span className="user-initials">{getInitials(comment.authorName)}</span>
        </div>
      </div>
      
      <div className="comment-content">
        <div className="comment-header">
          <div className="comment-author">
            <span className="author-name">{comment.authorName}</span>
            <span className="comment-date">{formatDate(comment.createdAt)}</span>
            {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
              <span className="comment-edited">(edited)</span>
            )}
          </div>
          
          {canEdit && (
            <div className="comment-actions">
              <button
                onClick={handleEdit}
                className="comment-action-btn"
                disabled={loading}
                title="Edit comment"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="comment-action-btn delete"
                disabled={loading}
                title="Delete comment"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          )}
        </div>
        
        <div className="comment-text">
          {comment.content}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;