"use client"

import { AllObjectsStore } from "@store/AllObjectsStore";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

export type ObjectsContextType = {
  store: AllObjectsStore;
};

export const ObjectsContext = createContext<ObjectsContextType | null>(null);

export const useAllObjectsPageStore = () => {
  const context = useContext(ObjectsContext);
  return context?.store;
};

const StoreInitializer = ({ store }: { store: AllObjectsStore }) => {
  const search = useSearchParams();
  const navigate = useRouter();

  useEffect(() => {
    store.query.setSearch(search.toString());
    store.query.setNavigate(navigate); 
  }, [store, search, navigate]);

  return null;
};

export const ObjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const store = new AllObjectsStore();
  return <ObjectsContext.Provider value={{ store }}>
      <StoreInitializer store={store} />
      {children}
    </ObjectsContext.Provider>
};
