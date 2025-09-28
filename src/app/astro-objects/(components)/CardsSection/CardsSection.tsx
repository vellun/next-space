"use client";

import { StarFillIcon } from "@components/icons/StarFillIcon";
import { StarIcon } from "@components/icons/StarIcon";
import { favoritesStore } from "@store/RootStore/FavoritesStore";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { routesConfig } from "@/config";
import { Card } from "@/shared/components/Card";
import { Loader } from "@/shared/components/Loader";

import { useAllObjectsPageStore } from "../../(context)";
import { useInfiniteScroll } from "../../(hooks)/useInfiniteScroll";

import styles from "./CardsSection.module.scss";

export const CardsSection: React.FC = observer(() => {
  const store = useAllObjectsPageStore();

  if (store === undefined) {
    return;
  }

  const objects = store.objects;
  const meta = store.meta;
  const onFetch = store.fetchNextPage;
  const isEnd = store.isEnd;

  const fetchRef = useInfiniteScroll(onFetch, store.meta === Meta.loading, store.isEnd);

  if (objects.length === 0 && meta === Meta.loading) {
    return <Loader size="xl" />;
  }

  if (meta === Meta.error) {
    return <div>An error occured</div>;
  }

  if (objects.length === 0) {
    return <div>Astro objects not found</div>;
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
          <Link href={routesConfig.astroObjectDetail.create(object.slug)} key={object.slug}>
            <Card
              title={object.name}
              captionSlot={object.category}
              subtitle={object.description}
              image={object.imagePath}
              captionButton={
                <button className={styles["fav-button"]} onClick={handleFavoriteClick}>
                  {isFavorite ? (
                    <StarFillIcon width="20" height="20" />
                  ) : (
                    <StarIcon width="20" height="20" />
                  )}
                </button>
              }
            />
          </Link>
        );
      })}

      <div ref={fetchRef}>{!isEnd && <Loader />}</div>
    </div>
  );
});
