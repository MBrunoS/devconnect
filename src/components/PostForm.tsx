import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { UserContext } from "../context/UserContext";
import { useFormSubmission } from "../hooks/useFormSubmission";

import styles from "./PostForm.module.css";

export function PostForm() {
  const [newPostText, setNewPostText] = useState("");
  const { isSubmitting, submit } = useFormSubmission("posts");
  const { fetchPosts } = useContext(PostsContext);
  const { user } = useContext(UserContext);

  function handleNewPostChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewPostText(e.target.value);
  }

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    await submit(
      {
        content: newPostText,
        author: user.id,
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
