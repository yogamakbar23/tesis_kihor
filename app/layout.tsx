import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("h-full", "antialiased", gamasans.className, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
