import { useCallback, useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';

export const useComments = (id, user, fieldName) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [invalidForm, setInvalidForm] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const fetchComments = useCallback(async () => {
    const response = await fetch(`${apiURL()}/comments?${fieldName}Id=${id}`);
    const data = await response.json();
    setComments(Array.isArray(data) ? data : []);
  }, [id, fieldName]);

  useEffect(() => {
    if (id) fetchComments();
  }, [fetchComments, id]);

  const addComment = async (content) => {
    const response = await fetch(`${apiURL()}/comments`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        [`${fieldName}_id`]: id,
      }),
    });

    if (response.ok) {
      fetchComments();
    }
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment) {
      setCommentError('Comment is required!');
      setInvalidForm(true);
      setValidForm(false);
      return;
    }

    if (comment.trim().length < 5) {
      setCommentError('Comment must be more than five characters!');
      setInvalidForm(true);
      setValidForm(false);
      return;
    }

    setInvalidForm(false);
    setValidForm(true);
    addComment(comment);
    setOpenConfirmationModal(true);
    setComment('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return {
    comments,
    comment,
    commentError,
    invalidForm,
    validForm,
    openConfirmationModal,

    // actions
    fetchComments,
    addComment,
    commentHandler,
    handleSubmit,
    setOpenConfirmationModal,

    // helpers
    formatDate,
  };
};
