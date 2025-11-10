import { useEffect, useState } from 'react';
import { commentService } from '../firebase/blogService';
import './CommentCount.css';

const CommentCount = ({ postId }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommentCount = async () => {
      try {
        const commentCount = await commentService.getCommentCount(postId);
        setCount(commentCount);
      } catch (error) {
        console.error('Error loading comment count:', error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadCommentCount();
  }, [postId]);

  if (loading) {
    return (
      <span className="comment-count loading">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        ...
      </span>
    );
  }

  return (
    <span className="comment-count">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
      </svg>
      {count} {count === 1 ? 'comment' : 'comments'}
    </span>
  );
};

export default CommentCount;