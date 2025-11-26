import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CategoriesListDropDown.style.css';

const DropDownView = ({
  options,
  label,
  onSelect,
  selectedOptionValue,
  className = '',
  showFilterIcon = false,
  ...props
}) => {
  const [value, setValue] = useState(selectedOptionValue || '');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSelect?.(newValue);
  };

  return (
    <select
      onChange={handleChange}
      value={value}
      className={`view-dropdown-select ${className} ${
        showFilterIcon ? 'all-filters' : ''
      }`}
      {...props}
    >
      {!selectedOptionValue && <option value="">{label}</option>}
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

DropDownView.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  selectedOptionValue: PropTypes.string,
  className: PropTypes.string,
  showFilterIcon: PropTypes.bool,
};

DropDownView.defaultProps = {
  onSelect: undefined,
  selectedOptionValue: '',
  className: '',
  showFilterIcon: false,
};

export default DropDownView;
