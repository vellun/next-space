import { action, makeObservable, observable, runInAction } from "mobx";
import { firebaseStore } from "@store/Firestore";
import type { AstroObject } from "@store/Firestore/models";
import { Meta } from "@utils/meta";

export class ObjectStore {
  _astroObject: AstroObject | null = null;
  meta: Meta = Meta.initial;

  constructor() {
    makeObservable(this, {
      _astroObject: observable,
      meta: observable,
      setMeta: action,
      init: action,
      fetch: action.bound,
    });
  }

  init(objectName: string) {
    this.fetch(objectName);
  }

  async fetch(objectName: string): Promise<void> {
    runInAction(() => {
      this.meta = Meta.loading;
      this._astroObject = null;
    });

    const { isError, data } = await firebaseStore.getAstroObject(objectName);
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;
      this._astroObject = data;
    });
  }

  get object(): AstroObject | null {
    return this._astroObject;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }
}
