import { useEffect, useState } from 'react';
import { reactionService } from '../firebase/blogService';
import './ReactionCount.css';

const ReactionCount = ({ postId }) => {
  const [reactions, setReactions] = useState({
    likeCount: 0,
    dislikeCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReactionCount = async () => {
      try {
        const postReactions = await reactionService.getReactionsByPost(postId);
        setReactions({
          likeCount: postReactions.likeCount,
          dislikeCount: postReactions.dislikeCount
        });
      } catch (error) {
        console.error('Error loading reaction count:', error);
        setReactions({ likeCount: 0, dislikeCount: 0 });
      } finally {
        setLoading(false);
      }
    };

    loadReactionCount();
  }, [postId]);

  if (loading) {
    return (
      <div className="reaction-count loading">
        <span className="reaction-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3m0 0V9a2 2 0 0 1 2-2h2l3 11v-7.5a2 2 0 0 1 2-2 2 2 0 0 1 2 2c0 .085-.002.17-.007.253l-.022.746-.07 2.4L23.51 21a2 2 0 0 1-2 2H7.5z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          ...
        </span>
      </div>
    );
  }

  const totalReactions = reactions.likeCount + reactions.dislikeCount;

  if (totalReactions === 0) {
    return (
      <div className="reaction-count">
        <span className="reaction-item no-reactions">
          No reactions yet
        </span>
      </div>
    );
  }

  return (
    <div className="reaction-count">
      {reactions.likeCount > 0 && (
        <span className="reaction-item likes">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3m0 0V9a2 2 0 0 1 2-2h2l3 11v-7.5a2 2 0 0 1 2-2 2 2 0 0 1 2 2c0 .085-.002.17-.007.253l-.022.746-.07 2.4L23.51 21a2 2 0 0 1-2 2H7.5z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {reactions.likeCount}
        </span>
      )}
      
      {reactions.dislikeCount > 0 && (
        <span className="reaction-item dislikes">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M17 2H20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3m0 0v4a2 2 0 0 1-2 2h-2l-3-11v7.5a2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-.085.002-.17.007-.253l.022-.746.07-2.4L.49 3a2 2 0 0 1 2-2H9.5z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {reactions.dislikeCount}
        </span>
      )}
    </div>
  );
};

export default ReactionCount;