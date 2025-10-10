import { firebaseStore } from "@store/Firestore"; // Добавляем импорт Firestore
import { makeObservable, observable, reaction, runInAction } from "mobx";

const KEY = "favorites";

export class FavoritesStore {
    favoriteIds: string[] = [];
    
    // Новое поле для отслеживания режима сохранения
    private _isServerSync = false; 

    constructor() {
        makeObservable(this, {
            favoriteIds: observable,
        });

        this._loadFromStorage();
        
        // Реакция, которая срабатывает только при локальном сохранении
        reaction(
            () => this.favoriteIds.slice(),
            (ids) => {
                // Сохраняем в localStorage ТОЛЬКО, если мы не синхронизированы с сервером
                if (!this._isServerSync) { 
                    this._saveToStorage(ids);
                }
            }
        );
    }
    
    handleAuthChange = (userId: string | null) => {
        if (userId) {
            this.migrateLocalFavoritesToServer(userId);
            this._isServerSync = true;
        } else {
            // Пользователь вышел, переключаемся обратно на localStorage
            this._isServerSync = false;
            this._loadFromStorage();
        }
    }

    // НОВЫЙ МЕТОД: Миграция локальных данных на сервер
    private async migrateLocalFavoritesToServer(userId: string) {
        // Локальное избранное (из localStorage, загружено в конструкторе)
        const localFavorites = this.favoriteIds.slice(); 
        
        // 1. Загружаем серверное избранное
        const serverFavorites = await firebaseStore.getUserFavorites(userId);

        // 2. Объединяем списки, избегая дубликатов
        const mergedFavorites = Array.from(new Set([...localFavorites, ...serverFavorites]));

        if (mergedFavorites.length > 0) {
            // 3. Сохраняем объединенный список на сервере
            await firebaseStore.updateUserFavorites(userId, mergedFavorites);
        }

        runInAction(() => {
            this.favoriteIds = mergedFavorites;
            
            if (localFavorites.length > 0) {
                this._clearLocalStorage();
            }
        });
    }

    private _clearLocalStorage() {
        if (typeof window !== "undefined") {
            localStorage.removeItem(KEY);
        }
    }

    toggleFavorite = async (objectId: string) => {
        const { authStore } = await import("../AuthStore/instance"); 
        const userId = authStore.user?.uid;

        let newIds: string[];
        const isCurrentlyFavorite = this.isFavorite(objectId);

        if (isCurrentlyFavorite) {
            newIds = this.favoriteIds.filter((id) => id !== objectId);
        } else {
            newIds = [...this.favoriteIds, objectId];
        }

        runInAction(() => {
            this.favoriteIds = newIds;
        });
        
        if (userId) {
            await firebaseStore.updateUserFavorites(userId, newIds);
        }
    };

    isFavorite = (objectId: string): boolean => {
        return this.favoriteIds.includes(objectId);
    };

    private _saveToStorage(ids: string[]) {
        if (typeof window !== "undefined") {
            localStorage.setItem(KEY, JSON.stringify(ids));
        }
    }

    private _loadFromStorage() {
        if (typeof window !== "undefined") {
            const storedFavorites = localStorage.getItem(KEY);
            if (storedFavorites) {
                const ids = JSON.parse(storedFavorites);
                runInAction(() => {
                    this.favoriteIds = Array.isArray(ids) ? ids : [];
                });
            }
        }
    }
}