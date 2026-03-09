import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) => useQuery<Post[], Error>({
    // queryKey - name / identified for cached data
    // cached data stops things from being loading more than once. if i click posts 2 and 1, and click on 2, it display loading screen

    // if array is truthy display all 3 values, otherwise just display posts. this stops null from being displayed
    // /users/1/posts
    queryKey: userId ? ['posts', userId, 'posts'] : ['posts'],
    // function that fetches data
    queryFn: () => axios
        .get('https://jsonplaceholder.typicode.com/posts', 
          // instead of typicode.com/posts?userId=1 use params
          {
          params: {
            userId
          }
        })
        .then((res) => (res.data)),
        staleTime: 1 * 60 * 1000, // 1m
});

export default usePosts;
