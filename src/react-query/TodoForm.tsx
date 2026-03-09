import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();
  // info on useMutation<1, 2, 3>: 1) Tdata - Todo object 2) TObject - Error, 3) T variable - Data sent to backend, ie: Todo
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      // Updating the list

      // APPROACH 1: Invalidating the cache
      // tell react cache is invalid and update backend
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // APPROACH 2: Updating the data in the cache directly
      // todos comes from ts <Todo[]>
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        // updater is function that takes array of todos
        ...(todos || []),
      ]);
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          // stops the form from being submitted to server
          event.preventDefault();

          if (ref.current && ref.current.value)
            // all mutation objects have mutate for mutating data
            // pass todoobject that will be sent to mutation function
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
