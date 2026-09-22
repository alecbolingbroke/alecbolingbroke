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
  description: "I make what I want to exist. Software, hardware, and automation, in the open.",
  openGraph: {
    title: "Alec Bolingbroke",
    description: "I make what I want to exist. Software, hardware, and automation, in the open.",
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
        {/* Inlined in the HTML itself, so it runs even when the chunks under
            /_next/static don't. If React hasn't hydrated by now the bundle is
            gone, so unhide the scroll reveals — their hidden state is
            server-rendered and would otherwise sit at opacity 0 forever, taking
            the About copy and the footer's email CTA with it. It clears the
            inline styles directly rather than via a class so it still works when
            the stylesheet is missing too. See reveal.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "setTimeout(function(){if(document.documentElement.dataset.hydrated==='true')return;document.querySelectorAll('.reveal').forEach(function(n){n.style.opacity='1';n.style.filter='none'})},4000)",
          }}
        />
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
