"use client"

import React from "react";

import { Loader } from "@components/Loader";
import { Text } from "@components/Text";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { notFound } from "next/navigation";

import { useObjectPageStore } from "../../(context)";

import styles from "./ObjectInfo.module.scss";


const ObjectInfo = () => {
  const store = useObjectPageStore();

  if (store === undefined) {
    return;
  }

  if (store.meta === Meta.loading) {
    return <Loader size="xl"/>;
  }
  
  if (store.meta === Meta.error) {
    return <div>An error occured</div>;
  }

  const object = store.object;

  if (!object) {
    notFound()
  }

  return (
    <div className={styles.page}>
      <div className={styles["page__top-container"]}>
        <Image
          className={styles["page__top-container-image"]}
          src={object.imageDetailPath}
          alt="Planet image"
          width={630}
          height={630}
        />
        <div className={styles["page__top-container__left-side"]}>
          <div className={styles.title}>
            <Text tag="div" view="title" weight="bold">
              {object.name}
            </Text>
            <Text tag="div" view="p-24" weight="medium" color="semi">
              {object.category}
            </Text>
          </div>
          <div className={styles["info-container"]}>
            <div className={styles.info}>
              {Object.entries(object.info).map(([key, value]) => (
                <React.Fragment key={key}>
                  <Text
                    className={styles["info-key"]}
                    tag="div"
                    view="p-22"
                    weight="medium"
                    color="semi"
                  >
                    {key}
                  </Text>
                  <Text className={styles["info-value"]} tag="div" view="p-22" weight="medium">
                    {value}
                  </Text>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Text className={styles.page__description} tag="div" view="p-20" weight="normal" color="semi">
        {object.description}
      </Text>
    </div>
  );
};

export default observer(ObjectInfo)
