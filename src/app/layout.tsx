import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import Provider from "@/components/Provider/Provider";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDFWhisper - Unveiling Conversations Within the Pages",
  description: "Unleash the power of conversation within your PDFs with PDFWhisper. Transform static files into dynamic dialogues for a revolutionary document experience.",
  icons:{
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={cn(
            ` min-h-screen bg-background  font-sans antialiased grainy ${inter.className}`
          )}
        >
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
