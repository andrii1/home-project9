import React from 'react';
import PropTypes from 'prop-types';
import './Button.styles.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  secondary,
  lighterBg,
  className,
  backgroundColor,
  color,
  size,
  label,
  icon,
  type = 'button',
  children,
  disabled,
  ...props
}) => {
  let mode;
  if (primary) {
    mode = 'storybook-button--primary';
  } else if (lighterBg) {
    mode = 'storybook-button--lighterBg';
  } else if (secondary) {
    mode = 'storybook-button--secondary';
  } else {
    mode = 'storybook-button--tertiary';
  }
  return (
    <button
      disabled={disabled}
      /* eslint-disable react/button-has-type */
      type={type}
      /* eslint-enable react/button-has-type */
      className={[
        'storybook-button',
        `storybook-button--${size}`,
        mode,
        className,
      ].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
      {icon}
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  lighterBg: PropTypes.bool,
  secondary: PropTypes.bool,
  icon: PropTypes.element,
  children: PropTypes.element,
  disabled: PropTypes.bool,

  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  /**
   * How large should the button be?
   */
  color: PropTypes.string,
  type: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  className: null,
  color: null,
  primary: false,
  lighterBg: false,
  secondary: false,
  disabled: false,
  size: 'medium',
  onClick: undefined,
  type: 'button',
  icon: null,
  children: null,
};
