import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

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
    default: "Alec Bolingbroke — Builder",
    template: "%s · Alec Bolingbroke",
  },
  description:
    "Independent builder working at the seam of AI, automation, and systems design. An open lab of things in progress.",
  openGraph: {
    title: "Alec Bolingbroke — Builder",
    description:
      "Independent builder working at the seam of AI, automation, and systems design.",
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
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <Cursor />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
