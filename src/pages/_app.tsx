import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../context/UserContext";
import "./global.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  );
}
