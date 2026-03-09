// Seperation of concerns - making things easier to see instead of being clogged

import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";





const useToDos = () => {


return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    // when reference getAll, this keyword looses context and becomes undefined. hence .bind to connecting object
    // queryFn: apiClient.getAll.bind(apiClient),

    // referenced by arrow function in apiClient
    queryFn: todoService.getAll,
    staleTime: 10 * 1000
  });
}


export default useToDos;