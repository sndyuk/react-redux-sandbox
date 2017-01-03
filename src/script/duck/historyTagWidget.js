import { List } from 'immutable';
import { SELECT_HISTORY_TAG, ADD_HISTORY_TAG } from './action';

// Reducer
export default function historyTag(state = List(), action) {
  switch (action.type) {
    case SELECT_HISTORY_TAG:
      return state.filter(v => v !== action.tag);
    case ADD_HISTORY_TAG:
      return state.concat(action.tags).takeLast(
        config.history.max // eslint-disable-line no-undef
      ).toSet().toList();
    default:
      return state;
  }
}

// Action creators
export const selectHisotryTag = tag => ({
  type: SELECT_HISTORY_TAG,
  tag
});

export const addHistoryTag = tags => ({
  type: ADD_HISTORY_TAG,
  tags
});
