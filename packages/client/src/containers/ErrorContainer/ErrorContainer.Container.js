import React from 'react';
import { Helmet } from 'react-helmet';
import './ErrorContainer.Style.css';
import PropTypes from 'prop-types';

export const ErrorContainer = ({ error }) => {
  return (
    <>
      <Helmet>
        <title>Error</title>
        <meta name="description" content="Something went wrong" />
      </Helmet>
      <main className="error-container">
        <h2>{error.message || 'Something went wrong'}</h2>
      </main>
    </>
  );
};

ErrorContainer.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.instanceOf(Error),
    PropTypes.oneOf([null]),
  ]),
};
ErrorContainer.defaultProps = { error: null };
