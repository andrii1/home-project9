import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button.component';
import './StripeSuccess.Style.css';

export const StripeSuccess = () => {
  return (
    <>
      <Helmet>
        <title>Stripe Success</title>
      </Helmet>
      <main>
        <h1 className="hero-header">Success!</h1>
        <p>Thank you for your purchase!</p>
        <Link to="/prompts">
          <Button label="Go to Prompts page" />
        </Link>
      </main>
    </>
  );
};
