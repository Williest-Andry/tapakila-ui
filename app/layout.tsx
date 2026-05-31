import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./components/provider";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer";
import { Box } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Tapakila", template: "%s | Tapakila" },
  description: "Discover and book tickets for the best events.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.className} suppressHydrationWarning>
      <head />
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Provider>
          <Navbar />
          <Box as="main" flex={1}>
            {children}
          </Box>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
