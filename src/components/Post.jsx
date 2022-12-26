import styles from "./Post.module.css";

export function Post() {
  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <img className={styles.avatar} src="https://github.com/mbrunos.png" />
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
        <p>Fala galeraa 👋</p>

        <p>
          Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
          no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀
        </p>

        <p>
          👉 <a href="https://mbrunos.dev">jane.design/doctorcare</a>
        </p>

        <p>
          <a href="https://mbrunos.dev">#novoprojeto</a>{" "}
          <a href="https://mbrunos.dev">#nlw</a>{" "}
          <a href="https://mbrunos.dev">#rocketseat</a>
        </p>
      </div>
    </article>
  );
}
