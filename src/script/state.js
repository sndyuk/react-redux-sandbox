import { List } from 'immutable';

export const SHOW_ALL = 'SHOW_ALL';


export const Todo = (id, text, detail) => ({
  id,
  text,
  detail
});

const State = ({ todos = [], visibilityFilter = SHOW_ALL }) => {
  let todoList;
  if (todos instanceof Array) {
    todoList = List(todos);
  } else {
    throw new Error('Argument "todos" must be an array or Immutable.List.');
  }
  return {
    todos: todoList,
    visibilityFilter
  };
};

export default State;
