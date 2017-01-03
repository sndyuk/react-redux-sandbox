import { List } from 'immutable';
import fetch from 'isomorphic-fetch';
import { addHistoryTag } from './historyTagWidget';
import { ADD_TODO_SYNC_REQUEST, ADD_TODO_SYNC_RESPONSE, TOGGLE_TODO } from './action';

// Reducer
export default function todos(state = List(), action) {
  switch (action.type) {
    case ADD_TODO_SYNC_REQUEST:
      return state.push({
        id: state.isEmpty() ? 0 : state.size,
        text: action.text,
        sync: false,
        completed: false,
      });
    case ADD_TODO_SYNC_RESPONSE:
      return state.set(action.id, {
        ...state.get(action.id),
        sync: true,
      });
    case TOGGLE_TODO: {
      const todo = state.get(action.id);
      return state.set(action.id, {
        ...todo,
        completed: !todo.completed,
      });
    }
    default:
      return state;
  }
}

// Action creators
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

export const addTodoRequest = text => ({
  type: ADD_TODO_SYNC_REQUEST,
  text,
});

const addTodoSyncResponse = ({ id, permanentId }) => ({
  type: ADD_TODO_SYNC_RESPONSE,
  id,
  permanentId,
});

export const syncTodo = currentTodos => (
  dispatch => Promise.all(currentTodos.map((todo) => {
    if (todo.sync) {
      return Promise.resolve();
    }
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    return fetch(`${CONFIG.api.main}/add_todo`, { // eslint-disable-line no-undef
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...todo,
      }),
    }).then(response => response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      dispatch(addHistoryTag(json.words));
      return dispatch(addTodoSyncResponse(json));
    }));
  }))
);
