import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import Header from "../components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Monda } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { ReactQueryProvider } from "../helper/ReactQueryProvider";
import ReduxProvider from "@/helper/ReduxProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  display: "swap",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--open-sans",
});
const monda = Monda({
  subsets: ["latin"],
  variable: "--monda",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Golden Yellow Travel ",
  description: "This website is provided from YoLo Digital Marketing.",
  openGraph: {
    title: "Goden Travel",
    images: [
      {
        url: "logo.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html lang="en">
          <body
            className={`${inter.variable} ${openSans.variable} ${monda.variable}`}
          >
            <ReduxProvider>
              <Header />
              <ToastContainer />
              {children}
              <Footer />
            </ReduxProvider>
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
