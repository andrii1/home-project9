/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Blog.Style.css';
import { apiURL } from '../../apiURL';
import { CardCategories } from '../../components/CardCategories/CardCategories.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button/Button.component';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getDateFromTimestamp } from '../../utils/getDateFromTimestamp';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from '../../components/Loading/Loading.Component';

export const Blog = () => {
  const [searchTerms, setSearchTerms] = useState();
  const [resultsHome, setResultsHome] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showAppsBy, setShowAppsBy] = useState('alphabet');
  const [orderBy, setOrderBy] = useState({
    column: 'id',
    direction: 'desc',
  });
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchBlogs() {
  //     const response = await fetch(`${apiURL()}/blogs/`);
  //     const data = await response.json();
  //     setBlogs(data);
  //   }
  //   fetchBlogs();
  // }, []);

  // first fetch
  useEffect(() => {
    setIsLoading(true);
    const url = `${apiURL()}/blogs?page=0&column=${orderBy.column}&direction=${
      orderBy.direction
    }`;

    async function fetchBlogs() {
      const response = await fetch(url);
      const json = await response.json();

      let hasMore = true;
      if (json.data.some((item) => item.id === json.lastItem.id)) {
        hasMore = false;
      }

      setBlogs({
        data: json.data,
        lastItem: json.lastItem,
        hasMore,
      });
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }

    fetchBlogs();
  }, [orderBy.column, orderBy.direction]);

  const fetchBlogs = async () => {
    setIsLoading(true);

    const url = `${apiURL()}/blogs?page=${page}&column=${
      orderBy.column
    }&direction=${orderBy.direction}`;

    const response = await fetch(url);
    const json = await response.json();

    let hasMore = true;

    if (json.data.some((item) => item.id === json.lastItem.id)) {
      hasMore = false;
    }

    setBlogs((prevItems) => {
      return {
        data: [...prevItems.data, ...json.data],
        lastItem: json.lastItem,
        hasMore,
      };
    });

    setPage((prev) => prev + 1);
  };

  const cardItems = blogs?.data?.map((blog) => {
    return (
      <Link to={`../blog/${blog.slug}`} className="card-blog">
        <h2>{blog.title}</h2>
        {blog.summary && (
          <div className="blog-preview">{`${blog.summary}`}</div>
        )}
        <div className="date">{getDateFromTimestamp(blog.created_at)}</div>
      </Link>
    );
  });

  return (
    <>
      <Helmet>
        <title>Blog - The Buzr</title>
        <meta name="description" content="Top App Deals blog" />
      </Helmet>
      {/* <div className="hero"></div> */}
      <div className="container-blog">
        <header>
          <h1>Blog</h1>
        </header>
        {/* <div className="container-apps-sort">
        <Link
          className={showAppsBy === 'alphabet' ? '' : 'apps-sort-underline'}
          onClick={() => setShowAppsBy('alphabet')}
        >
          By alphabet
        </Link>
        <Link
          className={showAppsBy === 'topics' ? '' : 'apps-sort-underline'}
          onClick={() => setShowAppsBy('topics')}
        >
          By topics
        </Link>
      </div> */}
        {blogs.data ? (
          <section className="container-scroll">
            <InfiniteScroll
              dataLength={blogs.data.length}
              next={fetchBlogs}
              hasMore={blogs.hasMore}
              loader={<p>Loading...</p>}
              endMessage={<p>No more blogs.</p>}
              className="container-cards container-cards-blog"
            >
              {blogs?.data?.map((blog) => {
                return (
                  <Link to={`../blog/${blog.slug}`} className="card-blog">
                    <h2>{blog.title}</h2>
                    {blog.summary && (
                      <div className="blog-preview">{`${blog.summary}`}</div>
                    )}
                    <div className="date">
                      {getDateFromTimestamp(blog.created_at)}
                    </div>
                  </Link>
                );
              })}
            </InfiniteScroll>
          </section>
        ) : (
          <Loading />
        )}
        {/* <section className="container-cards container-cards-blog">
          {cardItems}
        </section> */}
      </div>
    </>
  );
};
