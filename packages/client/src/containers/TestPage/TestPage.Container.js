import useFetch from '../../utils/hooks/useFetch';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiURL } from '../../apiURL';
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component';

function TestPage() {
  const [apps, setApps] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const observerTarget = useRef(null);
  // const fetchMoreData = () => {
  //   // a fake async api call like which sends
  //   // 20 more records in 1.5 secs

  //   setApps([...apps, ...apps]);
  // };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${apiURL()}/apps/?page=0`);
      const data = await response.json();

      setApps({ data: data.data, totalCount: data.totalCount });
      // setPage((prevPage) => prevPage + 1);
    }

    fetchData();
  }, []);
  const fetchApps = async () => {
    // setApps([...apps, ...apps]);
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${apiURL()}/apps/?page=${page}`);
    const data = await response.json();

    setApps((prevItems) => [...prevItems, ...data]);
    if (data.some((item) => item.id === 202)) {
      setHasMore(false);
    }
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={apps.length}
        next={fetchApps}
        hasMore={hasMore} // Replace with a condition based on your data source
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <ul>
          {apps.data &&
            apps.data.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul>
      </InfiniteScroll>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default TestPage;
