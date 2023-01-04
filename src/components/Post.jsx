import Markdoc from "@markdoc/markdoc";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import React from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

export function Post({ author, content, publishedAt }) {
  const date = parseISO(publishedAt);
  const publishedDateFormatted = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });
  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });

  const ast = Markdoc.parse(content);
  const transformedContent = Markdoc.transform(ast);

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

        <time title={publishedDateFormatted} dateTime={publishedAt}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        <div style={{ whiteSpace: "pre-line" }}>
          {Markdoc.renderers.react(transformedContent, React)}
        </div>
      </div>

      <form className={styles.commentForm}>
        <strong>Leave your feedback</strong>

        <textarea placeholder="Your comment" />

        <footer>
          <button type="submit">Publish</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
