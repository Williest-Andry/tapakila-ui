import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./components/provider";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tapakila",
  description: "Plateforme de billetterie en ligne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
