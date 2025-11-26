/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/Button/Button.component';
import { Badge } from '../../components/Badge/Badge.component';
import { Card } from '../../components/Card/Card.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal/Modal.Component';
import iconCopy from '../../assets/images/icons8-copy-24.png';
import {
  faEnvelope,
  faLink,
  faCaretUp,
  faArrowUpRightFromSquare,
  faHeart as faHeartSolid,
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
  EmailShareButton,
} from 'react-share';
import appImage from '../../assets/images/app-placeholder.svg';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { apiURL } from '../../apiURL';
import './AppView.styles.css';
import { useUserContext } from '../../userContext';

const searches = [
  { id: 1, title: 'ai tool' },
  { id: 2, title: 'avatar creator' },
  {
    id: 3,
    title: 'ai music',
  },
];

const alternativeApps = [
  {
    id: 1,
    title: '10web',
    description:
      'Create a website using AI Website Builder,\nhost it on 10Web Hosting, and optimize it with\nPageSpeed Booster.',
    rating: null,
    topic_id: 6,
    url: 'https://10web.io',
    pricing_type: 'Paid with free trial',
    url_x: 'https://twitter.com/10Web_io',
    url_discord: null,
    url_app_store: null,
    url_google_play_store: null,
    url_chrome_extension: null,
    url_small_screenshot: 'Free',
    url_large_screenshot: null,
    user_id: null,
    created_at: '2023-10-13T08:43:58.072Z',
    topicTitle: 'Website builders',
    category_id: 4,
    categoryTitle: 'Engineering & Development',
  },
  {
    id: 2,
    title: 'TLDV',
    description:
      'Short for "too long; didn\'t view."\n\nThis AI platform saves you time by taking meeting notes for you.\n\nSit back and relax as tl;dv transcribes and summarizes your calls automatically.',
    rating: null,
    topic_id: 17,
    url: 'https://tldv.io',
    pricing_type: 'Paid with free plan',
    url_x: 'https://twitter.com/tldview?lang=en',
    url_discord: null,
    url_app_store: null,
    url_google_play_store: null,
    url_chrome_extension:
      'https://chrome.google.com/webstore/detail/record-transcribe-chatgpt/lknmjhcajhfbbglglccadlfdjbaiifig',
    url_small_screenshot: 'Paid with a free plan',
    url_large_screenshot: null,
    user_id: null,
    created_at: '2023-10-13T08:43:58.083Z',
    topicTitle: 'Meetings',
    category_id: 1,
    categoryTitle: 'Work & Productivity',
  },
  {
    id: 3,
    title: 'Klap',
    description:
      'Turn videos into viral shorts\nGet ready-to-publish TikToks, Reels, Shorts from YouTube videos in a click',
    rating: null,
    topic_id: 7,
    url: 'https://klap.app',
    pricing_type: 'Paid',
    url_x: 'https://twitter.com/tldview?lang=en',
    url_discord: null,
    url_app_store: null,
    url_google_play_store: null,
    url_chrome_extension: null,
    url_small_screenshot: 'Paid with a free trial',
    url_large_screenshot: null,
    user_id: null,
    created_at: '2023-10-13T08:43:58.088Z',
    topicTitle: 'Video',
    category_id: 2,
    categoryTitle: 'Marketing & Sales',
  },
];
export const AppView = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [app, setApp] = useState({});
  const [similarApps, setSimilarApps] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUserContext();
  const [validForm, setValidForm] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [allRatings, setAllRatings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  useEffect(() => {
    async function fetchSingleApp(appId) {
      const response = await fetch(`${apiURL()}/apps/${appId}`);
      const appResponse = await response.json();
      setApp(appResponse[0]);
    }

    fetchSingleApp(id);
  }, [id]);

  useEffect(() => {
    async function fetchSimilarApps() {
      const response = await fetch(
        `${apiURL()}/apps?page=0&column=id&direction=desc&filteredTopics=${
          app.topic_id
        }`,
      );
      const appsResponse = await response.json();
      const similarAppsArray = appsResponse.data.filter(
        (item) => item.id !== app.id,
      );
      setSimilarApps(similarAppsArray);
    }

    fetchSimilarApps();
  }, [app.topic_id, app.id]);

  const fetchCommentsByAppId = useCallback(async (appId) => {
    const response = await fetch(`${apiURL()}/comments?appId=${appId}`);
    const commentResponse = await response.json();
    setComments(commentResponse);
  }, []);

  useEffect(() => {
    fetchCommentsByAppId(id);
  }, [fetchCommentsByAppId, id]);

  const navigateBack = () => {
    navigate(-1);
  };

  const addComment = async (commentContent) => {
    const response = await fetch(`${apiURL()}/comments`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: commentContent,
        app_id: id,
      }),
    });
    if (response.ok) {
      fetchCommentsByAppId(id);
    }
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
  const getOnlyYearMonthDay = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const cardItems = similarApps.map((item) => {
    // const relatedTopics = topics
    //   .filter((topic) => topic.categoryId === category.id)
    //   .map((item) => item.id);
    return (
      <Card
        id={item.id}
        title={item.title}
        description={item.description}
        url={item.url}
        urlImage={item.url_image}
        topic={item.topicTitle}
        pricingType={item.pricing_type}
        smallCard
      />
    );
  });

  const fetchFavorites = useCallback(async () => {
    const url = `${apiURL()}/favorites`;
    const response = await fetch(url, {
      headers: {
        token: `token ${user?.uid}`,
      },
    });
    const favoritesData = await response.json();

    if (Array.isArray(favoritesData)) {
      setFavorites(favoritesData);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (appId) => {
    const response = await fetch(`${apiURL()}/favorites`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: appId,
      }),
    });
    if (response.ok) {
      fetchFavorites();
    }
  };

  const handleDeleteBookmarks = (favoritesId) => {
    const deleteFavorites = async () => {
      const response = await fetch(`${apiURL()}/favorites/${favoritesId} `, {
        method: 'DELETE',
        headers: {
          token: `token ${user?.uid}`,
        },
      });

      if (response.ok) {
        fetchFavorites();
      }
    };

    deleteFavorites();
  };

  const toggleModal = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };

  const fetchAllRatings = useCallback(async () => {
    const url = `${apiURL()}/ratings`;
    const response = await fetch(url);
    const ratingsData = await response.json();
    setAllRatings(ratingsData);
  }, []);

  useEffect(() => {
    fetchAllRatings();
  }, [fetchAllRatings]);

  const fetchRatings = useCallback(async () => {
    const url = `${apiURL()}/ratings`;
    const response = await fetch(url, {
      headers: {
        token: `token ${user?.uid}`,
      },
    });
    const ratingsData = await response.json();

    if (Array.isArray(ratingsData)) {
      setRatings(ratingsData);
    } else {
      setRatings([]);
    }
  }, [user]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const addRating = async (appId) => {
    const response = await fetch(`${apiURL()}/ratings`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: appId,
      }),
    });
    if (response.ok) {
      fetchRatings();
      fetchAllRatings();
    }
  };

  const deleteRating = async (appId) => {
    const response = await fetch(`${apiURL()}/ratings/${appId}`, {
      method: 'DELETE',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      fetchRatings();
      fetchAllRatings();
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${String(app.title).substring(0, 50)} - AI Apps`}</title>
        <meta
          name="description"
          content={`Top AI Apps for ${app.topicTitle} and ${app.categoryTitle}`}
        />
      </Helmet>
      <main>
        <section className="container-appview">
          <h1 className="hero-header">{app.title}</h1>
          <img
            className="appview-image"
            alt={`${app.title} screenshot`}
            src={`http://res.cloudinary.com/dgarvanzw/image/upload/q_auto,f_auto/apps_ai/${app.url_image}.png`}
          />

          <div className="container-bookmark">
            <Link to={app.url} target="_blank">
              <Button
                primary
                icon={
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
                }
                label={`Visit ${app.title}'s website`}
              />
            </Link>
            <div>
              {user && favorites.some((x) => x.id === app.id) ? (
                <button
                  type="button"
                  onClick={() => handleDeleteBookmarks(app.id)}
                  onKeyDown={() => handleDeleteBookmarks(app.id)}
                  className="button-bookmark"
                >
                  Remove from saved{' '}
                  <FontAwesomeIcon icon={faHeartSolid} size="lg" />
                </button>
              ) : user ? (
                <button
                  type="button"
                  onClick={() => addFavorite(app.id)}
                  onKeyDown={() => addFavorite(app.id)}
                  className="button-bookmark"
                >
                  Save <FontAwesomeIcon icon={faHeart} size="lg" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(true);
                    setModalTitle('Sign up to add bookmarks');
                  }}
                  onKeyDown={() => addFavorite(app.id)}
                  className="button-bookmark"
                >
                  Save <FontAwesomeIcon icon={faHeart} size="lg" />
                </button>
              )}
            </div>
          </div>
          <div className="container-description">
            <div className="container-title">
              <h3>What is {app.title}?</h3>
              <div className="container-rating">
                Rating
                {user && ratings.some((rating) => rating.id === app.id) ? (
                  <button
                    type="button"
                    className="button-rating"
                    onClick={(event) => deleteRating(app.id)}
                  >
                    <FontAwesomeIcon icon={faCaretUp} />
                    {
                      allRatings.filter((rating) => rating.app_id === app.id)
                        .length
                    }
                  </button>
                ) : user ? (
                  <button
                    type="button"
                    className="button-rating"
                    onClick={(event) => addRating(app.id)}
                  >
                    <FontAwesomeIcon icon={faCaretUp} />
                    {
                      allRatings.filter((rating) => rating.app_id === app.id)
                        .length
                    }
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button-rating"
                    onClick={() => {
                      setOpenModal(true);
                      setModalTitle('Sign up to vote');
                    }}
                  >
                    <FontAwesomeIcon icon={faCaretUp} />
                    {
                      allRatings.filter((rating) => rating.app_id === app.id)
                        .length
                    }
                  </button>
                )}
                {/* <button type="button" className="button-rating">
                  <FontAwesomeIcon icon={faCaretUp} />
                  10
                </button> */}
              </div>
            </div>
            <p>{app.description}</p>
          </div>
          <div className="container-details">
            <div className="container-tags">
              <div className="badges">
                <p>Pricing: </p>{' '}
                <div>
                  <Badge label={app.pricing_type} size="small" />
                </div>
              </div>
              <p>Edit app</p>
            </div>
            <div className="container-tags">
              <div className="badges">
                <p>Tagged: </p>
                <div>
                  <Badge secondary label={app.topicTitle} size="small" />
                </div>
              </div>
              <div className="badges">
                <p>Category: </p>
                <div>
                  <Badge secondary label={app.categoryTitle} size="small" />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="container-related-searches">
            <h3>Related searches</h3>
            <div className="topics-div searches">
              {searches.map((search) => (
                <Link to={`/apps/search/${search.id}`} target="_blank">
                  <Button secondary label={search.title} />
                </Link>
              ))}
            </div>
          </div> */}
          <div className="icons-apps-page">
            <span>Share it: </span>
            <button
              type="button"
              className="button-copy"
              onClick={() => {
                navigator.clipboard.writeText(app.title);
              }}
            >
              <img src={iconCopy} alt="copy" className="icon-copy" />
            </button>
            <FontAwesomeIcon
              icon={faLink}
              className="button-copy"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.Apphunt.me/Apps/${app.id}`,
                );
              }}
            />
            <FacebookShareButton url={`/Apps/${app.id}`}>
              <FontAwesomeIcon className="share-icon" icon={faFacebookF} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://www.Apphunt.me/Apps/${app.id}`}
              title={`Check out this GPT App: '${app.title}'`}
              hashtags={['Apps']}
            >
              <FontAwesomeIcon className="share-icon" icon={faTwitter} />
            </TwitterShareButton>
            <LinkedinShareButton url={`https://www.Apphunt.me/Apps/${app.id}`}>
              <FontAwesomeIcon className="share-icon" icon={faLinkedinIn} />
            </LinkedinShareButton>
            <EmailShareButton
              subject="Check out this GPT App!"
              body={`This GPT App is great: '${app.title}'`}
              url={`https://www.Apphunt.me/Apps/${app.id}`}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </EmailShareButton>
          </div>
          <div className="container-comments">
            {comments.length === 0 && (
              <div>
                <i>No comments for this App. </i>
                {user && <i>Add first one below.</i>}
              </div>
            )}
            {comments.length > 0 &&
              comments.map((item) => (
                <div className="form-container">
                  <div className="comment-box submit-box">
                    <div>{item.content}</div>
                    <div className="comment-author-date">{`by ${
                      item.full_name
                    } on ${getOnlyYearMonthDay(item.created_at)}`}</div>
                  </div>
                </div>
              ))}
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
                  to add comments
                </i>
              </div>
            )}
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
                    {invalidForm && (
                      <p className="error-message">{commentError}</p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="container-details cta">
            <div>
              <h2>🔥 Create a free account</h2>
              <p>Bookmark you favorite AI apps</p>
            </div>
            <div>
              <Link to="/signup">
                <Button primary label="Create my account 👌" />
              </Link>
            </div>
          </div>
          {similarApps.length > 0 && (
            <div className="container-alternatives">
              <h3>🔎 Similar to {app.title}</h3>
              <div className="container-cards small-cards">{cardItems}</div>
            </div>
          )}
        </section>
        <Modal title={modalTitle} open={openModal} toggle={toggleModal}>
          <Link to="/signup">
            <Button primary label="Create an account" />
          </Link>
          or
          <Link to="/login">
            <Button secondary label="Log in" />
          </Link>
        </Modal>
      </main>
    </>
  );
};
