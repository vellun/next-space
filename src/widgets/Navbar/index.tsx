"use client";
import { Text } from "@components/Text";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import cn from "classnames";
import Image from "next/image";

import { observer } from "mobx-react-lite";
import { authStore } from "@store/RootStore/AuthStore";
import { routesConfig } from "@/config";
import { Button } from "@/shared/components/Button";
import { Meta } from "@/utils/meta";

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = observer(({ className }) => {
  const isLoggedIn = authStore.isLoggedIn;

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <nav className={cn(styles.navbar, className)}>
      <Link href={routesConfig.astroObjects.create()}>
        <Image
          width={205}
          height={31}
          src="/icons/logo.svg"
          className={styles.navbar__logo}
          alt="Space Logo"
        />
      </Link>
      <div className={styles.navbar__menu}>
        <Link href={routesConfig.astroObjects.create()}>
          <Text view="p-20" tag="div">
            categories
          </Text>
        </Link>

        {isLoggedIn ? (
          <>
            <Link href={routesConfig.favorites.create()}>
              <Text view="p-20" tag="div">
                Избранное
              </Text>
            </Link>
            <Button onClick={handleLogout} loading={authStore.meta === Meta.loading}>
              Выход
            </Button>
          </>
        ) : (
          <>
            <Link href={routesConfig.login.create()}>
              <Text view="p-20" tag="div">
                Войти
              </Text>
            </Link>
            <Link href={routesConfig.register.create()}>
              <Text view="p-20" tag="div">
                Регистрация
              </Text>
            </Link>
          </>
        )}

      </div>
    </nav>
  );
});
