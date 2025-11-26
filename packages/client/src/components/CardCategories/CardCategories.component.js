import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.component';

import './CardCategories.styles.css';

export const CardCategories = ({ title, url, topics }) => {
  return (
    <div className="card-category-new">
      <Link to={`/apps/category/${url}`}>
        <h2>{title}</h2>
      </Link>
      <div className="topics-div">
        {topics.map((topic) => (
          <Link to={`/apps/topic/${topic.id}`}>
            <Button secondary label={topic.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

CardCategories.propTypes = {
  title: PropTypes.string,
  url: PropTypes.shape,
  topics: PropTypes.shape,
};

CardCategories.defaultProps = {
  title: null,
  url: null,
  topics: null,
};
