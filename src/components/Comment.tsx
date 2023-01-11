import { User } from "@prisma/client";
import { ThumbsUp, Trash } from "phosphor-react";
import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { useFormattedDates } from "../hooks/useFormattedDates";
import { api } from "../services/api";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
  id: string;
  content: string;
  author: User;
  publishedAt: string;
  applauses: number;
}

export function Comment({
  id,
  content,
  author,
  publishedAt,
  applauses,
}: CommentProps) {
  const { formatted, relativeToNow } = useFormattedDates(publishedAt);
  const { fetchPosts } = useContext(PostsContext);

  function handleCommentDeletion() {
    api.delete("comments", { data: { id } });
    fetchPosts();
  }

  function handleApplause() {
    api.post("applauses", { id });
    fetchPosts();
  }

  return (
    <div className={styles.comment}>
      <Avatar src={author.image} hasBorder={false} />

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
          <button onClick={handleApplause}>
            <ThumbsUp />
            Aplaudir <span>{applauses}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
