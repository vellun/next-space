import { AstroObject } from "@/store/models/objects";
import { UserModel } from "@/store/models/users/user";
import { Meta } from "@/utils/meta";
import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";

export class AuthStore {
  _user: User | null = null;
  _favorites: AstroObject[];
  _isAuth: boolean = false;
  meta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable(this);

    if (token) {
      this._token = token;
      this.fetchCurrentUser();
    }
  }

  async fetchCurrentUser(): Promise<void> {
    runInAction(() => {
      this.meta = Meta.loading;
      this._user = null;
    });

    const { isError, data } = await UsersService.getCurrentUser();
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    this.setUser(data);

    runInAction(() => {
      this.meta = Meta.success;
      this._user = data;
    });
  }

  async login(token: string, user: ProfileModel) {
    setCookie("token", token);
    this.setIsAuth(true);
    this.setUser(user);
    this.fetchCurrentUser();
  }

  logout() {
    removeCookie("token");
    this.setIsAuth(false);
  }

  setUser(newUser: UserModel) {
    this._user = newUser;
  }

  get user() {
    return this._user;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }
}
