import { Navbar } from "@widgets/Navbar";

import styles from "./Container.module.scss";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => (
  <div className={styles.layout}>
    <div className={styles.layout__container}>
      <Navbar className={styles.layout__navbar} />
    </div>
    {children}
  </div>
);
