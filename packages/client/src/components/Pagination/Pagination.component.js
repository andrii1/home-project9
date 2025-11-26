import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pagination.styles.css';
import PropTypes from 'prop-types';

export const Pagination = ({
  onPageChange,
  page,
  count,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <div className="pagination">
      Rows per page: 10 | 1-10 of {count}
      <NavLink to="#" className="pagination-button">
        &#8592; Prev
      </NavLink>
      <NavLink to="#" className="pagination-button">
        Next &#8594;
      </NavLink>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  page: null,
  count: null,
  rowsPerPage: null,
  onPageChange: undefined,
  onRowsPerPageChange: undefined,
};
