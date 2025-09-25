import type { QueryDocumentSnapshot } from "firebase/firestore";

export type ObjectsApiRequestParams = {
  search: string | null;
  category: string | null;
  perPage: number | null;
  startAfter: QueryDocumentSnapshot | null;
};
