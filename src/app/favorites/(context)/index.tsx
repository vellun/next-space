"use client";

import { createContext, useContext, useMemo } from "react";
import { FavoritesPageStore } from "@store/FavoritesPageStore";

// Тип контекста
export type FavoritesContextType = {
    store: FavoritesPageStore;
};


export const FavoritesContext = createContext<FavoritesContextType | null>(null);


export const useFavoritesPageStore = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavoritesPageStore must be used within a FavoritesProvider");
    }
    return context.store;
};

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const store = useMemo(() => new FavoritesPageStore(), []);
    // const store = new FavoritesPageStore()

    return (
        <FavoritesContext.Provider value={{ store }}>
            {children}
        </FavoritesContext.Provider>
    );
};