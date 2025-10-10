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
  favorites: { 
    mask: "/favorites",
    create: () => "/favorites",
},
};
