import React, { PropTypes } from 'react';

const Todo = ({ onClick, completed, todo }) => (
  <button
    className={`todo__list__item panelList__item ${completed ? 'todo__list__item--completed' : 'none'}`}
    onClick={onClick}
  >
    {todo.text}
    <div
      className={'todo__list__item__detail'}
    >
      {todo.detail}
    </div>
  </button>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default Todo;
