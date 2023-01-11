import { PencilLine, SignOut } from "phosphor-react";
import { Avatar } from "./Avatar";
import { signOut, useSession } from "next-auth/react";

import styles from "./Sidebar.module.css";

export function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60"
      />

      <div className={styles.profile}>
        <Avatar src={session?.user.image} />

        <strong>{session?.user.name}</strong>
        <span>{session?.user.role || session?.user.email}</span>
      </div>

      <footer>
        <button className={styles.editProfileBtn}>
          <PencilLine size={20} />
          Edit your profile
        </button>

        <button onClick={() => signOut()} className={styles.signOutBtn}>
          <SignOut size={20} /> Sign Out
        </button>
      </footer>
    </aside>
  );
}
