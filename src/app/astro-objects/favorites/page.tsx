"use client";

import React, { createContext, useContext, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { FavoriteObjectsStore } from "@store/FavoriteObjectsStore";
import { Meta } from "@utils/meta";
import { Card } from "@/shared/components/Card";
import { Loader } from "@/shared/components/Loader";
import { Text } from "@/shared/components/Text";
import { useInfiniteScroll } from "../(hooks)/useInfiniteScroll"; // Переиспользуем хук для лоадера
import { favoritesStore } from "@store/RootStore/FavoritesStore/instance";
import { useRouter } from "next/navigation";
import { routesConfig } from "@/config";
import Link from "next/link";
import styles from "./favorites.module.scss";
import { StarFillIcon } from "@/shared/components/icons/StarFillIcon";
import { StarIcon } from "@/shared/components/icons/StarIcon";


const FavoritesContext = createContext<{ store: FavoriteObjectsStore } | null>(null);

const useFavoriteObjectsStore = () => {
    const context = useContext(FavoritesContext);
    return context?.store;
};

const FavoriteObjectsProvider = ({ children }: { children: React.ReactNode }) => {
    // Используем useMemo, чтобы стор не пересоздавался при ререндере
    const store = useMemo(() => new FavoriteObjectsStore(), []);

    return (
        <FavoritesContext.Provider value={{ store }}>
            {children}
        </FavoritesContext.Provider>
    );
};


const FavoritesContent = observer(() => {
    const store = useFavoriteObjectsStore();
    const router = useRouter();

    if (store === undefined) return null;

    const objects = store.objects;
    const meta = store.meta;

    if (meta === Meta.loading && objects.length === 0) {
        return <Loader size="xl" className={styles.centered} />;
    }

    if (meta === Meta.error) {
        return <Text view="p-24" color="secondary" className={styles.centered}>Ошибка при загрузке данных</Text>;
    }

    if (objects.length === 0) {
        return (
            <div className={styles.centered}>
                <Text view="p-24" color="secondary">
                    У вас пока нет избранных объектов.
                </Text>
            </div>
        );
    }

    return (
        <div className={styles.section}>
            {objects.map((object) => {
                const isFavorite = favoritesStore.isFavorite(object.name);

                const handleFavoriteClick = (e: React.MouseEvent) => {
                    e.preventDefault();
                    favoritesStore.toggleFavorite(object.name);
                };

                return (
                    <Link
                        key={object.name}
                        href={routesConfig.astroObjectDetail.create(object.slug)}
                    >
                        <Card
                            title={object.name}
                            captionSlot={object.category}
                            subtitle={object.description}
                            image={object.imagePath}
                            captionButton={
                                <button className={styles["fav-button"]} onClick={handleFavoriteClick}>
                                    {isFavorite ? <StarFillIcon /> : <StarIcon />}
                                </button>
                            }
                        />
                    </Link>
                );
            })}
        </div>
    );
});


export default function FavoritesPage() {
    return (
        <FavoriteObjectsProvider>
            <div className={styles.page}>
                <Text view="title" tag="h1" className={styles.title}>Избранное</Text>
                <FavoritesContent />
            </div>
        </FavoriteObjectsProvider>
    );
}