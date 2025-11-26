/* eslint-disable no-nested-ternary */
import * as React from 'react';
import './BasicMenu.Style.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useUserContext } from '../../userContext';

const IconButtonStyled = styled(IconButton)({
  margin: '0 0 0 -0.3rem',
  padding: '0.1rem 0.1rem',
});

export default function BasicMenu({
  promptId,
  promptTitle,
  isFavorite,
  addFavorite,
  deleteBookmark = { deleteBookmark },
  bookmarkOnClick,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useUserContext();

  return (
    <div>
      <IconButtonStyled
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButtonStyled>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          {user && isFavorite ? (
            <button
              type="button"
              onClick={deleteBookmark}
              onKeyDown={deleteBookmark}
              className="button-bookmark"
            >
              <FontAwesomeIcon className="share-icon" icon={faBookmarkSolid} />
              &nbsp; Remove from bookmarks
            </button>
          ) : user ? (
            <button
              type="button"
              onClick={addFavorite}
              onKeyDown={addFavorite}
              className="button-bookmark"
            >
              <FontAwesomeIcon className="share-icon" icon={faBookmark} />
              &nbsp; Add to bookmarks
            </button>
          ) : (
            <button
              type="button"
              onClick={bookmarkOnClick}
              onKeyDown={addFavorite}
              className="button-bookmark"
            >
              <FontAwesomeIcon className="share-icon" icon={faBookmark} />
              &nbsp; Add to bookmarks
            </button>
          )}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FacebookShareButton
            url={`https://www.prompthunt.me/prompts/${promptId}`}
          >
            <FontAwesomeIcon className="share-icon" icon={faFacebookF} /> Share
            on Facebook
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TwitterShareButton
            url={`https://www.prompthunt.me/prompts/${promptId}`}
            title="Check out this GPT prompt!"
            hashtags={['prompts']}
          >
            <FontAwesomeIcon className="share-icon" icon={faTwitter} /> Share on
            Twitter
          </TwitterShareButton>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <LinkedinShareButton
            url={`https://www.prompthunt.me/prompts/${promptId}`}
          >
            <FontAwesomeIcon className="share-icon" icon={faLinkedinIn} /> Share
            on LinkedIn
          </LinkedinShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
}

BasicMenu.propTypes = {
  promptId: PropTypes.string,
  promptTitle: PropTypes.string,
  isFavorite: PropTypes.func,
  addFavorite: PropTypes.func,
  deleteBookmark: PropTypes.func,
  bookmarkOnClick: PropTypes.func,
};

BasicMenu.defaultProps = {
  promptId: null,
  promptTitle: null,
  isFavorite: undefined,
  addFavorite: undefined,
  deleteBookmark: undefined,
  bookmarkOnClick: undefined,
};
