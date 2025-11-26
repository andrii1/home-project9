import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button.component';
import './StripeCancel.Style.css';

export const StripeCancel = () => {
  return (
    <>
      <Helmet>
        <title>Stripe Cancel</title>
      </Helmet>
      <main>
        <h1 className="hero-header">Stripe Cancel</h1>
        <p>Oops... </p>
        <Link to="/prompts">
          <Button label="Go to Prompts page" />
        </Link>
      </main>
    </>
  );
};
