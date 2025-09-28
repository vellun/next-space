import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    {
      path: "./styles/Roboto/Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./styles/Roboto/Roboto-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./styles/Roboto/Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
