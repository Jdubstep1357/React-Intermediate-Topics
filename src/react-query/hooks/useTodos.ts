// Seperation of concerns - making things easier to see instead of being clogged

import { useQuery } from "@tanstack/react-query";
import axios from "axios";



interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}


const useToDos = () => {
  const fetchTodos = () =>
    axios
      // <Todo> returns promise of array
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 10 * 1000
  });
}


export default useToDos;