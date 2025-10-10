import { BaseStore } from "@store/BaseStore";
import { firebaseStore } from "@store/Firestore";
import type { AstroObject } from "@store/Firestore/models";
import { Meta } from "@utils/meta";
import { action, makeObservable, observable, reaction, runInAction } from "mobx";
import { favoritesStore } from "../RootStore/FavoritesStore/instance";

export class FavoriteObjectsStore {
    _objects: AstroObject[] = [];
    meta: Meta = Meta.initial;

    constructor() {
        makeObservable(this, {
            _objects: observable,
            meta: observable,
            fetch: action.bound,
        });

        // Реакция на изменение списка избранных ID
        reaction(
            () => favoritesStore.favoriteIds.slice(),
            () => {
                this.fetch();
            },
            { fireImmediately: true }
        );
    }
    
    // Загрузка полных данных объектов по ID из стора избранного
    async fetch() {
        const favoriteIds = favoritesStore.favoriteIds;

        if (favoriteIds.length === 0) {
            runInAction(() => {
                this._objects = [];
                this.meta = Meta.success;
            });
            return;
        }

        runInAction(() => {
            this.meta = Meta.loading;
        });

        // Новый метод в Firestore, который нужно будет добавить, 
        // для получения списка объектов по массиву имен/slugs
        const { isError, data } = await firebaseStore.getAstroObjectsByIds(favoriteIds); 
        
        if (isError) {
            runInAction(() => {
                this.meta = Meta.error;
            });
            return;
        }

        runInAction(() => {
            this.meta = Meta.success;
            this._objects = data;
        });
    }

    get objects(): AstroObject[] {
        return this._objects;
    }
}