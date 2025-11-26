import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.component';
import Modal from '../Modal/Modal.Component';

import './Comments.styles.css';
import { useComments } from '../../utils/hooks/useComments';

export const Comments = ({ id, user, fieldName }) => {
  const {
    comments,
    comment,
    commentError,
    invalidForm,
    validForm,
    openConfirmationModal,
    commentHandler,
    handleSubmit,
    setOpenConfirmationModal,
    formatDate,
  } = useComments(id, user, fieldName);

  return (
    <aside className="container-comments">
      {/* No comments */}
      {comments.length === 0 && (
        <div>
          <i>No comments yet.</i>
          {user && <i> Add the first one below.</i>}
        </div>
      )}

      {/* Comment list */}
      {comments.length > 0 &&
        comments.map((item) => (
          <div className="form-container" key={item.id || item.created_at}>
            <div className="comment-box submit-box">
              <div>{item.content}</div>
              <div className="comment-author-date">
                {`by ${item.full_name ?? 'Unknown'} on ${formatDate(
                  item.created_at,
                )}`}
              </div>
            </div>
          </div>
        ))}

      {/* If user is not logged in */}
      {!user && (
        <div>
          <i>
            <br />
            <Link to="/signup" className="simple-link">
              Sign up
            </Link>{' '}
            or{' '}
            <Link to="/login" className="simple-link">
              log in
            </Link>{' '}
            to add comments.
          </i>
        </div>
      )}

      {/* Comment form */}
      {user && (
        <div className="form-container">
          <div className="comment-box submit-box">
            <form onSubmit={handleSubmit}>
              <textarea
                className="form-input"
                value={comment}
                placeholder="Your comment"
                onChange={commentHandler}
              />

              <Button
                primary
                className="btn-add-prompt"
                type="submit"
                label="Add comment"
              />

              {validForm && (
                <Modal
                  title="Your comment has been submitted!"
                  open={openConfirmationModal}
                  toggle={() => setOpenConfirmationModal(false)}
                />
              )}

              {invalidForm && <p className="error-message">{commentError}</p>}
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};

Comments.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  user: PropTypes.shape,
  fieldName: PropTypes.string.isRequired,
};

Comments.defaultProps = {
  user: null,
};
