import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { LoadBlur } from "@/components/load-blur";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alecbolingbroke.com"),
  title: {
    default: "Alec Bolingbroke",
    template: "%s · Alec Bolingbroke",
  },
  description: "I make AI systems that handle the busywork.",
  openGraph: {
    title: "Alec Bolingbroke",
    description: "I make AI systems that handle the busywork.",
    url: "https://alecbolingbroke.com",
    siteName: "Alec Bolingbroke",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <Cursor />
        <SmoothScroll>
          <LoadBlur>
            <Nav />
            <main>{children}</main>
            <Footer />
          </LoadBlur>
        </SmoothScroll>
      </body>
    </html>
  );
}
