import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";
import { api } from "./services/api";

import styles from "./App.module.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then((response) => setPosts(response.data));
  }, []);

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
