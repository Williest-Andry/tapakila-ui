import { Inter } from "next/font/google"
import Provider from "./provider"
import Navbar from "./components/navbar/navbar"

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
      </body>
    </html>
  )
}