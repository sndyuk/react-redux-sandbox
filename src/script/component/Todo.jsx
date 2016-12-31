import React, { PropTypes } from 'react';

const Todo = ({ onClick, todo }) => (
  <button
    className={`c-todo${todo.completed ? ' c-todo--completed' : ''}`}
    onClick={onClick}
  >
    {todo.text}
    <div
      className={`c-todo__detail${todo.detail ? '' : ' c-todo__detail--empty'}`}
    >
      {todo.detail}
    </div>
  </button>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default Todo;
