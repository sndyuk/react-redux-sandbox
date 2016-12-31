import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <div className="c-todoList">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onClick={() => onTodoClick(todo.id)}
      />)
    )}
  </div>
);

TodoList.propTypes = {
  todos: ImmutablePropTypes.isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
