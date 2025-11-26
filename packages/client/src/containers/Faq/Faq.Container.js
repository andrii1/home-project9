import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Faq.Style.css';

export const Faq = () => {
  return (
    <>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <main>
        <h1 className="hero-header">FAQ</h1>
        <h2>How many apps are here?</h2>
        <p>Nearly 200 AI apps, spread over 34 topics and 7 categories.</p>
        <h2>What are the main features?</h2>
        <p>You can filter and sort apps, bookmark apps, add ratings.</p>
        <h2>How to add my app?</h2>
        <p>
          <Link className="link" to="../apps/new">
            Submit a form
          </Link>{' '}
          or reach out via agorh @ icloud.com
        </p>
      </main>
    </>
  );
};
