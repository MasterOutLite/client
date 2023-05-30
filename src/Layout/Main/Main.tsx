import { ReactNode } from "react";
import styles from "./Main.module.scss";

export interface MainProps {
  children?: ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main className={styles.page}>
      {children}
    </main>
  );
}

export default Main;
