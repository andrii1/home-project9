import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Primary UI component for user interaction
 */
export const Checkbox = ({
  indeterminate = false,
  label,
  value,
  onChange,
  checked,
  className,
  toggleTopicsList,
  active,
  ...props
}) => {
  const cRef = useRef();

  useEffect(() => {
    cRef.current.indeterminate = indeterminate;
  }, [cRef, indeterminate]);

  return (
    <div className="category-input">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        ref={cRef}
        className={className}
      />{' '}
      <div aria-hidden="true" className="label" onClick={toggleTopicsList}>
        <span>{label}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`chevron ${active ? 'open' : ''}`}
        />
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  indeterminate: PropTypes.bool,
  checked: PropTypes.bool,
  active: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  toggleTopicsList: PropTypes.func,
};

Checkbox.defaultProps = {
  indeterminate: false,
  checked: false,
  active: false,
  label: null,
  className: null,
  value: null,
  onChange: undefined,
  toggleTopicsList: undefined,
};
