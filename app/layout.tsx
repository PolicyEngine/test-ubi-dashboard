// TODO: Uncomment when @policyengine/ui-kit is published to npm
// import "@policyengine/ui-kit/styles.css";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universal Basic Income impact dashboard - PolicyEngine",
  description:
    "An interactive dashboard showing the impact of a Universal Basic Income policy on individual households and across the income distribution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@policyengine/design-system/dist/tokens.css"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
