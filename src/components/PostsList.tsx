import React, { useContext } from "react";
import { Post } from "./Post";
import { PostsContext } from "../context/PostsContext";

export function PostsList() {
  const { posts } = useContext(PostsContext);
  return (
    <>
      {posts.map((post) => (
        <Post
          id={post.id}
          author={post.author}
          content={post.content}
          publishedAt={post.publishedAt}
          commentList={post.comments}
          key={post.id}
        />
      ))}
    </>
  );
}
