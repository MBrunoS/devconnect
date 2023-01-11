import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { prisma } from "../services/prisma";
import { SWRConfig } from "swr";
import { PostsList } from "../components/PostsList";
import { PostForm } from "../components/PostForm";
import { PostsProvider } from "../context/PostsContext";
import { useSession } from "next-auth/react";

import styles from "./index.module.css";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";

export default function App({ fallback }) {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
  }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: {
        include: { author: { select: { name: true, image: true } } },
      },
    },
  });

  return {
    props: { fallback: { posts: JSON.parse(JSON.stringify(posts)) } },
  };
};
