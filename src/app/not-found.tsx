"use client";

import styles from "@styles/not-found.module.scss";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.page__content}>
        <Image
          className={styles["page__content-image"]}
          src="/images/404.png"
          alt="404 image"
          width={474}
          height={290}
        />
      </div>
    </div>
  );
}
