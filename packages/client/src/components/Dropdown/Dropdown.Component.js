import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.Style.css';

export const Dropdown = ({ options, label, onSelect, disabled, showLabel }) => {
  const optionList =
    options.length > 0 &&
    options.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });

  const handleChange = (event) => {
    onSelect(event.target.value);
  };
  return (
    <div className="dropdown">
      {showLabel && <label htmlFor={label}>{label}</label>}
      <div>
        <select id={label} onChange={handleChange} disabled={disabled}>
          <option selected hidden>
            Choose {label}
          </option>
          {optionList}
        </select>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  disabled: PropTypes.string,
  showLabel: PropTypes.bool,
};

Dropdown.defaultProps = {
  onSelect: undefined,
  disabled: undefined,
  showLabel: true,
};
