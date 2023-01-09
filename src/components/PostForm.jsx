import React, { useContext, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { useFormSubmission } from "../hooks/useFormSubmission";

import styles from "./PostForm.module.css";

export function PostForm() {
  const [newPostText, setNewPostText] = useState("");
  const { isSubmitting, submit } = useFormSubmission("posts");
  const { fetchPosts } = useContext(PostsContext);

  function handleNewPostChange(event) {
    setNewPostText(event.target.value);
  }

  async function submitForm(e) {
    e.preventDefault();

    await submit(
      {
        content: newPostText,
        author: "clcgykwsn0002v7c4xlb9lszw",
      },
      "Comentário enviado"
    );

    fetchPosts();
    setNewPostText("");
  }

  const isNewPostEmpty = newPostText.length === 0;

  return (
    <form className={styles.postForm} onSubmit={submitForm}>
      <strong>What do you wanna say?</strong>

      <textarea
        placeholder="You can write Markdown here to create your post!"
        value={newPostText}
        onChange={handleNewPostChange}
        required
      />

      <footer>
        <button type="submit" disabled={isNewPostEmpty || isSubmitting}>
          Publish
        </button>
      </footer>
    </form>
  );
}
