import type { Metadata } from "next";
import Provider from "./components/provider";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer";
import { Box } from "@chakra-ui/react";


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
    <html lang="fr" suppressHydrationWarning>
      <head />
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
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
