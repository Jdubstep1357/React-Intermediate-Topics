import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePosts = (query: PostQuery) => useQuery<Post[], Error>({
    // queryKey - name / identified for cached data
    // cached data stops things from being loading more than once. if i click posts 2 and 1, and click on 2, it display loading screen

    // if array is truthy display all 3 values, otherwise just display posts. this stops null from being displayed
    // /users/1/posts
    queryKey: ['posts', query],
    // function that fetches data
    queryFn: () => axios
        .get('https://jsonplaceholder.typicode.com/posts', 
          // instead of typicode.com/posts?userId=1 use params
          {
          params: {
            // _ is index of starting position
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize
          }
        })
        .then((res) => (res.data)),
        staleTime: 1 * 60 * 1000, // 1m
        keepPreviousData: true
});

export default usePosts;
