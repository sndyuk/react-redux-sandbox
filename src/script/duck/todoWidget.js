import { List } from 'immutable';

// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Reducer
const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};
export default function todos(state = List(), action) {
  switch (action.type) {
    case ADD_TODO:
      return state.push(todo(undefined, action));
    case TOGGLE_TODO:
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
}

// Action creators
export const addTodo = (text, lastTodoId) => ({
  type: ADD_TODO,
  id: lastTodoId + 1,
  text
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});
