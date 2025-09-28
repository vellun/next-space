import { makeObservable, observable, reaction, runInAction } from 'mobx';

const KEY = 'favorites';

export class FavoritesStore {
  favoriteIds: string[] = [];

  constructor() {
    makeObservable(this, {
      favoriteIds: observable,
    });
    this._loadFromStorage();

    reaction(
      () => this.favoriteIds.slice(),
      (ids) => {
        this._saveToStorage(ids);
      }
    );
  }

  toggleFavorite = (objectId: string) => {
    if (this.isFavorite(objectId)) {
      this.favoriteIds = this.favoriteIds.filter(id => id !== objectId);
    } else {
      this.favoriteIds.push(objectId);
    }
  };

  isFavorite = (objectId: string): boolean => {
    return this.favoriteIds.includes(objectId);
  };

  private _saveToStorage(ids: string[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY, JSON.stringify(ids));
    }
  }

  private _loadFromStorage() {
    if (typeof window !== 'undefined') {
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
