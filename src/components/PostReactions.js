import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { reactionService } from '../firebase/blogService';
import './PostReactions.css';
import ReactionModal from './ReactionModal';

const PostReactions = ({ postId }) => {
  const { user } = useAuth();
  const [reactions, setReactions] = useState({
    likes: [],
    dislikes: [],
    likeCount: 0,
    dislikeCount: 0
  });
  const [userReaction, setUserReaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(null); // 'likes' or 'dislikes'

  useEffect(() => {
    loadReactions();
    if (user) {
      loadUserReaction();
    }
  }, [postId, user]);

  const loadReactions = async () => {
    try {
      const postReactions = await reactionService.getReactionsByPost(postId);
      setReactions(postReactions);
    } catch (error) {
      console.error('Error loading reactions:', error);
    }
  };

  const loadUserReaction = async () => {
    try {
      const reaction = await reactionService.getUserReaction(postId, user.id);
      setUserReaction(reaction);
    } catch (error) {
      console.error('Error loading user reaction:', error);
    }
  };

  const handleReaction = async (type) => {
    if (!user) {
      // Redirect to login or show sign-in prompt
      return;
    }

    setLoading(true);
    try {
      const result = await reactionService.addReaction(
        postId,
        user.id,
        user.name,
        user.email,
        type
      );

      // Update local state based on the result
      if (result.action === 'removed') {
        setUserReaction(null);
      } else {
        setUserReaction(type);
      }

      // Reload reactions to get updated counts
      await loadReactions();
    } catch (error) {
      console.error('Error handling reaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type) => {
    setShowModal(type);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <div className="post-reactions">
      <div className="reaction-buttons">
        <button
          className={`reaction-btn like-btn ${userReaction === 'like' ? 'active' : ''}`}
          onClick={() => handleReaction('like')}
          disabled={loading || !user}
          title={user ? 'Like this post' : 'Sign in to like'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3m0 0V9a2 2 0 0 1 2-2h2l3 11v-7.5a2 2 0 0 1 2-2 2 2 0 0 1 2 2c0 .085-.002.17-.007.253l-.022.746-.07 2.4L23.51 21a2 2 0 0 1-2 2H7.5z" 
              stroke="currentColor" 
              strokeWidth="2"
              fill={userReaction === 'like' ? 'currentColor' : 'none'}
            />
          </svg>
          <span className="reaction-count">{reactions.likeCount}</span>
        </button>

        <button
          className={`reaction-btn dislike-btn ${userReaction === 'dislike' ? 'active' : ''}`}
          onClick={() => handleReaction('dislike')}
          disabled={loading || !user}
          title={user ? 'Dislike this post' : 'Sign in to dislike'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M17 2H20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3m0 0v4a2 2 0 0 1-2 2h-2l-3-11v7.5a2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-.085.002-.17.007-.253l.022-.746.07-2.4L.49 3a2 2 0 0 1 2-2H9.5z" 
              stroke="currentColor" 
              strokeWidth="2"
              fill={userReaction === 'dislike' ? 'currentColor' : 'none'}
            />
          </svg>
          <span className="reaction-count">{reactions.dislikeCount}</span>
        </button>
      </div>

      {(reactions.likeCount > 0 || reactions.dislikeCount > 0) && (
        <div className="reaction-summary">
          {reactions.likeCount > 0 && (
            <button 
              className="reaction-summary-btn"
              onClick={() => openModal('likes')}
            >
              <span className="reaction-icon">👍</span>
              <span className="reaction-text">
                {reactions.likeCount} {reactions.likeCount === 1 ? 'person likes' : 'people like'} this
              </span>
            </button>
          )}
          
          {reactions.dislikeCount > 0 && (
            <button 
              className="reaction-summary-btn"
              onClick={() => openModal('dislikes')}
            >
              <span className="reaction-icon">👎</span>
              <span className="reaction-text">
                {reactions.dislikeCount} {reactions.dislikeCount === 1 ? 'person dislikes' : 'people dislike'} this
              </span>
            </button>
          )}
        </div>
      )}

      {!user && (reactions.likeCount > 0 || reactions.dislikeCount > 0) && (
        <div className="auth-prompt-reactions">
          <p>
            <a href="/login">Sign in</a> to like or dislike this post
          </p>
        </div>
      )}

      {showModal && (
        <ReactionModal
          type={showModal}
          reactions={showModal === 'likes' ? reactions.likes : reactions.dislikes}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PostReactions;