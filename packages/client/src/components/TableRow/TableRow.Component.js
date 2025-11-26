import React from 'react';
import PropTypes from 'prop-types';
import './TableRow.Style.css';
import iconCopy from '../../assets/images/icons8-copy-24.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faArrowUpRightFromSquare,
  faBookmark as faBookmarkSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

/**
 * Primary UI component for user interaction
 */
export const TableRow = ({
  id,
  title,
  category,
  topic,
  deleteBookmark,
  ...props
}) => {
  return (
    <>
      <div className="col-1">{title}</div>
      <div className="col-2">
        <span className="prompt-additional-text">Category:&nbsp;</span>
        {category}
      </div>
      <div className="col-3">
        <span className="prompt-additional-text">Topic:&nbsp;</span>
        {topic}
      </div>
      <div className="col-7">
        <div className="icons-prompts">
          <button
            type="button"
            className="button-copy"
            onClick={() => {
              navigator.clipboard.writeText(title);
            }}
          >
            <img src={iconCopy} alt="copy" className="icon-copy" />
          </button>
          <Link to={`../prompts/${id.toString()}`} params={{ id }}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="lg" />
          </Link>
          <FacebookShareButton
            url={`https://www.prompt-library.net/prompts/${id}`}
          >
            <FontAwesomeIcon
              className="share-icon"
              icon={faFacebookF}
              size="lg"
            />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://www.prompt-library.net/prompts/${id}`}
            title={`Check out this GPT prompt: '${title}'`}
            hashtags={['prompts']}
          >
            <FontAwesomeIcon
              className="share-icon"
              icon={faTwitter}
              size="lg"
            />
          </TwitterShareButton>
          <LinkedinShareButton
            url={`https://www.prompt-library.net/prompts/${id}`}
          >
            <FontAwesomeIcon
              className="share-icon"
              icon={faLinkedinIn}
              size="lg"
            />
          </LinkedinShareButton>
          <Link className="remove-bookmark" onClick={deleteBookmark}>
            <FontAwesomeIcon icon={faTrash} size="lg" className="trash-icon" />
          </Link>
        </div>
      </div>
    </>
  );
};

TableRow.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  topic: PropTypes.string,
  deleteBookmark: PropTypes.func,
};

TableRow.defaultProps = {
  id: null,
  title: null,
  category: null,
  topic: null,
  deleteBookmark: undefined,
};
