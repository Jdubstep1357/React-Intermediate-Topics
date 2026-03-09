import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();

  // optimistic update - assume server never down and cause fast updating right away

  // info on useMutation<1, 2, 3>: 1) Tdata - Todo object 2) TObject - Error, 3) T variable - Data sent to backend, ie: Todo
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),

    // Callbled before data is mutated
    // optimistic update
    onMutate: (newTodo: Todo) => {
      // previous todos before update cache. if error, roll back to this
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      if (ref.current) ref.current.value = "";

      // this is what is rolled back if there is an error
      return { previousTodos };
    },

    // 2 parameters - savedToDo from backend newTodo from client
    // iterate over array and checks if it is the same as newtodo replace it with same todo, otherwise same todo object
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) =>
          // after click, check if new todo is same as saved todo, replace it with saved todo
          todo === newTodo ? savedTodo : todo,
        ),
      );
    },

    // IF FAIL
    // 3rd parameter is context of type of type unknown
    onError: (error, newTodo, context) => {
      if (!context) return;

      // if failed display error message and roll back to previous state
      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
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
          {/* Added loading button while waiting for data */}
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
