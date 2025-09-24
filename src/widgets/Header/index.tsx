import headerAdaptiveImage from "/images/header-image-adaptive-light.png";
import headerImage from "/images/header-image-light.png";
import cn from "classnames";

import styles from "./Header.module.scss";

type HeaderProps = {
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className }) => (
  <div className={cn(styles.header, className)}>
    <picture>
      <source media="(max-width: 832px)" srcSet={headerAdaptiveImage} />
      <img className={styles.header__image} src={headerImage} alt="Header image" />
    </picture>
  </div>
);
