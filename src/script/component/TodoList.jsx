import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <div className="todo__list panelList">
    {todos.map(todo =>
      <Todo
        key={todo.id}
        todo={todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </div>
);

TodoList.propTypes = {
  todos: ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
