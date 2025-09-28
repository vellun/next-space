import { action, computed, makeObservable, observable } from "mobx";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import qs from "qs";

export class QueryParamsStore {
  _params: qs.ParsedQs = {};
  _search = "";
  _router: AppRouterInstance | null = null;

  constructor() {
    makeObservable<QueryParamsStore>(this, {
      _params: observable,
      _search: observable,
      _router: observable,

      setSearch: action,
      setNavigate: action,
      updateQueryParams: action,

      search: computed,
      navigate: computed,
      apiObjectsParams: computed,
    });
  }

  getParam(key: string): undefined | string | qs.ParsedQs | (string | qs.ParsedQs)[] {
    return this._params[key];
  }

  setSearch(search: string) {
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  setNavigate(router: AppRouterInstance) {
    this._router = router;
  }

  get search() {
    return this._search;
  }

  get navigate() {
    return this._router;
  }

  get apiObjectsParams() {
    return {
      search: this.getParam("search") as string,
      category: this.getParam("category") as string,
      perPage: 3,
    };
  }

  updateQueryParams = (params: Record<string, string | number | null | number[]>) => {
    if (!this._router) {
      return
    }

    const searchParams = new URLSearchParams(window.location.search.split("?")[1] || "");

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== "" && value !== null) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });

    const url = `${window.location.pathname}${`?${searchParams.toString()}`}`;

    this._router.replace(url, {scroll: false})
  }
}
