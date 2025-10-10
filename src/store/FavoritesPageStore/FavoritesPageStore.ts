import { firebaseStore } from "@store/Firestore";
import type { AstroObject } from "@store/Firestore/models";
import { favoritesStore } from "@store/RootStore/FavoritesStore/instance"
import { Meta } from "@utils/meta";
import { action, computed, makeObservable, observable, reaction, runInAction } from "mobx";

export class FavoritesPageStore {
    _objects: AstroObject[] = []; 
    meta: Meta = Meta.initial;

    constructor() {
        makeObservable(this, {
            _objects: observable,
            meta: observable,
            fetchObjects: action.bound,
            objects: computed,
        });

        reaction(
            () => favoritesStore.favoriteIds.slice(),
            () => {
                console.log("RRRRRRRRRRRRRRRRRRRRRRRR")
                this.fetchObjects();
            },
            { fireImmediately: true }
        );
    }

    async fetchObjects() {
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
            this._objects = []; 
        });

        // Параллельная загрузка (Promise.all) [6]
        const objectPromises = favoriteIds.map(id => firebaseStore.getAstroObject(id));
        const results = await Promise.all(objectPromises);

        console.log("KKKKKKKKK", results)

        let successfulObjects: AstroObject[] = [];
        let hadError = false;

        results.forEach(result => {
            console.log("КУЫЫЫЫ", result.data, result.data.data())
            if (result.isError) {
                hadError = true;
            } else if (result.data.exists()) {
                successfulObjects.push(result.data.data() as AstroObject);
            } 
        });

        runInAction(() => {
            // Если была хотя бы одна ошибка, устанавливаем статус ошибки.
            if (hadError) {
                this.meta = Meta.error;
            } else {
                this.meta = Meta.success;
            }
            // Отображаем успешно загруженные объекты, даже если была ошибка в других запросах.
            this._objects = successfulObjects;
            console.log("GGGGGGGGGG", this._objects)
        });
    }

    get objects(): AstroObject[] {
        return this._objects;
    }
}