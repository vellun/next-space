"use client" // TODO: Убрать вмете с кнопкой для обновления бд

import { Header } from "@/widgets/Header";
import Image from "next/image";
import { CardsSection } from "./(components)/CardsSection";
import { FiltersSection } from "./(components)/FiltersSection";
import { ObjectsProvider } from "./(context)";

import { Button } from "@/shared/components/Button";
import { Loader } from "@/shared/components/Loader";
import { saveAstroObjects } from "@/utils/addFirestoreData";
import { Suspense } from "react";
import styles from "./page.module.scss";

function AllObjectsContentPage() {
  const UpdateDB = () => {
    saveAstroObjects()
  }
  
  return (
    <div>
      <Header className={styles.page__header} />
      <ObjectsProvider>
      <div className={styles.page}>
        <div className={styles["page__filters-section"]}>
          <Image width={1200} height={140} 
            className={styles.page__line} 
            src="/icons/filter-section-line.svg"
            alt="Line element" />
          <FiltersSection className={styles.page__filters}/>
        </div>
        <CardsSection />
      </div>
      </ObjectsProvider>
      <Button onClick={UpdateDB}>Update db (debug)</Button>
    </div>
  );
};

export default function AllObjectsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AllObjectsContentPage />
    </Suspense>
  );
}