import { Comment } from "./Comment";
import styles from "./Post.module.css";

export function Post() {
  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <img className={styles.avatar} src="https://github.com/diego3g.png" />
          <div className={styles.authorInfo}>
            <strong>Diego Fernandes</strong>
            <span>Web Developer</span>
          </div>
        </div>

        <time title="26 de Dezembro de 2022" dateTime="2022-12-26 14:09:00">
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Hey guuys 👋</p>

        <p>
          I just uploaded another project to my portfolio. It's a project I did
          at NLW Return, a Rocketseat event. Project name is DoctorCare 🚀
        </p>

        <p>
          👉 <a href="https://mbrunos.dev">jane.design/doctorcare</a>
        </p>

        <p>
          <a href="https://mbrunos.dev">#newproject</a>{" "}
          <a href="https://mbrunos.dev">#nlw</a>{" "}
          <a href="https://mbrunos.dev">#rocketseat</a>
        </p>
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
