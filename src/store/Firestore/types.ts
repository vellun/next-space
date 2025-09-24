import type { QueryStartAtConstraint } from "firebase/firestore";

export type ObjectsApiRequestParams = {
  search: string | null;
  category: string | null;
  perPage: number | null;
  startAfter: QueryStartAtConstraint
};
