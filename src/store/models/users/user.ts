import type { AstroObject } from "../objects";

export type UserModel = {
    name: string;
    avatarUrl: string;
    favorites: AstroObject[];
};

export type ProfileModel = {
  email: string;
  name?: string;
  avatar: string;
};