import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import './Toast.Style.css';

const Toast = ({
  open,
  title,
  children,
  overlayClass = 'overlay',
  right,
  left,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // eslint-disable-next-line no-return-assign
    return () => (document.body.style.overflow = '');
  }, [open]);

  let divStyle;
  if (right) {
    divStyle = { right };
  } else if (left) {
    divStyle = { left };
  } else {
    divStyle = null;
  }

  if (!open) return null;

  return (
    <div role="presentation" className={overlayClass} style={divStyle}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="presentation"
        className="toast-container"
      >
        <div className="modal-wrapper">{title && <h2>{title}</h2>}</div>
        {children && (
          <div className="modal-content modal-content-toast">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Toast;

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  overlayClass: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  right: PropTypes.string,
  left: PropTypes.string,
};

Toast.defaultProps = {
  right: null,
  left: null,
  title: null,
};
