/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Support.styles.css';
import { Button } from '../Button/Button.component';
import { CircleHelp, CircleX, Info } from 'lucide-react';
import { useUserContext } from '../../userContext';

export const Support = () => {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="support-container">
      <div className={`support-box ${open && 'open-support'}`}>
        <a
          href={`mailto:agorh@icloud.com?subject=Support%20Request%20TAD&body=Hi%20team%2C%0A%0AMy%20email%20is%3A%20${
            user ? user?.email : ''
          }%0AI%20need%20help%20with...`}
          title="Email our support team"
          className="support-text"
        >
          <CircleHelp className="icon" />
          Help
        </a>
        <a
          href={`mailto:agorh@icloud.com?subject=Feature%20Request%20TAD&body=Hi%20team%2C%0A%0AMy%20email%20is%3A%20${
            user ? user?.email : ''
          }%0AMy%20feedback%20or%20feature%20idea%20is...`}
          className="support-text"
        >
          <Info className="icon" />
          Feedback
        </a>
      </div>
      <Button
        secondary
        onClick={() => {
          setOpen(!open);
        }}
        backgroundColor="#ffe5d9"
        aria-label="Open support container"
        className="support-toggle-btn"
      >
        {open ? <CircleX className="icon" /> : <CircleHelp className="icon" />}
      </Button>
    </div>
  );
};

Support.propTypes = {};

Support.defaultProps = {};
