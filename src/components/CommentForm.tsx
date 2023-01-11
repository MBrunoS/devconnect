import React, { useContext, useState, FormEvent, ChangeEvent } from "react";
import { PostsContext } from "../context/PostsContext";
import { UserContext } from "../context/UserContext";
import { useFormSubmission } from "../hooks/useFormSubmission";

import styles from "./CommentForm.module.css";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [newCommentText, setNewCommentText] = useState("");
  const { isSubmitting, submit } = useFormSubmission("comments");
  const { fetchPosts } = useContext(PostsContext);
  const { user } = useContext(UserContext);

  function handleNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(e.target.value);
  }

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    await submit(
      {
        content: newCommentText,
        post: postId,
        author: user.id,
      },
      "Comentário enviado"
    );

    setNewCommentText("");
    fetchPosts();
  }

  const isNewCommentNotEmpty = newCommentText.length > 0;

  return (
    <form className={styles.commentForm} onSubmit={submitForm}>
      <strong>Leave your feedback</strong>

      <textarea
        placeholder="Your comment"
        value={newCommentText}
        onChange={handleNewCommentChange}
        required
      />

      <footer>
        {isNewCommentNotEmpty && (
          <button type="submit" disabled={isSubmitting}>
            Comment
          </button>
        )}
      </footer>
    </form>
  );
}
