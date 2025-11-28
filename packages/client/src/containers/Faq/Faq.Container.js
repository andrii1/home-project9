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
      <div className="container-single-blog">
        <main>
          <h1 className="hero-header">FAQ</h1>
          <h2>How to add contact?</h2>
          <p>
            <Link className="link" to="../apps/new">
              Submit a form
            </Link>{' '}
            or reach out via agorh @ icloud.com
          </p>
        </main>
      </div>
    </>
  );
};
