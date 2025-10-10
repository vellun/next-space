import { Text } from "@components/Text";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import styles from "./Navbar.module.scss";
import { routesConfig } from "@/config";

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={cn(styles.navbar, className)}>
      <div className={styles.navbar__menu}>
        <Link href="/" className={styles.navbar__link1}>
          <Text tag="div" view="p-22" weight="medium" color="primary">
            astro objects
          </Text>
        </Link>
        <Link href="/">
          <Image
            width={205}
            height={31}
            src="/icons/logo.svg"
            className={styles.navbar__logo}
            alt="Space Logo"
          />
        </Link>
        <Link href={routesConfig.favorites.create()} className={styles.navbar__link2}>
          <Text tag="div" view="p-22" weight="medium" color="primary">
            favorites
          </Text>
        </Link>
      </div>
    </div>
  );
};
