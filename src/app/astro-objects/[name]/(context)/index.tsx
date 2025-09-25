"use client"

import { createContext, useContext } from "react";
import { ObjectStore } from "@store/ObjectStore";

export type ObjectContextType = {
  store: ObjectStore;
};

export const ObjectContext = createContext<ObjectContextType | null>(null);

export const ObjectProvider = ({
  objectName,
  children,
}: {
  objectName: string;
  children: React.ReactNode;
}) => {
  const store = new ObjectStore();
  store.init(objectName);
  return <ObjectContext.Provider value={{ store }}>{children}</ObjectContext.Provider>;
};

export const useObjectPageStore = () => {
  const objectContext = useContext(ObjectContext);
  return objectContext?.store;
};
