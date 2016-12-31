import { SHOW_ALL } from '../state';

// Actions
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// Reducer
export default function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

// Action creators
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
});
