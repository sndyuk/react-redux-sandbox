import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Todo from './Todo';

export default class Todos extends React.Component {
  static propTypes = {
    todos: ImmutablePropTypes.isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onTodoAdded: PropTypes.func.isRequired
  }

  componentDidUpdate() {
    const {
      todos,
      onTodoAdded
    } = this.props;
    onTodoAdded(todos);
  }

  render() {
    const {
      todos,
      onTodoClick
    } = this.props;
    return (<div className="c-todoList">
      {
        todos.map(todo => (<Todo
          key={todo.id}
          todo={todo}
          onClick={() => onTodoClick(todo.id)}
        />))
      }
    </div>);
  }
}
