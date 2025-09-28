import type { QueryParamsStore } from "@store/RootStore/QueryParamsStore";
import { action, computed, makeObservable, observable, reaction } from "mobx";

export class FiltersStore {
  _queryStore: QueryParamsStore;
  _category: string;
  _search: string;

  inputValue: string | null = "";

  constructor(queryStore: QueryParamsStore) {
    this._queryStore = queryStore;
    this._category = "";
    this._search = "";
    this.inputValue = "";

    makeObservable(this, {
      _category: observable,
      _search: observable,
      inputValue: observable,
      setCategory: action,
      setSearch: action,
      setInputValue: action,
      applySearch: action,
      category: computed,
      search: computed,
    });

    reaction(
      () => ({
        category: this._queryStore.getParam("category"),
        search: this._queryStore.getParam("search"),
      }),
      ({ category, search }) => {
        if (category !== undefined) {
          this._category = category as string;
        }
        if (search !== undefined) {
          this._search = search as string;
        }
      }
    );
  }

  setCategory(newCategory: string) {
    if (this._category !== newCategory) {
      this._category = newCategory;
      this._queryStore.updateQueryParams({ category: newCategory });
    }
  }

  setSearch(newSearch: string, reload = true) {
    if (this._search !== newSearch) {
      this._search = newSearch;

      if (reload) {
        this._queryStore.updateQueryParams({ search: newSearch });
      }
    }
  }

  setInputValue(newSearch: string) {
    this.inputValue = newSearch;
  }

  applySearch() {
    this.setSearch(this.inputValue || this._search || "");
  }

  resetSearch() {
    this.setInputValue("");
    this.setSearch("", false);
  }

  get search() {
    return this._search;
  }

  get category() {
    return this._category;
  }
}
