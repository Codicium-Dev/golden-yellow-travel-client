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
  title: {
    default: "Golden Asia Expedition",
    template: "%s - Golden Asia Expedition",
  },
  description:
    "Make your memorable trip at the best prices! Plan your dream to South East Asia with us.",
  keywords:
    "Travel, travel agency, cheap flights, cheap airline tickets, cheap flight tickets, booking flights,airline flights,cheap airfare,book flight tickets,book flights online,cheap flights australia,find cheap flights,best flight booking site,airfares,airticket,cheapest flight booking,cheap fly tickets,flight ticket booking online,cheap fly,discount flights,cheapest tickets,flights to vietnam,international flight tickets,low cost flights,air flight tickets,buy plane tickets,tickets flight,cheap fares,cheap domestic flights,air fare deals,book airline tickets,buy airline tickets,cheapest flight booking site,best cheap flights,affordable flights,buy flight tickets,flight ticket online,low fare flights,best flight prices,airfare prices,air flight,cheap air fares,airline flights cheap,discount airfare,cheapest air ticket,domestic flight booking,buy flights,online air ticket booking,cheap flights to vietnam,cheapest flight ticket booking,best flight booking website,cheap air line tickets,budget flights,flights search,air line tickets cheap,book international flights,cheap cheap flights,cheap flight fares,compare flight tickets,best way to find cheap flights,air fare tickets,low price flights,flight booking website,search cheap flights,book air ticket,cheapest time to buy flights,best flight booking website australia,airlines ticket,discount flight tickets,cheap air flight,booking fly,best flights website,flights to hanoi,international flights tickets online,vietnam airlines booking,cheap international flight tickets,lowest flight ticket,ticket to vietnam,flights to ho chi minh city,lowest airfare,cheap fares flights,cheap flights website,flights online,buy cheap flights,cheap air ticket booking,best price airline tickets,best ticket booking sites,cheapest website to book flights,low cost airline tickets,buy air tickets online,air ticket prices,cheap flights online,best site to book flight tickets,best air ticket booking site,flight ticket to vietnam,compare flights australia,lowest airline tickets,cheapest domestic airlines,flights to vietnam from melbourne,low price flight ticket,cheap domestic flight tickets,tickets fly,online airline tickets,buy air ticket,book airline flights,low price airline tickets,flight ticket booking offers,trip flight,flight fare deals,air ticket to vietnam,online air ticket,international air tickets,flights to vietnam from london,low cost airfare,best flight tickets,get cheap flights,low price air ticket,fly to vietnam,us domestic flights,best international flight booking site,cheapest flight deals,air ticket booking online international,best flight booking,cheap airline tickets one way,flight ticket search,buy cheap flight tickets,fly cheap flights,book cheap flights online,flights to vietnam from sydney,cheap air tickets domestic,hanoi to danang flight,travel cheap flights,flight comparison website,airline tickets sites,flightticket,cheap air flights tickets,lowest air ticket,best way to buy airline tickets,best cheap flight tickets,cheap flights flights,low flights,price flights,cheap ticket booking,cheap ticket to vietnam,melbourne to vietnam,cheap us flights,vietnamese airlines,best price flight tickets,cheap flights to ho chi minh city,cheap fly fares,best flight rates,vietnam airlines australia,best way to buy plane tickets,cheap price flights,cheap air travel,best deal flights,best airline fares,vietnam airline ticket,the cheapest flight tickets,best cheap airline tickets,tickets to fly,flights to hanoi vietnam,best flights australia,bamboo airways vietnam,check cheap flights,book my air travel,hanoi to ho chi minh flight,cheapest flight tickets website,travel flight booking,cheapest air,booking fly ticket,travel tickets cheap,cheap flights tickets prices,online airline ticket booking,search flights online,book a ticket online,price airline tickets,air planes tickets,domestic flight tickets,fly tickets online,ho chi minh to hanoi flight,flight ticket deals,air flight ticket booking,air fly ticket,check flight prices,cheap flights in australia,lowest fares,airfare to vietnam,flight to ho chi minh,plane ticket cheap,cheapest time to fly,buy cheap plane tickets,discount air fares,plane tickets to vietnam,domestic flight ticket booking,air ticket booking sites,flight tickets price,cheap air tickets international,jetstar airline,best tickets for flights,flight fare compare,best site for domestic flight booking,low fare flight tickets,budget air ticket,cheap flight compare,discount airline flights,international air ticket booking,cheap airlines australia,da nang to hanoi flight,fly ticket price,flight for all,air ticket rate,top flight booking sites,flight comparison australia,low cost flight ticket,cheap ticket flight booking,vietnam airlines ticket price,travel tickets online,best price tickets",
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
          <head>
            {/* Google Tag Manager */}
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-LH3MHM47V6"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LH3MHM47V6');
            `,
              }}
            />
          </head>
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
