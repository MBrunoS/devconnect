import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { prisma } from "../services/prisma";
import { SWRConfig } from "swr";
import { PostsList } from "../components/PostsList";
import { PostForm } from "../components/PostForm";
import { PostsProvider } from "../context/PostsContext";

import styles from "./index.module.css";

export default function App({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <PostsProvider>
            <PostForm />
            <PostsList />
          </PostsProvider>
        </main>
      </div>
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: {
        include: { author: { select: { name: true, avatarUrl: true } } },
      },
    },
  });

  return {
    props: { fallback: { posts: JSON.parse(JSON.stringify(posts)) } },
  };
}
