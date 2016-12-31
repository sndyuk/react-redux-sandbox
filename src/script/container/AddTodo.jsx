import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../duck/todoWidget';

const AddTodo = ({ dispatch, lastTodoId }) => {
  let input;

  return (
    <div className="todo">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value, lastTodoId));
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

const mapStateToProps = state => ({
  lastTodoId: state.todos.isEmpty() ? 0 : state.todos.last().id
});


AddTodo.propTypes = {
  dispatch: React.PropTypes.node.isRequired,
  lastTodoId: React.PropTypes.number.isRequired
};

export default connect(mapStateToProps)(AddTodo);
