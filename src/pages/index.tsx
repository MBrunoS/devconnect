import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { prisma } from "../services/prisma";
import { SWRConfig } from "swr";
import { PostsList } from "../components/PostsList";
import { PostForm } from "../components/PostForm";
import { PostsProvider } from "../context/PostsContext";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";

import styles from "./index.module.css";
import Head from "next/head";

export default function App({ fallback }) {
  return (
    <>
      <Head>
        <title>DevConnect</title>
      </Head>

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
    </>
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
        include: { author: { select: { id: true, name: true, image: true } } },
      },
    },
  });

  return {
    props: { fallback: { posts: JSON.parse(JSON.stringify(posts)) } },
  };
};
