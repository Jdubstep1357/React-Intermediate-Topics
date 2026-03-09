// Seperation of concerns - making things easier to see instead of being clogged

import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { CACHE_KEY_TODOS } from "../constants";


const apiClient = new APIClient<Todo>('/todos')

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}


const useToDos = () => {


return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    // when reference getAll, this keyword looses context and becomes undefined. hence .bind to connecting object
    // queryFn: apiClient.getAll.bind(apiClient),

    // referenced by arrow function in apiClient
    queryFn: apiClient.getAll,
    staleTime: 10 * 1000
  });
}


export default useToDos;