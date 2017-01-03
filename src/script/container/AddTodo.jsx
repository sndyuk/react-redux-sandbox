import React from 'react';
import { connect } from 'react-redux';
import { addTodoRequest } from '../duck/todoWidget';

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div className="c-addTodo">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodoRequest(input.value));
          input.value = '';
        }}
      >
        <div className="formItem">
          <input
            className="c-addTodo__input formItem__input"
            ref={(node) => {
              input = node;
            }}
          />
          <button
            className="c-addTodo__enterButton button button--next formItem__button"
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
