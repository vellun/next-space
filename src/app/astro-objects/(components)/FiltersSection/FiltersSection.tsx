"use client"

import { useCallback } from "react";

import { MultiDropdown, type Option } from "@components/MultiDropdown";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { astroObjectsCategories } from "@/config";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";


import { useAllObjectsPageStore } from "../../(context)";

import styles from "./FiltersSection.module.scss";


type FiltersProps = {
  className?: string;
};

export const FiltersSection: React.FC<FiltersProps> = observer(({ className }) => {
  const store = useAllObjectsPageStore();

  if (store === undefined) {
      return;
    }
  
  const handleInputChange = (value: string) => {
    store.filters.setInputValue(value);
  };

  const handleButtonClick = () => {
    store.filters.applySearch(); 
  };

  const handleSelect = (selectedOptions: Option[]) => {
    const selectedType = selectedOptions.at(-1)?.key;

    if (selectedType) {
      store.filters.setFilter(selectedType);
    }
  };

  const getTitle = useCallback((values: Option[]) => {
    return values.length === 0 ? "Select object category" : values.map(({ value }) => value).join(", ");
  }, []);

  const inputVal = store.filters.inputValue !== null ? store.filters.inputValue : store.filters.search

  return (
    <div className={cn(styles.section, className)}>
      <div className={styles.section__search}>
        <Input value={inputVal} placeholder="Find an astronomical object" onChange={handleInputChange} />
        <Button onClick={handleButtonClick}>
          <Image src="/icons/search.svg" alt="Search Icon" width={24} height={24} />
        </Button>
      </div>
      <MultiDropdown
        className={styles.section__filter}
        options={astroObjectsCategories}
        value={store.filters.filter ? [{ key: store.filters.filter, value: store.filters.filter }] : []}
        onChange={handleSelect}
        getTitle={getTitle}
      />
    </div>
  );
});
