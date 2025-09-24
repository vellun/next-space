import { routesConfig } from "@/config";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(routesConfig.astroObjects.create());
}
