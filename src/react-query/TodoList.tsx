import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

// state hook - declares state variables
const TodoList = () => {
  const fetchTodos = () =>
    axios
      // <Todo> returns promise of array
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data: todos } = useQuery({
    // unique idetifier for query
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // if (error) return <p>{error}</p>;

  return (
    <ul className="list-group">
      {/* data comes from const { data } */}
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
