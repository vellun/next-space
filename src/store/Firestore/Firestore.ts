import { db } from "@config/firebase";
import type { ObjectsApiRequestParams } from "@store/Firestore/types";
import { type ApiResp } from "@utils/apiTypes";
import { FirebaseError } from "firebase/app";
import type {
  DocumentData,
  DocumentSnapshot,
  QueryConstraint,
  QuerySnapshot
} from "firebase/firestore";
import {
  and,
  collection,
  doc,
  getDocFromCache,
  getDocFromServer,
  getDocsFromCache,
  getDocsFromServer,
  limit,
  or,
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

    let objectsOuery = query(objectsRef)
    const constraints = []
    const andConstraints = []

    if (params.search) {
      const orConstraints = []
      
      const searchQuery = params.search.toLocaleLowerCase().split(" ")

      for (const word of searchQuery) {
        orConstraints.push(and(where('slug', '>=', word), where('slug', '<=', word + '\uf8ff')))
        orConstraints.push(and(where('slug_reversed', '>=', word.split('').reverse().join('')), 
                          where('slug_reversed', '<=', word.split('').reverse().join('') + '\uf8ff')))
      }

      andConstraints.push(or(...orConstraints))
    }

    if (params.category !== undefined && params.category !== "all") {
      andConstraints.push(where("category", "==", params.category))
    }

    constraints.push(and(...andConstraints))
    
    if (params.perPage) {
      constraints.push(limit(params.perPage));
    }
    
    if (params.startAfter) {
      constraints.push(startAfter(params.startAfter));
    }
    
    objectsOuery = query(objectsRef, ...constraints as QueryConstraint[])

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
