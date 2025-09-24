import { makeAutoObservable, reaction } from "mobx";
import type { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export class FiltersStore {
  private _queryStore: QueryParamsStore;
  private _filter: string;
  private _search: string;

  constructor(queryStore: QueryParamsStore) {
    this._queryStore = queryStore;
    this._filter = "";
    this._search = "";

    makeAutoObservable(this);

    reaction(
      () => ({
        filter: this._queryStore.getParam("filter"),
        search: this._queryStore.getParam("search"),
      }),
      ({ filter, search }) => {
        if (filter !== undefined) {
          this._filter = filter;
        }
        if (search !== undefined) {
          this._search = search;
        }
      }
    );
  }

  setFilter(newFilter: string) {
    if (this._filter !== newFilter) {
      this._filter = newFilter;
      this._queryStore.updateQueryParams({ filter: newFilter });
    }
  }

  setSearch(newSearch: string) {
    if (this._search !== newSearch) {
      this._search = newSearch;
      this._queryStore.updateQueryParams({ search: newSearch });
    }
  }

  get search() {
    return this._search;
  }

  get filter() {
    return this._filter;
  }
}
