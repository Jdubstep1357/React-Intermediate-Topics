import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constants";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<Todo>('/todos');



interface AddTodoContext {
    previousTodos: Todo[];
}


const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  // optimistic update - assume server never down and cause fast updating right away

  // info on useMutation<1, 2, 3>: 1) Tdata - Todo object 2) TObject - Error, 3) T variable - Data sent to backend, ie: Todo
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: apiClient.post,

    onMutate: (newTodo: Todo) => {
      // previous todos before update cache. if error, roll back to this
      const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);

      // Data management - not update UI
      // onAdd same as below
      onAdd();
    //   if (ref.current) ref.current.value = "";

      // this is what is rolled back if there is an error
      return { previousTodos };
    },

    // 2 parameters - savedToDo from backend newTodo from client
    // iterate over array and checks if it is the same as newtodo replace it with same todo, otherwise same todo object
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
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
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
}

export default useAddTodo;