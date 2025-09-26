import cn from "classnames";
import Image from "next/image";

import styles from "./Header.module.scss";

type HeaderProps = {
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className }) => (
  <div className={cn(styles.header, className)}>
    <picture>
      <source media="(max-width: 832px)" srcSet="/images/header-image-adaptive-light.png" />
      <Image className={styles.header__image} 
      width={1140} height={521} 
      src="/images/header-image-light.png" 
      alt="Header image" />
    </picture>
  </div>
);
