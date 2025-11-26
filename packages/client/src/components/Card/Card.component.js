/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.component';
import { Badge } from '../Badge/Badge.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import appImage from '../../assets/images/app-placeholder.svg';
// import appImage from '../../../public/assets/images/small-screenshot.png';
import { useUserContext } from '../../userContext';
import iconCopy from '../../assets/images/icons8-copy-24.png';

import './Card.styles.css';

export const Card = ({
  title,
  description,
  referralCode,
  referralCodeOnClick,
  topic,
  topicId,
  appId,
  appTitle,
  url,
  cardUrl,
  urlImage,
  urlImageIcon,
  id,
  className,
  smallCard = true,
  listCard = false,
  isFavorite,
  addFavorite,
  deleteBookmark,
  bookmarkOnClick,
}) => {
  const { user } = useUserContext();
  if (smallCard) {
    return (
      <Link
        to={cardUrl}
        className="card-category--small card-image--small"
        style={{
          backgroundImage: `url(http://res.cloudinary.com/dgarvanzw/image/upload/w_500,q_auto,f_auto/deals/${urlImage}.${
            urlImage === 'deal' ? 'svg' : 'png'
          } )`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="card-header">
          <Link to={cardUrl} target="_blank">
            <h2>{title}</h2>
          </Link>
        </div>
        <div className="topics-bookmark--small">
          <Badge tertiary label={topic} size="small" />
          {appTitle && <Badge primary label={appTitle} size="small" />}
        </div>
      </Link>
    );
  }

  return (
    <div className={listCard ? 'card-list' : 'card-category'}>
      <Link
        to={cardUrl}
        target="_blank"
        className={`card-image ${listCard ? 'list' : ''}`}
      >
        <img
          className={`${listCard ? 'img-app-icon-list' : 'img-app-icon'} ${
            urlImageIcon ? 'icon-shadow' : ''
          }`}
          alt="test"
          src={urlImage}
        />
      </Link>

      <div className={`card-body ${listCard ? 'list' : ''}`}>
        <div className="card-header">
          <div className="card-title">
            <Link to={cardUrl} target="_blank">
              <h2>{title}</h2>
            </Link>
            <Link to={cardUrl} target="_blank">
              <FontAwesomeIcon
                className="icon-card"
                icon={faArrowUpRightFromSquare}
                style={{ color: '#e5989b' }}
                size="lg"
              />
            </Link>
          </div>
          {referralCode !== null ? (
            <div className="button-referral-code">
              <Button
                size="small"
                secondary
                icon={
                  <img
                    src={iconCopy}
                    alt="copy"
                    className="icon-copy copy-referral-code smaller-icon"
                  />
                }
                label={referralCode}
                onClick={referralCodeOnClick}
              />
            </div>
          ) : (
            ''
          )}
          {/* <Badge label={appTitle} size="small" /> */}
        </div>
        {description && (
          <div className="card-description">
            {`${description
              .split(' ')
              .slice(
                0,
                `${referralCode !== null ? (title.length > 21 ? 8 : 15) : 17}`,
              )
              .join(' ')}...`}
          </div>
        )}
        <div className="topics-bookmark">
          <div className="container-topic-app">
            <Link target="_blank" to={`/deals/app/${appId}`}>
              <Button secondary label={appTitle} size="small" />
            </Link>
            <Link target="_blank" to={`/deals/topic/${topicId}`}>
              <Button secondary label={topic} size="small" />
            </Link>
          </div>

          {user && isFavorite ? (
            <button
              type="button"
              onClick={deleteBookmark}
              onKeyDown={deleteBookmark}
              className="button-bookmark"
            >
              <FontAwesomeIcon icon={faHeartSolid} size="lg" />
            </button>
          ) : user ? (
            <button
              type="button"
              onClick={addFavorite}
              onKeyDown={addFavorite}
              className="button-bookmark"
            >
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </button>
          ) : (
            <button
              type="button"
              onClick={bookmarkOnClick}
              onKeyDown={addFavorite}
              className="button-bookmark"
            >
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="card-list">
  //       <Link
  //         to={`/apps/${id}`}
  //         target="_blank"
  //         className="card-image list"
  //         style={{
  //           backgroundImage: `url(/assets/images/finalscout-sm.png)`,
  //           backgroundRepeat: 'no-repeat',
  //           backgroundSize: 'cover',
  //         }}
  //       />
  //       <div className="card-body list">
  //         <div className="card-header">
  //           <div className="card-title">
  //             <Link to={`/apps/${id}`} target="_blank">
  //               <h2>{title}</h2>
  //             </Link>
  //             <Link to={`/apps/${id}`} target="_blank">
  //               <FontAwesomeIcon
  //                 className="icon-card"
  //                 icon={faArrowUpRightFromSquare}
  //                 style={{ color: '#e5989b' }}
  //                 size="lg"
  //               />
  //             </Link>
  //           </div>
  //           <Badge label={pricingType} size="small" />
  //         </div>
  //         <div className="card-description">
  //           {`${description.split(' ').slice(0, 35).join(' ')}...`}
  //         </div>
  //         <div className="topics-bookmark">
  //           <Link to={`/apps/topic/${topicId}`}>
  //             <Button label={topic} size="small" />
  //           </Link>
  //           <FontAwesomeIcon icon={faHeart} size="lg" />
  //         </div>
  //       </div>
  //     </div>
  //   );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  referralCode: PropTypes.string,
  referralCodeOnClick: PropTypes.func,
  topic: PropTypes.string,
  topicId: PropTypes.string,
  appTitle: PropTypes.string,
  appId: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.shape,
  cardUrl: PropTypes.shape,
  urlImage: PropTypes.string,
  smallCard: PropTypes.bool,
  listCard: PropTypes.bool,
  urlImageIcon: PropTypes.bool,
  className: PropTypes.string,
  isFavorite: PropTypes.func,
  addFavorite: PropTypes.func,
  deleteBookmark: PropTypes.func,
  bookmarkOnClick: PropTypes.func,
};

Card.defaultProps = {
  title: null,
  description: null,
  referralCode: null,
  appTitle: null,
  appId: null,
  topicId: null,
  topic: null,
  url: null,
  cardUrl: null,
  urlImage: null,
  id: null,
  smallCard: false,
  listCard: false,
  urlImageIcon: false,
  className: null,
  isFavorite: undefined,
  addFavorite: undefined,
  deleteBookmark: undefined,
  bookmarkOnClick: undefined,
  referralCodeOnClick: undefined,
};
