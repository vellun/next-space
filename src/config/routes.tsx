export const routesConfig = {
  root: {
    mask: "/",
    create: () => "/",
  },
  astroObjects: {
    mask: "/astro-objects",
    create: () => "/astro-objects",
  },
  astroObjectDetail: {
    mask: "/astro-objects/:objectName",
    create: (objectName: string) => `/astro-objects/${objectName}`,
  },
  login: {
    mask: "/login",
    create: () => "/login",
  },
  register: {
    mask: "/register",
    create: () => "/register",
  },
  favorites: {
    mask: "/astro-objects/favorites",
    create: () => "/astro-objects/favorites",
  },
};
