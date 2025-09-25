import cn from "classnames";
import { Text } from "@components/Text";
import React from "react";

import Image from "next/image";

import styles from "./Card.module.scss";

export type CardProps = {
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  captionButton?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  captionButton,
}: CardProps) => {
  return (
    <div className={cn(styles.card, className)} onClick={onClick}>
      <div className={styles.card__body}>
        <div className={styles.card__caption}>
          <div className={styles["card__caption-title"]}>
          <Text
            className={cn(styles.card__text, styles.card__title)}
            weight="medium"
            view="p-20"
            color="primary"
            maxLines={2}
          >
            {title}
          </Text>
          {captionSlot && (
            <Text
              className={cn(styles.card__text, styles["card__caption-slot"])}
              weight="medium"
              view="p-18"
              color="semi"
              tag="div"
            >
              {captionSlot}
            </Text>
          )}</div>
          {captionButton}
        </div>
        <Image className={styles.card__image} width={310} height={275} src={image} alt="Card image" />

        <Text weight="normal" view="p-18" color="primary" maxLines={3}>
          {subtitle}
        </Text>
      </div>
      <div className={styles.card__footer}>
        {contentSlot && (
          <Text
            className={cn(styles["card__content-slot"])}
            weight="bold"
            view="p-18"
            color="primary"
          >
            {contentSlot}
          </Text>
        )}
        {actionSlot}
      </div>
    </div>
  );
};
