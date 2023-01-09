import React, { useContext, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { useFormSubmission } from "../hooks/useFormSubmission";

import styles from "./CommentForm.module.css";

export function CommentForm({ postId }) {
  const [newCommentText, setNewCommentText] = useState("");
  const { isSubmitting, submit } = useFormSubmission("comments");
  const { fetchPosts } = useContext(PostsContext);

  function handleNewCommentChange(event) {
    setNewCommentText(event.target.value);
  }

  async function submitForm(e) {
    e.preventDefault();

    await submit(
      {
        content: newCommentText,
        post: postId,
        author: "clcgykwsn0002v7c4xlb9lszw",
      },
      "Comentário enviado"
    );

    setNewCommentText("");
    fetchPosts();
  }

  return (
    <form className={styles.commentForm} onSubmit={submitForm}>
      <strong>Leave your feedback</strong>

      <textarea
        placeholder="Your comment"
        value={newCommentText}
        onChange={handleNewCommentChange}
      />

      <footer>
        {newCommentText.length > 0 && (
          <button type="submit" disabled={isSubmitting}>
            Comment
          </button>
        )}
      </footer>
    </form>
  );
}
