import { action, makeObservable, observable, reaction, runInAction, when } from "mobx";
import { FiltersStore } from "@store/FiltersStore";
import { QueryParamsStore } from "@store/RootStore/QueryParamsStore";
import { Meta } from "@utils/meta";

export abstract class BaseStore {
  query: QueryParamsStore;
  filters: FiltersStore;
  meta: Meta = Meta.initial;
  error: string | null = null;

  private _isInitialized = false

  constructor() {
    this.query = new QueryParamsStore();
    this.filters = new FiltersStore(this.query);

    makeObservable(this, {
      query: observable,
      filters: observable,
      meta: observable,
      setMeta: action,
      init: action,
      fetch: action.bound,
    });

    when(
      () => this.query.navigate !== null,
      () => {
        this.init();
        runInAction(() => {
          this._isInitialized = true;
        });
      }
    );

    reaction(
      () => ({
        filter: this.query.getParam("filter"),
        search: this.query.getParam("search"),
      }),
      (current, previous) => {
      if (
        this._isInitialized &&
        (current.filter !== previous.filter || current.search !== previous.search)
      ) {
        this.fetch();
      }
    },
    );
  }

  init() {
    this.fetch();
  }

  abstract fetch(): Promise<void>;

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }
}
