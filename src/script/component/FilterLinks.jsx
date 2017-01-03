import React from 'react';
import FilterLink from '../container/FilterLink';

const FilterLinks = () => (
  <p className="c-filterLinkList">
    Show:
    {' '}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

export default FilterLinks;
