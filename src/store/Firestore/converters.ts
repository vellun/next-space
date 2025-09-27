import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

import { AstroObject } from "./models";

export const astroObjectConverter: FirestoreDataConverter<AstroObject> = {
  toFirestore: (object: AstroObject): DocumentData => {
    return {
      name: object.name,
      slug: object.slug,
      category: object.category,
      description: object.description,
      imagePath: object.imagePath,
      imageDetailPath: object.imageDetailPath,
      info: object.info,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): AstroObject => {
    const data = snapshot.data(options);
    return new AstroObject(
      data.name,
      data.slug,
      data.category,
      data.description,
      data.imagePath,
      data.imageDetailPath,
      data.info
    );
  },
};
