/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './ProfileImage.Style.css';

export const ProfileImage = ({ name, onClick }) => {
  const nameInitial = name[0] ? name[0] : '';

  return (
    <span className="user-profile-image" onClick={onClick}>
      {nameInitial}
    </span>
  );
};

ProfileImage.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};

ProfileImage.defaultProps = {
  name: null,
  onClick: undefined,
};
