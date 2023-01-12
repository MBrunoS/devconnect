import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { GithubLogo } from "phosphor-react";
import { authOptions } from "./api/auth/[...nextauth]";

import logo from "../assets/dev-connect-logo.svg";
import styles from "./login.module.css";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>DevConnect - Login</title>
      </Head>

      <main className={styles.loginPage}>
        <section>
          <header className={styles.logo}>
            <Image src={logo} alt="Logo do DevConnect" />
            <h1>DevConnect</h1>
          </header>

          <button onClick={() => signIn("github")}>
            <GithubLogo size={20} /> Sign in with Github
          </button>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
