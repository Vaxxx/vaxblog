import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider } from "@/app/theme-provider";
import {Providers} from "@/app/provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Code Blog',
  description: 'A podium for all IT Trends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <Providers>
             <ThemeProvider
                 attribute="class"
                 defaultTheme="system"
                 enableSystem
                 disableTransitionOnChange
             >
                 <Navbar/>
                 {children}
                 <ToastContainer position={"bottom-right"} theme={"light"} autoClose={4000} />
                 <Footer/>
             </ThemeProvider>
         </Providers>
      </body>
    </html>
  )
}
