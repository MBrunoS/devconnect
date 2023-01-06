import React, { useState } from "react";
import { useFormSubmission } from "../hooks/useFormSubmission";

import styles from "./CommentForm.module.css";

export function CommentForm({ handleCreateComment }) {
  const [newCommentText, setNewCommentText] = useState("");
  const { isSubmitting, submit } = useFormSubmission("comments");

  function handleNewCommentChange(event) {
    setNewCommentText(event.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
    handleCreateComment(newCommentText, submit);
    setNewCommentText("");
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
        <button type="submit" disabled={isSubmitting}>
          Publish
        </button>
      </footer>
    </form>
  );
}
