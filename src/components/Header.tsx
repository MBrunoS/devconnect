import Image from "next/image";
import logo from "../assets/ignite-logo.svg";

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Image src={logo} alt="Logo do Ignite" />
    </header>
  );
}
