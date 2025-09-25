import { makeAutoObservable } from "mobx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import qs from "qs";

export class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search = "";
  private _router: AppRouterInstance | null = null;

  constructor() {
    makeAutoObservable<QueryParamsStore>(this);
  }

  getParam(key: string): undefined | string | qs.ParsedQs | (string | qs.ParsedQs)[] {
    return this._params[key];
  }

  get search() {
    return this._search;
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

  get navigate() {
    return this._router;
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

  getApiObjectsParams() {
    return {
      search: this.getParam("search") as string,
      category: this.getParam("filter") as string,
      perPage: 3,
    };
  }
}
