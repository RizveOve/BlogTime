import { useEffect } from 'react';
import './ReactionModal.css';

const ReactionModal = ({ type, reactions, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
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

  return (
    <div className="reaction-modal-backdrop" onClick={handleBackdropClick}>
      <div className="reaction-modal">
        <div className="reaction-modal-header">
          <h3>
            {type === 'likes' ? '👍 People who liked this' : '👎 People who disliked this'}
          </h3>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        <div className="reaction-modal-content">
          {reactions.length === 0 ? (
            <div className="no-reactions">
              <p>No {type} yet.</p>
            </div>
          ) : (
            <div className="reactions-list">
              {reactions.map((reaction) => (
                <div key={reaction.id} className="reaction-item">
                  <div className="reaction-avatar">
                    <span className="reaction-initials">
                      {getInitials(reaction.userName)}
                    </span>
                  </div>
                  <div className="reaction-info">
                    <div className="reaction-name">{reaction.userName}</div>
                    <div className="reaction-time">{formatDate(reaction.createdAt)}</div>
                  </div>
                  <div className="reaction-type-icon">
                    {type === 'likes' ? '👍' : '👎'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="reaction-modal-footer">
          <p>{reactions.length} {reactions.length === 1 ? 'person' : 'people'}</p>
        </div>
      </div>
    </div>
  );
};

export default ReactionModal;