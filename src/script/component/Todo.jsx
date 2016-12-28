import React, { PropTypes } from 'react';

const Todo = ({ onClick, completed, text }) => (
  <button
    className={`todo__list__item panelList__item ${completed ? 'todo__list__item--completed' : 'none'}`}
    onClick={onClick}
  >
    {text}
  </button>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
