"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { Card } from "@/shared/components/Card";
import { Loader } from "@/shared/components/Loader";
import { Text } from "@/shared/components/Text";
import { Header } from "@/widgets/Header";
import { Container } from "@/widgets/Container";
import { Meta } from "@utils/meta";
import { routesConfig } from "@/config";
import { favoritesStore } from "@store/RootStore/FavoritesStore/instance"; // Импорт singleton
import { StarFillIcon } from "@components/icons/StarFillIcon";
import { StarIcon } from "@components/icons/StarIcon";

// Импортируем провайдер и хук, созданные на Шаге 2
import { FavoritesProvider, useFavoritesPageStore } from "./(context)";


import cardsStyles from "@/app/astro-objects/(components)/CardsSection/CardsSection.module.scss";
import styles from "./page.module.scss";

const FavoritesPageContent = observer(() => {
    const store = useFavoritesPageStore();

    if (store.meta === Meta.loading) {
        return (
            <div className={styles['empty-message']}>
                <Loader size="xl" />
            </div>
        );
    }

    if (store.meta === Meta.error) {
        return (
            <div className={styles['empty-message']}>
                <Text tag="h2" view="p-24" color="secondary">
                    An error occurred while loading favorite objects.
                </Text>
            </div>
        );
    }

    const objects = store.objects;
    console.log("KKKKKKKKKKKKK", objects)

    if (objects.length === 0) {
        return (
            <div className={styles['empty-message']}>
                <Text tag="h2" view="p-24" color="secondary">
                    Astro objects not found in favorites.
                </Text>
            </div>
        );
    }

    return (
        <div className={cardsStyles.section}>
            {objects.map((object) => {
                const isFavorite = favoritesStore.isFavorite(object.name);

                const handleFavoriteClick = (e: React.MouseEvent) => {
                    e.preventDefault();
                    favoritesStore.toggleFavorite(object.name);
                };

                return (
                    <Link
                        href={routesConfig.astroObjectDetail.create(object.slug)}
                        key={object.name}
                    >
                        <Card
                            image={object.imagePath}
                            title={object.name}
                            captionSlot={object.category}
                            subtitle={object.description}
                            captionButton={
                                <button
                                    onClick={handleFavoriteClick}
                                    className={cardsStyles["fav-button"]}
                                >
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
        <div className={styles['page-container']}>
            <FavoritesProvider>
                <FavoritesPageContent />
            </FavoritesProvider>
        </div>
    );
}