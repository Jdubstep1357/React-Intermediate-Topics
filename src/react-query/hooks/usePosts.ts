import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";


interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) => useInfiniteQuery<Post[], Error>({

    queryKey: ['posts', query],
    
    // pageParam is property in object that react query passes to query function
    queryFn: ({pageParam = 1}) => axios
        .get('https://jsonplaceholder.typicode.com/posts', 
          // instead of typicode.com/posts?userId=1 use params
          {
          params: {
            // _ is index of starting position
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize
          }
        })
        .then((res) => (res.data)),
        staleTime: 1 * 60 * 1000, // 1m
        // this allows page to not be thrown all over ie: one post has 3 users and other has 30. keeps vision inline
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
          // on page 1 ->click return page 2
          return lastPage.length > 0 ? allPages.length + 1 : undefined;
        }
});

export default usePosts;
