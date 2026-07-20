import React from 'react';
import PropTypes from 'prop-types';
import './Badge.styles.css';

/**
 * Primary UI component for user interaction
 */
export const Badge = ({
  primary,
  secondary,
  tertiary,
  className,
  backgroundColor,
  color,
  size,
  label,
  ...props
}) => {
  let mode;
  if (primary) {
    mode = 'storybook-badge--primary';
  } else if (secondary) {
    mode = 'storybook-badge--secondary';
  } else if (tertiary) {
    mode = 'storybook-badge--tertiary';
  } else {
    mode = 'storybook-badge--transparent';
  }
  return (
    <div
      className={[
        'storybook-badge',
        `storybook-badge--${size}`,
        mode,
        className,
      ].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </div>
  );
};

Badge.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,

  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  /**
   * How large should the button be?
   */
  color: PropTypes.string,
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

Badge.defaultProps = {
  backgroundColor: null,
  className: null,
  color: null,
  primary: false,
  secondary: false,
  tertiary: false,
  size: 'medium',
  onClick: undefined,
};
