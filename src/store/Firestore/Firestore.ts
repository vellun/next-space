import { db } from "@config/firebase";
import type { ObjectsApiRequestParams } from "@store/Firestore/types";
import { type ApiResp } from "@utils/apiTypes";
import { FirebaseError } from "firebase/app";
import type {
  DocumentData,
  DocumentSnapshot,
  QueryConstraint,
  QuerySnapshot} from "firebase/firestore";
import {
  collection,
  doc,
  getDocFromCache,
  getDocFromServer,
  getDocsFromCache,
  getDocsFromServer,
  limit,
  query,
  startAfter,
  where
} from "firebase/firestore";

import { astroObjectConverter } from "./converters";

class Firestore {
  private async _getObjectsSnapshot(
    source: "server" | "cache",
    params: ObjectsApiRequestParams
  ): Promise<QuerySnapshot> {
    const objectsRef = collection(db, "objects").withConverter(astroObjectConverter);

    const constraints: QueryConstraint[] = []
    let objectsOuery = query(objectsRef)
    if (params.search) {
      constraints.push(where("name", "==", params.search))
      // Птом поиск лучше сделаю
      // constraints.push(where('name', '>=', params.search), where('name', '<=', params.search + '\uf8ff'))
    }
    if (params.category !== undefined && params.category !== "all") {
      constraints.push(where("category", "==", params.category))
    }
    
    if (params.perPage) {
      constraints.push(limit(params.perPage));
    }
    
    if (params.startAfter) {
      constraints.push(startAfter(params.startAfter));
    }
    
    objectsOuery = query(objectsRef, ...constraints)

    const querySnapshot =
      source === "server"
        ? await getDocsFromServer(objectsOuery)
        : await getDocsFromCache(objectsOuery);

    return querySnapshot
  }

  private async _getObjectSnapshot(
    source: "server" | "cache",
    objectName: string
  ): Promise<DocumentSnapshot> {
    const objectRef = doc(db, "objects", objectName).withConverter(astroObjectConverter);

    const querySnapshot =
      source === "server"
      ? await getDocFromServer(objectRef)
      : await getDocFromCache(objectRef);

    return querySnapshot
  }

  async getAstroObjects(params: ObjectsApiRequestParams): Promise<ApiResp<QuerySnapshot<DocumentData, DocumentData>>> {
    try {
      const objects = await this._getObjectsSnapshot("server", params);
      return { isError: false, data: objects };
    } catch (e) {
      if (e instanceof FirebaseError && e.code === "unavailable") {
        const snapshot = await this._getObjectsSnapshot("cache", params);
        if (!snapshot.empty) {
          return { isError: false, data: snapshot };
        }
      }
      return { isError: true, data: e };
    }
  }

  async getAstroObject(objectName: string): Promise<ApiResp<DocumentData>> {
    try {
      const objectSnap = await this._getObjectSnapshot("server", objectName);
      
      return { isError: false, data: objectSnap };
    } catch (e) {
      if (e instanceof FirebaseError && e.code === "unavailable") {
        const snapshot = await this._getObjectSnapshot("cache", objectName);
        if (!snapshot.exists()) {
          return { isError: false, data: snapshot };
        }
      }
      return { isError: true, data: e };
    }
  }
}

export const firebaseStore = new Firestore();
