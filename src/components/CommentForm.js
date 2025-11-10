import { useState } from 'react';
import { commentService } from '../firebase/blogService';
import './CommentForm.css';

const CommentForm = ({ postId, user, onCommentAdded, onCancel, initialContent = '', isEditing = false, commentId = null, onUpdated = null }) => {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    if (content.trim().length < 3) {
      setError('Comment must be at least 3 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isEditing && commentId) {
        await commentService.updateComment(commentId, content.trim());
        onUpdated(commentId, content.trim());
      } else {
        const newComment = await commentService.addComment(
          { content: content.trim() },
          user,
          postId
        );
        onCommentAdded(newComment);
      }
      
      setContent('');
    } catch (error) {
      console.error('Error saving comment:', error);
      setError('Failed to save comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="comment-form">
      <div className="comment-form-header">
        <div className="user-avatar small">
          <span className="user-initials">{getInitials(user.name)}</span>
        </div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-role">{user.role === 'master' ? 'Master' : 'Author'}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="comment-form-content">
        {error && (
          <div className="comment-error">
            {error}
          </div>
        )}
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          rows="4"
          maxLength="1000"
          disabled={loading}
          className="comment-textarea"
        />
        
        <div className="comment-form-footer">
          <div className="character-count">
            {content.length}/1000
          </div>
          
          <div className="comment-form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !content.trim()}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update' : 'Post Comment')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;