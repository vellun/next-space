import { Navbar } from "@widgets/Navbar";

import styles from "./Container.module.scss";

export const Container: React.FC = ({children}: Readonly<{
  children: React.ReactNode;
}>) => (
  <div className={styles.layout}>
    <div className={styles.layout__container}>
      <Navbar className={styles.layout__navbar} />
    </div>
    {children}
  </div>
);
