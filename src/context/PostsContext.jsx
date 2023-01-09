import { createContext } from "react";
import useSWR from "swr";
import { api } from "../services/api";

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const fetcher = (url) => api.get(url).then((res) => res.data);
  const { data: posts, mutate: fetchPosts } = useSWR("posts", fetcher);

  return (
    <PostsContext.Provider value={{ posts, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
