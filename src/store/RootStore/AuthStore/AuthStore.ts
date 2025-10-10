import { auth } from "@config/firebase";
import { Meta } from "@utils/meta";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    type User 
} from "firebase/auth";
import { action, makeObservable, observable, runInAction } from "mobx";

export class AuthStore {
    user: User | null = null;
    isLoggedIn = false;
    meta: Meta = Meta.initial;

    constructor() {
        makeObservable(this, {
            user: observable.ref,
            isLoggedIn: observable,
            meta: observable,
            login: action.bound,
            register: action.bound,
            logout: action.bound,
            setMeta: action,
        });
        
        onAuthStateChanged(auth, (user) => {
            runInAction(() => {
                this.user = user;
                this.isLoggedIn = !!user;
            });
            
            if (user) {
                // Вызываем миграцию после логина
                import("../FavoritesStore/instance").then(({ favoritesStore }) => {
                    favoritesStore.handleAuthChange(user.uid);
                });
            }
        });
    }

    setMeta(newMeta: Meta) {
        this.meta = newMeta;
    }

    async login(email: string, password: string): Promise<void> {
        this.setMeta(Meta.loading);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            this.setMeta(Meta.success);
        } catch (e) {
            this.setMeta(Meta.error);
            console.error("Login failed:", e);
            throw e; 
        }
    }

    async register(email: string, password: string): Promise<void> {
        this.setMeta(Meta.loading);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            this.setMeta(Meta.success);
        } catch (e) {
            this.setMeta(Meta.error);
            console.error("Registration failed:", e);
            throw e;
        }
    }

    async logout(): Promise<void> {
        this.setMeta(Meta.loading);
        try {
            await signOut(auth);
            this.setMeta(Meta.success);
        } catch (e) {
            this.setMeta(Meta.error);
            console.error("Logout failed:", e);
            throw e;
        }
    }
}