import React from "react";
import useSWR from "swr";
import { Post } from "./Post";
import { api } from "../services/api";

const fetcher = (url) => api.get(url).then((res) => res.data);

export function Posts() {
  const { data: posts, mutate } = useSWR("posts", fetcher);

  return posts.map((post) => (
    <Post
      id={post.id}
      author={post.author}
      content={post.content}
      publishedAt={post.publishedAt}
      commentList={post.comments}
      onUpdate={mutate}
      key={post.id}
    />
  ));
}
