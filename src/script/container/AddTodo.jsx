import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../action';

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div className="todo">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <div className="formItem">
          <input
            className="todo__input formItem__input"
            ref={(node) => {
              input = node;
            }}
          />
          <button
            className="todo__enterButton button button--next formItem__button"
            type="submit"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  dispatch: React.PropTypes.node.isRequired
};

export default connect()(AddTodo);
