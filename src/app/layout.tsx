import { roboto } from "@/shared/fonts";
import { Container } from "@/widgets/Container";
import "@styles/styles.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space",
  description: "Astro objects catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
