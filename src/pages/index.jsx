import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { prisma } from "../services/prisma";
import { SWRConfig } from "swr";

import styles from "./index.module.css";
import { Posts } from "../components/Posts";

export default function App({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Posts />
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
