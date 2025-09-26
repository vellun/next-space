import { redirect } from "next/navigation";

import { routesConfig } from "@/config";

export default function Home() {
  redirect(routesConfig.astroObjects.create());
}
