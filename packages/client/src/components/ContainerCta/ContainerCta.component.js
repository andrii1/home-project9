import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ContainerCta.styles.css';
import { Button } from '../Button/Button.component';

export const ContainerCta = ({ user }) => {
  return (
    <div className="container-details cta">
      <div>
        <h2>
          🔥 {!user && 'Create a free account'}
          {user && 'Upgrade'}
        </h2>
        <p>
          {!user && 'Add your referral codes, bookmark favorite deals'}
          {user && 'Share more than 5 referral codes'}
        </p>
      </div>
      <div>
        <Link target="_blank" to={user ? '#' : '/signup'}>
          <Button
            primary
            label={user ? 'Upgrade 👌' : 'Create my account 👌'}
          />
        </Link>
      </div>
    </div>
  );
};

ContainerCta.propTypes = {
  user: PropTypes.bool,
};

ContainerCta.defaultProps = {
  user: false,
};
