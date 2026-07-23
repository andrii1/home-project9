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
import { getMostUsedWords } from '../../utils/getMostUsedWords';

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
  const [topicsFromErrors, setTopicsFromErrors] = useState([]);
  const [id, setId] = useState(null);
  const [tags, setTags] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

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
        setId(data[0].id);
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

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const results = [];
      const combinedText = `${errorItem?.title} ${errorItem?.summary} ${errorItem?.content}`;
      const words = getMostUsedWords(combinedText, 10);

      for (const [word] of words) {
        try {
          const res = await fetch(
            `${apiURL()}/errors?page=0&column=id&direction=desc&search=${encodeURIComponent(
              word,
            )}`,
          );
          const data = await res.json();
          if (data.data.length > 1) {
            const wordWithLink = {
              title: word,
              url: `errors/search/${word}`,
            };
            results.push(wordWithLink);
          }
        } catch (err) {
          return;
        }
      }

      setTopicsFromErrors(results);
      setLoading(false);
    }
    if (errorItem?.title) {
      fetchData();
    }
  }, [errorItem?.summary, errorItem?.content, errorItem?.title]);

  useEffect(() => {
    async function fetchTagsForError(errorId) {
      const response = await fetch(`${apiURL()}/tags/?error=${errorId}`);
      const data = await response.json();
      setTags(data);
    }

    async function fetchHighlightsForError(errorId) {
      const response = await fetch(`${apiURL()}/highlights/?error=${errorId}`);
      const data = await response.json();
      setHighlights(data);
    }

    async function fetchUserTypesForError(errorId) {
      const response = await fetch(`${apiURL()}/userTypes/?error=${errorId}`);
      const data = await response.json();
      setUserTypes(data);
    }

    // async function fetchCodesForADeal(dealId) {
    //   const response = await fetch(`${apiURL()}/codes/?deal=${dealId}`);
    //   const productResponse = await response.json();
    //   setDealCodes(productResponse);
    // }

    // async function fetchSearchesForADeal(dealId) {
    //   const response = await fetch(`${apiURL()}/searches/?deal=${dealId}`);
    //   const productResponse = await response.json();
    //   setSearches(productResponse);
    // }

    // async function fetchKeywordsForADeal(dealId) {
    //   const response = await fetch(`${apiURL()}/keywords/?deal=${dealId}`);
    //   const productResponse = await response.json();
    //   setKeywords(productResponse);
    // }

    // fetchSingleProduct(id);
    // fetchCodesForADeal(id);
    // fetchSearchesForADeal(id);
    // fetchKeywordsForADeal(id);

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        await fetchTagsForError(id);
        await fetchHighlightsForError(id);
        await fetchUserTypesForError(id);
        // await fetchCodesForADeal(id);
        // await fetchSearchesForADeal(id);
        // await fetchKeywordsForADeal(id);
      } catch (e) {
        setError({ message: e.message || 'Failed to fetch data' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    <Link to={`../errors/${item.slug}`} className="card-blog">
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
        <title>{`${errorItem.title} - SOLVED`}</title>
        <meta
          name="description"
          content={errorItem.summary || 'The Buzr blog'}
        />
      </Helmet>
      <div className="container-single-blog">
        <main>
          <article>
            <header>
              <h1>{`${errorItem.title}`}</h1>
              {/* <p className="published">
                Published{' '}
                <time dateTime={errorItem?.created_at}>
                  {getDateFromTimestamp(errorItem?.created_at)}
                </time>{' '}
                by <strong>{errorItem?.userFullName?.split(' ')[0]}</strong>
              </p> */}
              <p className="read-time-group">
                {/* <span>{readTime} min read</span>
                <span className="dot">·</span> */}
                <time dateTime={errorItem?.created_at}>
                  {getDateFromTimestamp(errorItem?.created_at, 'short')}
                </time>
              </p>
              <div className="favorites-shares-container">
                <FavoritesBar itemId={errorItem.id} fieldName="error_id" />
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
                    <FontAwesomeIcon
                      className="share-icon"
                      icon={faPinterest}
                    />
                  </PinterestShareButton>
                  <FacebookShareButton
                    url={`https://www.errorcatalog.com/errors/${errorItem.slug}`}
                  >
                    <FontAwesomeIcon
                      className="share-icon"
                      icon={faFacebookF}
                    />
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
                    <FontAwesomeIcon
                      className="share-icon"
                      icon={faLinkedinIn}
                    />
                  </LinkedinShareButton>
                  <EmailShareButton
                    subject="Check out this error..."
                    body={`It is so inspirational: '${errorItem.title}'`}
                    url={`https://www.errorcatalog.com/errors/${errorItem.slug}`}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </EmailShareButton>
                </div>
              </div>
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

            {/* <Markdown>{errorItem.content}</Markdown> */}

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
          </article>
        </main>
        <Comments id={errorItem.id} user={user} fieldName="errorItem" />

        <div className="container-details container-badges">
          <h2 className="no-margin">Taxonomy</h2>
          <div className="container-tags">
            <div className="badges">
              <p>Product: </p>
              <div>
                <Link to={`/errors/categories/${errorItem.productSlug}`}>
                  <Button
                    secondary
                    label={errorItem.productTitle?.toLowerCase()}
                    size="small"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="container-tags">
            <div className="badges">
              <p>Category: </p>
              <div>
                <Link to={`/errors/categories/${errorItem.categorySlug}`}>
                  <Button
                    secondary
                    label={errorItem.categoryTitle?.toLowerCase()}
                    size="small"
                  />
                </Link>
              </div>
            </div>
          </div>
          {topicsFromErrors.length > 0 && (
            <div className="container-tags">
              <div className="badges">
                <p className="p-no-margin">Related topics: </p>
                <div className="badges-keywords">
                  {topicsFromErrors.map((topic, index) => (
                    <Link to={`../../${topic.url}`}>
                      <Button secondary label={topic.title} size="small" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tags.length > 0 && (
            <div className="container-tags">
              <div className="badges">
                <p className="p-no-margin">Tags: </p>
                <div className="badges-keywords">
                  {tags.map((tag) => (
                    <Link to={`../products/tags/${tag.slug}`}>
                      <Button
                        secondary
                        label={tag.title.toLowerCase()}
                        size="small"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          {highlights.length > 0 && (
            <div className="container-tags">
              <div className="badges">
                <p className="p-no-margin">Highlights: </p>
                <div className="badges-keywords">
                  {highlights.map((tag) => (
                    <Link to={`../products/highlights/${tag.slug}`}>
                      <Button
                        secondary
                        label={tag.title.toLowerCase()}
                        size="small"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {userTypes.length > 0 && (
            <div className="container-tags">
              <div className="badges">
                <p className="p-no-margin">Users: </p>
                <div className="badges-keywords">
                  {userTypes.map((tag) => (
                    <Link to={`../products/userTypes/${tag.slug}`}>
                      <Button
                        secondary
                        label={tag.title.toLowerCase()}
                        size="small"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

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
