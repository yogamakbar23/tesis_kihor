import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const gamasans = localFont({
  src: [
    {
      path: "./fonts/Gama-Sans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Gama-Sans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perencanaan Budidaya Resirkulasi",
  description: "by Rizki Ahmad Fahrezi",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${gamasans.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
