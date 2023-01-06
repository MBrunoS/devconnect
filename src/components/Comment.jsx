import { ThumbsUp, Trash } from "phosphor-react";
import { useFormattedDates } from "../hooks/useFormattedDates";
import { api } from "../services/api";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

export function Comment({ id, content, author, publishedAt, onUpdate }) {
  const { formatted, relativeToNow } = useFormattedDates(publishedAt);

  function handleCommentDeletion() {
    api.delete("comments", { data: { id } });
    onUpdate();
  }

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

            <button title="Delete comment" onClick={handleCommentDeletion}>
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
