import { Inter } from "next/font/google"
import Provider from "./components/provider"
import Navbar from "./components/navbar/navbar"
import Footer from "./components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children } : { children: React.ReactNode }){
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Navbar />
        <Provider>{children}</Provider>
        <Footer />
        <Provider>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}