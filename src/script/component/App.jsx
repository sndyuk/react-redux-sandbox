import React from 'react';
import FilterLinks from './FilterLinks';
import AddTodo from '../container/AddTodo';
import VisibleTodoList from '../container/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <FilterLinks />
    <VisibleTodoList />
  </div>
);

export default App;
