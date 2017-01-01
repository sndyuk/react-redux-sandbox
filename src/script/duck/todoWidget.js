import { List } from 'immutable';
import fetch from 'isomorphic-fetch';

// Actions
const ADD_TODO_SYNC_REQUEST = 'ADD_TODO_SYNC_REQUEST';
const ADD_TODO_SYNC_RESPONSE = 'ADD_TODO_SYNC_RESPONSE';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Reducer
const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO_SYNC_RESPONSE:
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
    case ADD_TODO_SYNC_RESPONSE:
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
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});

const addTodoRequest = (id, text) => ({
  type: ADD_TODO_SYNC_REQUEST,
  id,
  text
});

const addTodoSyncResponse = ({ id, permanentId, text }) => ({
  type: ADD_TODO_SYNC_RESPONSE,
  id,
  permanentId,
  text
});

export const addTodoSync = (lastTodoId, text) => (
  (dispatch) => {
    const id = lastTodoId + 1;
    dispatch(addTodoRequest(id, text));

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return fetch(`${config.api.main}/add_todo`, { // eslint-disable-line no-undef
      method: 'POST',
      headers,
      body: JSON.stringify({
        id,
        text
      })
    }).then(response => response.json())
      .then(json =>
        dispatch(addTodoSyncResponse(json))
      );
  }
);
