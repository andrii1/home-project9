/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './BlogView.Style.css';
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

export const BlogView = () => {
  const { user } = useUserContext();
  const { slugParam } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [relatedDeals, setRelatedDeals] = useState([]);

  useEffect(() => {
    async function fetchSingleBlog(blogSlug) {
      setLoading(true);
      try {
        const response = await fetch(`${apiURL()}/blogs/${blogSlug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch');
        }
        setBlog(data[0]);
        setError(null);
      } catch (e) {
        setError({ message: e.message || 'Failed to fetch data.' });
      }
      setLoading(false);
    }

    fetchSingleBlog(slugParam);
  }, [slugParam]);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const url = `${apiURL()}/blogs?page=0&column=id&direction=desc`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch');
        }
        setRecentBlogs(data.data.slice(0, 3));
        setError(null);
      } catch (e) {
        setError({ message: e.message || 'Failed to fetch data.' });
      }
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  // useEffect(() => {
  //   async function fetchRelatedDeals() {
  //     setLoading(true);
  //     try {
  //       const url = `${apiURL()}/deals?page=0&column=id&direction=desc&search=${encodeURIComponent(
  //         cleanBrand(blog.title),
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
  // }, [blog.title]);

  const readTime = getEstimatedReadTime(blog?.content);

  const cardItems = recentBlogs?.map((item) => (
    <Link to={`../blog/${item.slug}`} className="card-blog">
      <h2>{item.title}</h2>
      <div className="blog-preview">{`${item.summary}`}</div>
      <div className="date">{getDateFromTimestamp(item.created_at)}</div>
    </Link>
  ));

  // const cardItemsDeals = relatedDeals?.map((item) => (
  //   <Link to={`../deals/${item.id}`} className="card-blog card-deal">
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
        <title>{blog.title}</title>
        <meta name="description" content={blog.summary || 'The Buzr blog'} />
      </Helmet>
      <div className="container-single-blog">
        <main>
          <article>
            <header>
              <h1>{blog.title}</h1>
              <p className="read-time">{readTime} min read</p>
              <FavoritesBar itemId={blog.id} />
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
                        className: 'image-single-blog',
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
                {blog.content}
              </Markdown>
            ) : (
              <Markdown>{blog.content}</Markdown>
            )} */}

            <Markdown>{blog.content}</Markdown>

            {/* <div className="images-blog-container">
              <div>
                <Link to={`../quotes/3`} target="_blank">
                  <img
                    src="https://motivately1.s3.amazonaws.com/quotes/04f4f32d-f27b-4bf8-bd2a-5eb162385899.png"
                    alt="text"
                    className="image-single-blog"
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
                    className="image-single-blog"
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
                <time dateTime={blog?.created_at}>
                  {getDateFromTimestamp(blog?.created_at)}
                </time>{' '}
                by <strong>{blog?.userFullName?.split(' ')[0]}</strong>
              </p>
              <div className="icons-apps-page">
                <span>Share it: </span>
                <FontAwesomeIcon
                  icon={faLink}
                  className="button-copy"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://www.topappdeals.com/blog/${blog.slug}`,
                    );
                  }}
                />
                <PinterestShareButton
                  media={logo}
                  description={blog.meta_description || ''}
                >
                  <FontAwesomeIcon className="share-icon" icon={faPinterest} />
                </PinterestShareButton>
                <FacebookShareButton
                  url={`https://www.topappdeals.com/blog/${blog.slug}`}
                >
                  <FontAwesomeIcon className="share-icon" icon={faFacebookF} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`https://www.topappdeals.com/blog/${blog.slug}`}
                  title={`'${blog.title}'`}
                  hashtags={['quotes', 'inspirational']}
                >
                  <FontAwesomeIcon className="share-icon" icon={faTwitter} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={`https://www.topappdeals.com/blog/${blog.slug}`}
                >
                  <FontAwesomeIcon className="share-icon" icon={faLinkedinIn} />
                </LinkedinShareButton>
                <EmailShareButton
                  subject="Check out this blog!"
                  body={`It is so inspirational: '${blog.title}'`}
                  url={`https://www.topappdeals.com/blog/${blog.slug}`}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </EmailShareButton>
              </div>
              <div>
                <FacebookShareCount
                  url={`https://www.topappdeals.com/blog/${blog.slug}`}
                >
                  {(shareCount) => (
                    <span className="myShareCountWrapper">{shareCount}</span>
                  )}
                </FacebookShareCount>
                <PinterestShareCount
                  url={`https://www.topappdeals.com/blog/${blog.slug}`}
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
        <Comments id={blog.id} user={user} fieldName="blog" />
        {recentBlogs.length > 0 && (
          <aside className="container-alternatives">
            <h3>⏳ Recent blogs</h3>
            <div className="container-cards small-cards">{cardItems}</div>
          </aside>
        )}
      </div>
    </>
  );
};
