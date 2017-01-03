import React, { PropTypes } from 'react';

const Tag = ({ onClick, label }) => (
  <button
    className="c-tag"
    onClick={onClick}
  >
    {label}
  </button>
);

Tag.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Tag;
