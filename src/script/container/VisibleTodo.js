import { connect } from 'react-redux';
import { toggleTodo, syncTodo } from '../duck/todoWidget';
import Todos from '../component/Todos';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = ({
  onTodoClick: toggleTodo,
  onTodoAdded: todos => syncTodo(todos)
});

const VisibleTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export default VisibleTodo;
