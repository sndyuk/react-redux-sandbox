import React from 'react';
import FilterLinks from './FilterLinks';
import AddTodo from '../container/AddTodo';
import VisibleTodo from '../container/VisibleTodo';
import HistoryTag from '../container/HistoryTag';
import Ping from '../container/Ping';

const App = () => (
  <div>
    <AddTodo />
    <HistoryTag />
    <FilterLinks />
    <VisibleTodo />
    <Ping />
  </div>
);

export default App;
