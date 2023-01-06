import Markdoc from "@markdoc/markdoc";
import React, { useState } from "react";
import { useFormattedDates } from "../hooks/useFormattedDates";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import styles from "./Post.module.css";

export function Post({ id, author, content, publishedAt, commentList }) {
  const [comments, setComments] = useState(commentList);
  const { formatted, relativeToNow } = useFormattedDates(publishedAt);

  const ast = Markdoc.parse(content);
  const transformedContent = Markdoc.transform(ast);

  async function handleCreateComment(text, submit) {
    const comment = await submit(
      {
        content: text,
        post: id,
        author: "clcgykwsn0002v7c4xlb9lszw",
      },
      "Comentário enviado"
    );

    if (comment) {
      setComments([...comments, comment]);
    }
  }

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={formatted} dateTime={publishedAt}>
          {relativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        <div style={{ whiteSpace: "pre-line" }}>
          {Markdoc.renderers.react(transformedContent, React)}
        </div>
      </div>

      <CommentForm postId={id} handleCreateComment={handleCreateComment} />

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            content={comment.content}
            author={comment.author}
            publishedAt={comment.publishedAt}
            key={comment.id}
          />
        ))}
      </div>
    </article>
  );
}
