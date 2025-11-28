/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Errors.Style.css';
import { apiURL } from '../../apiURL';
import { CardCategories } from '../../components/CardCategories/CardCategories.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button/Button.component';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getDateFromTimestamp } from '../../utils/getDateFromTimestamp';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from '../../components/Loading/Loading.Component';

export const Errors = () => {
  const [searchTerms, setSearchTerms] = useState();
  const [resultsHome, setResultsHome] = useState([]);
  const [errorItems, setErrorItems] = useState([]);
  const [showAppsBy, setShowAppsBy] = useState('alphabet');
  const [orderBy, setOrderBy] = useState({
    column: 'id',
    direction: 'desc',
  });
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchErrorItems() {
  //     const response = await fetch(`${apiURL()}/errorItems/`);
  //     const data = await response.json();
  //     setErrorItems(data);
  //   }
  //   fetchErrorItems();
  // }, []);

  // first fetch
  useEffect(() => {
    setIsLoading(true);
    const url = `${apiURL()}/errors?page=0&column=${orderBy.column}&direction=${
      orderBy.direction
    }`;

    async function fetchErrorItems() {
      const response = await fetch(url);
      const json = await response.json();

      let hasMore = true;
      if (json.data.some((item) => item.id === json.lastItem.id)) {
        hasMore = false;
      }

      setErrorItems({
        data: json.data,
        lastItem: json.lastItem,
        hasMore,
      });
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }

    fetchErrorItems();
  }, [orderBy.column, orderBy.direction]);

  const fetchErrorItems = async () => {
    setIsLoading(true);

    const url = `${apiURL()}/errors?page=${page}&column=${
      orderBy.column
    }&direction=${orderBy.direction}`;

    const response = await fetch(url);
    const json = await response.json();

    let hasMore = true;

    if (json.data.some((item) => item.id === json.lastItem.id)) {
      hasMore = false;
    }

    setErrorItems((prevItems) => {
      return {
        data: [...prevItems.data, ...json.data],
        lastItem: json.lastItem,
        hasMore,
      };
    });

    setPage((prev) => prev + 1);
  };

  const cardItems = errorItems?.data?.map((errorItem) => {
    return (
      <Link to={`../errors/${errorItem.slug}`} className="card-blog">
        <h2>{errorItem.title}</h2>
        {errorItem.summary && (
          <div className="blog-preview">{`${errorItem.summary}`}</div>
        )}
        <div className="date">{getDateFromTimestamp(errorItem.created_at)}</div>
      </Link>
    );
  });

  return (
    <>
      <Helmet>
        <title>Error Catalog - solve your errors</title>
        <meta name="description" content="Solve your errors" />
      </Helmet>
      {/* <div className="hero"></div> */}
      <div className="container-blog">
        <header>
          <h1>Error Catalog</h1>
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
        {errorItems.data ? (
          <section className="container-scroll">
            <InfiniteScroll
              dataLength={errorItems.data.length}
              next={fetchErrorItems}
              hasMore={errorItems.hasMore}
              loader={<p>Loading...</p>}
              endMessage={<p>No more items.</p>}
              className="container-cards container-cards-blog"
            >
              {errorItems?.data?.map((errorItem) => {
                return (
                  <Link
                    to={`../errors/${errorItem.slug}`}
                    className="card-blog"
                  >
                    <h2>{errorItem.title}</h2>
                    {errorItem.summary && (
                      <div className="blog-preview">{`${errorItem.summary}`}</div>
                    )}
                    <div className="date">
                      {getDateFromTimestamp(errorItem.created_at)}
                    </div>
                  </Link>
                );
              })}
            </InfiniteScroll>
          </section>
        ) : (
          <Loading />
        )}
        {/* <section className="container-cards container-cards-errorItem">
          {cardItems}
        </section> */}
      </div>
    </>
  );
};
