import Markdoc from "@markdoc/markdoc";
import { User } from "@prisma/client";
import { Comment as CommentType } from "../types/Comment";
import React from "react";
import { useFormattedDates } from "../hooks/useFormattedDates";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import styles from "./Post.module.css";

interface PostProps {
  id: string;
  author: User;
  content: string;
  publishedAt: string;
  commentList: CommentType[];
}

export function Post({
  id,
  author,
  content,
  publishedAt,
  commentList,
}: PostProps) {
  const { formatted, relativeToNow } = useFormattedDates(publishedAt);

  const ast = Markdoc.parse(content);
  const transformedContent = Markdoc.transform(ast);

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <Avatar src={author.image} />
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

      <CommentForm postId={id} />

      <div className={styles.commentList}>
        {commentList.map((comment) => (
          <Comment
            id={comment.id}
            content={comment.content}
            author={comment.author}
            publishedAt={comment.publishedAt}
            applauses={comment.applauses}
            key={comment.id}
          />
        ))}
      </div>
    </article>
  );
}
