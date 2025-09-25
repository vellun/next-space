import { BaseStore } from "@store/BaseStore";
import { firebaseStore } from "@store/Firestore";
import type { AstroObject } from "@store/Firestore/models";
import { Meta } from "@utils/meta";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { action, makeObservable, observable, runInAction } from "mobx";

export class AllObjectsStore extends BaseStore {
  _astroObjects: AstroObject[] = [];
  isEnd = false;
  isNextPageLoading = false;

  private _perPage = 3;
  private _lastVisibleDoc: QueryDocumentSnapshot | null = null;

  constructor() {
    super();
    makeObservable(this, { _astroObjects: observable, 
      fetchNextPage: action.bound });
  }

  async fetch() {
    this.reset();
    await this.fetchNextPage();
  }

  async fetchNextPage() {
    if (this.isEnd) {
      return;
    }

    this.setMeta(Meta.loading);

    const requestParams = this.query.getApiObjectsParams();
    requestParams.search = requestParams.search || this.filters.inputValue as string
    requestParams.perPage = this._perPage
    requestParams.startAfter = this._lastVisibleDoc

    const { isError, data } = await firebaseStore.getAstroObjects(requestParams);

    if (isError) {
      console.log("Error occured:", data);
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;
      const objects = data.docs.map(doc => doc.data());
      const lastVisibleDoc = data.docs[data.docs.length - 1];

      this._astroObjects.push(...objects);
      this._lastVisibleDoc = lastVisibleDoc;
      this.isEnd = objects.length < this._perPage;
    });
  }

  reset() {
    this._astroObjects = [];
    this._lastVisibleDoc = null;
    this.isEnd = false;
    this.isNextPageLoading = false;
    this.setMeta(Meta.initial);
    this.filters.inputValue = null;
  }

  get objects(): AstroObject[] {
    return this._astroObjects;
  }
}
