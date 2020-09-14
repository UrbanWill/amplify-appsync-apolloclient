import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { listTodos } from "../graphql/queries";
import { createTodo, deleteTodo } from "../graphql/mutations";
import TodoItem from "./TodoItem";

import "./todo.scss";

const Todo = () => {
  const [todoInput, setTodoInput] = useState("");

  const { data, loading, error, refetch } = useQuery(gql(listTodos));
  const [addTodo] = useMutation(gql(createTodo));
  const [deleteTodoItem] = useMutation(gql(deleteTodo));

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>Error, please try again later...</p>;
  }

  const handleSubmit = () => {
    addTodo({ variables: { input: { todo: todoInput } } }).then(() =>
      refetch()
    );
    setTodoInput("");
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        placeholder="Add todo..."
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
      />
      <span>
        <button type="button" onClick={handleSubmit}>
          +
        </button>
      </span>
      <TodoItem
        todos={data.listTodos.items}
        deleteTodoItem={deleteTodoItem}
        refetch={refetch}
      />
    </div>
  );
};

export default Todo;
