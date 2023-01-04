import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Post } from "../components/Post";
import { prisma } from "../services/prisma";

import styles from "./index.module.css";

export default function App({ posts }) {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
              key={post.id}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({ include: { author: true } });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
