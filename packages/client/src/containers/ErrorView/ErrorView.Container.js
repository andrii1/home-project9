/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './ErrorView.Style.css';
import { Button } from '../../components/Button/Button.component';
import { Comments } from '../../components/Comments/Comments.component';
import { Badge } from '../../components/Badge/Badge.component';
import { Card } from '../../components/Card/Card.component';
import { FavoritesBar } from '../../components/FavoritesBar/FavoritesBar.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line import/no-extraneous-dependencies
import Markdown from 'markdown-to-jsx';
import logo from '../../assets/images/logo.png';

import { getDateFromTimestamp } from '../../utils/getDateFromTimestamp';
import { getEstimatedReadTime } from '../../utils/getEstimatedReadTime';

import {
  faEnvelope,
  faLink,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';
import {
  PinterestShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookShareCount,
  PinterestShareCount,
} from 'react-share';

import { apiURL } from '../../apiURL';
import { useUserContext } from '../../userContext';
import { LoadingContainer } from '../LoadingContainer/LoadingContainer.Container';
import { ErrorContainer } from '../ErrorContainer/ErrorContainer.Container';

const cleanBrand = (str) => {
  return (
    str
      .toLowerCase()
      // remove promo/invite/referral + code(s)
      .replace(/\b(invite|promo|referral)\s*codes?\b/g, '')
      // remove standalone code/codes
      .replace(/\bcodes?\b/g, '')
      .trim()
      .replace(/\s+/g, ' ')
  );
};

export const ErrorView = () => {
  const { user } = useUserContext();
  const { slugParam } = useParams();
  const [errorItem, setErrorItem] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [similarErrorItems, setSimilarErrorItems] = useState([]);
  const [recentErrorItems, setRecentErrorItems] = useState([]);
  const [relatedDeals, setRelatedDeals] = useState([]);

  useEffect(() => {
    async function fetchSingleErrorItem(errorItemSlug) {
      setLoading(true);
      try {
        const response = await fetch(`${apiURL()}/errors/${errorItemSlug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch');
        }
        setErrorItem(data[0]);
        setError(null);
      } catch (e) {
        setError({ message: e.message || 'Failed to fetch data.' });
      }
      setLoading(false);
    }

    fetchSingleErrorItem(slugParam);
  }, [slugParam]);

  useEffect(() => {
    async function fetchErrorItems() {
      setLoading(true);
      try {
        const url = `${apiURL()}/errors?page=0&column=id&direction=desc`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch');
        }
        setRecentErrorItems(data.data.slice(0, 3));
        setError(null);
      } catch (e) {
        setError({ message: e.message || 'Failed to fetch data.' });
      }
      setLoading(false);
    }

    fetchErrorItems();
  }, []);

  // useEffect(() => {
  //   async function fetchRelatedDeals() {
  //     setLoading(true);
  //     try {
  //       const url = `${apiURL()}/deals?page=0&column=id&direction=desc&search=${encodeURIComponent(
  //         cleanBrand(errorItem.title),
  //       )}`;

  //       const response = await fetch(url);
  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error(data.message || 'Failed to fetch');
  //       }
  //       setRelatedDeals(data.data);
  //       setError(null);
  //     } catch (e) {
  //       setError({ message: e.message || 'Failed to fetch data.' });
  //     }
  //     setLoading(false);
  //   }

  //   fetchRelatedDeals();
  // }, [errorItem.title]);

  const readTime = getEstimatedReadTime(errorItem?.content);

  const cardItems = recentErrorItems?.map((item) => (
    <Link to={`../errorItem/${item.slug}`} className="card-errorItem">
      <h2>{item.title}</h2>
      <div className="blog-preview">{`${item.summary}`}</div>
      <div className="date">{getDateFromTimestamp(item.created_at)}</div>
    </Link>
  ));

  // const cardItemsDeals = relatedDeals?.map((item) => (
  //   <Link to={`../deals/${item.id}`} className="card-errorItem card-deal">
  //     <h3>{item.title}</h3>
  //   </Link>
  // ));

  if (loading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <ErrorContainer error={error} />;
  }

  return (
    <>
      <Helmet>
        <title>{errorItem.title}</title>
        <meta
          name="description"
          content={errorItem.summary || 'The Buzr blog'}
        />
      </Helmet>
      <div className="container-single-blog">
        <main>
          <article>
            <header>
              <h1>{errorItem.title}</h1>
              <p className="read-time">{readTime} min read</p>
              <FavoritesBar itemId={errorItem.id} />
            </header>

            {/* {relatedDeals.length > 0 && (
              <div className="container-alternatives">
                <h3>👉 Related deals & codes</h3>
                <div className="container-cards small-cards">
                  {cardItemsDeals}
                </div>
              </div>
            )} */}
            {/* {hasImagesContainer ? (
              <Markdown
                options={{
                  overrides: {
                    img: {
                      props: {
                        className: 'image-single-errorItem',
                      },
                    },
                    a: {
                      props: {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      },
                    },
                    FavoritesBar: {
                      component: FavoritesBar,
                    },
                  },
                }}
              >
                {errorItem.content}
              </Markdown>
            ) : (
              <Markdown>{errorItem.content}</Markdown>
            )} */}

            <Markdown>{errorItem.content}</Markdown>

            {/* <div className="images-errorItem-container">
              <div>
                <Link to={`../quotes/3`} target="_blank">
                  <img
                    src="https://motivately1.s3.amazonaws.com/quotes/04f4f32d-f27b-4bf8-bd2a-5eb162385899.png"
                    alt="text"
                    className="image-single-errorItem"
                  />
                </Link>
                <FavoritesBar quoteId={3} />
                <p>
                  "You just gotta keep going and fighting for everything, and
                  one day you'll get to where you want. - Naomi Osaka"
                </p>
              </div>
              <div>
                <Link to={`../quotes/3`} target="_blank">
                  <img
                    src="https://motivately1.s3.amazonaws.com/quotes/04f4f32d-f27b-4bf8-bd2a-5eb162385899.png"
                    alt="text"
                    className="image-single-errorItem"
                  />
                </Link>
                <p>
                  "You just gotta keep going and fighting for everything, and
                  one day you'll get to where you want. - Naomi Osaka"
                </p>
              </div>
            </div> */}
            <footer>
              <p className="published">
                Published{' '}
                <time dateTime={errorItem?.created_at}>
                  {getDateFromTimestamp(errorItem?.created_at)}
                </time>{' '}
                by <strong>{errorItem?.userFullName?.split(' ')[0]}</strong>
              </p>
              <div className="icons-apps-page">
                <span>Share it: </span>
                <FontAwesomeIcon
                  icon={faLink}
                  className="button-copy"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://www.errorcatalog.com/errors/${errorItem.slug}`,
                    );
                  }}
                />
                <PinterestShareButton
                  media={logo}
                  description={errorItem.meta_description || ''}
                >
                  <FontAwesomeIcon className="share-icon" icon={faPinterest} />
                </PinterestShareButton>
                <FacebookShareButton
                  url={`https://www.errorcatalog.com/errors/${errorItem.slug}`}
                >
                  <FontAwesomeIcon className="share-icon" icon={faFacebookF} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`https://www.errorcatalog.com/errors/${errorItem.slug}`}
                  title={`'${errorItem.title}'`}
                  hashtags={['error', 'bug']}
                >
                  <FontAwesomeIcon className="share-icon" icon={faTwitter} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={`https://www.errorcatalog.com/errors/${errorItem.slug}`}
                >
                  <FontAwesomeIcon className="share-icon" icon={faLinkedinIn} />
                </LinkedinShareButton>
                <EmailShareButton
                  subject="Check out this error..."
                  body={`It is so inspirational: '${errorItem.title}'`}
                  url={`https://www.errorcatalog.com/errors/${errorItem.slug}`}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </EmailShareButton>
              </div>
              <div>
                <FacebookShareCount
                  url={`https://www.errorcatalog.com/errors/${errorItem.slug}`}
                >
                  {(shareCount) => (
                    <span className="myShareCountWrapper">{shareCount}</span>
                  )}
                </FacebookShareCount>
                <PinterestShareCount
                  url={`https://www.errorcatalog.com/errors/${errorItem.slug}`}
                >
                  {(shareCount) =>
                    shareCount > 0 && (
                      <span className="myShareCountWrapper">{shareCount}</span>
                    )
                  }
                </PinterestShareCount>
              </div>
            </footer>
          </article>
        </main>
        <Comments id={errorItem.id} user={user} fieldName="errorItem" />
        {recentErrorItems.length > 0 && (
          <aside className="container-alternatives">
            <h3>⏳ Recent errors</h3>
            <div className="container-cards small-cards">{cardItems}</div>
          </aside>
        )}
      </div>
    </>
  );
};
