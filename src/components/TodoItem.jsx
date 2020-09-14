import React from "react";

import "./todo.scss";

const TodoItem = ({ todos, deleteTodoItem, refetch }) => {
  const handleDelete = (todoId) => {
    deleteTodoItem({ variables: { input: { id: todoId } } }).then(() =>
      refetch()
    );
  };

  const todoItem = todos.map((todo) => (
    <div key={todo.id} className="todo-item-container">
      <p>{todo.todo}</p>
      <button type="button" onClick={() => handleDelete(todo.id)}>
        Delete
      </button>
    </div>
  ));

  return <div className="todo-items-container">{todoItem}</div>;
};

export default TodoItem;
