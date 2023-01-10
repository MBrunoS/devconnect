import { Post } from "../types/Post";
import { createContext } from "react";
import useSWR from "swr";
import { api } from "../services/api";

interface IPostsContext {
  posts: Post[];
  fetchPosts: () => void;
}

export const PostsContext = createContext<IPostsContext>({} as IPostsContext);

export function PostsProvider({ children }) {
  const fetcher = (url) => api.get(url).then((res) => res.data);
  const { data: posts, mutate: fetchPosts } = useSWR<Post[]>("posts", fetcher);

  return (
    <PostsContext.Provider value={{ posts, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
