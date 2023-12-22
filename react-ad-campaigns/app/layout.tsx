import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UINavigation from "./components/ui-navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PPC.io - Pay as you sell!",
  description: "Boost your PPC ad campaigns with PPC.io!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UINavigation />
        {children}
      </body>
    </html>
  );
}
