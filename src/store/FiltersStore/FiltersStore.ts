import type { QueryParamsStore } from "@store/RootStore/QueryParamsStore";
import { makeAutoObservable, reaction } from "mobx";

export class FiltersStore {
  private _queryStore: QueryParamsStore;
  private _filter: string;
  private _search: string;

  inputValue: string | null = "";

  constructor(queryStore: QueryParamsStore) {
    this._queryStore = queryStore;
    this._filter = "";
    this._search = "";
    this.inputValue = "";

    makeAutoObservable(this);

    reaction(
      () => ({
        filter: this._queryStore.getParam("filter"),
        search: this._queryStore.getParam("search"),
      }),
      ({ filter, search }) => {
        if (filter !== undefined) {
          this._filter = filter as string;
        }
        if (search !== undefined) {
          this._search = search as string;
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

  setInputValue(newSearch: string) {
    this.inputValue = newSearch;
  }

  applySearch() {
    this.setSearch(this.inputValue || "")
  }

  get search() {
    return this._search;
  }

  get filter() {
    return this._filter;
  }
}
