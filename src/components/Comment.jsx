import { ThumbsUp, Trash } from "phosphor-react";
import { useFormattedDates } from "../hooks/useFormattedDates";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

export function Comment({ content, author, publishedAt }) {
  const { formatted, relativeToNow } = useFormattedDates(publishedAt);
  return (
    <div className={styles.comment}>
      <Avatar src={author.avatarUrl} hasBorder={false} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time title={formatted} dateTime={publishedAt}>
                {relativeToNow}
              </time>
            </div>

            <button title="Delete comment">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
