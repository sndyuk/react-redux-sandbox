import { List } from 'immutable';

export const SHOW_ALL = 'SHOW_ALL';

export const Todo = (id, text, detail, sync, lastSyncRequestTime, completed) => ({
  id,
  text,
  detail,
  sync,
  completed
});

const State = ({
  todos = [],
  visibilityFilter = SHOW_ALL,
  historyTag = [],
  isPinging = false }) => (
  {
    todos: List(todos),
    visibilityFilter,
    historyTag: List(historyTag),
    isPinging
  });

export default State;
