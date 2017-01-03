import React from 'react';
import FilterLinks from './FilterLinks';
import AddTodo from '../container/AddTodo';
import VisibleTodo from '../container/VisibleTodo';
import HistoryTag from '../container/HistoryTag';

const App = () => (
  <div>
    <AddTodo />
    <HistoryTag />
    <FilterLinks />
    <VisibleTodo />
  </div>
);

export default App;
