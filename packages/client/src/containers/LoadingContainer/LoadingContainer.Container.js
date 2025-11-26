import React from 'react';
import { Helmet } from 'react-helmet';
import './LoadingContainer.Style.css';
import { Loading } from '../../components/Loading/Loading.Component';

export const LoadingContainer = () => {
  return (
    <>
      <Helmet>
        <title>Loading...</title>
        <meta name="description" content="Fetching data" />
      </Helmet>
      <main className="loading-container">
        <Loading />
      </main>
    </>
  );
};
