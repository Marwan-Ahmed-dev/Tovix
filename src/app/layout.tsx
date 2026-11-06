import type { Metadata, Viewport } from "next";
import { Oxanium, Rajdhani } from "next/font/google";
import { ChapterRail } from "@/components/fx/ChapterRail";
import { Cursor } from "@/components/fx/Cursor";
import { Curtain } from "@/components/fx/Curtain";
import { Preloader } from "@/components/fx/Preloader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { studio } from "@/data/studio";
import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tovix.studio"),
  title: {
    default: "Tovix Games",
    template: "%s · Tovix Games",
  },
  description: studio.tagline,
  applicationName: "Tovix Games",
  keywords: ["game studio", "independent games", "Tovix", "Signal Rift", "Voidline"],
  openGraph: {
    title: "Tovix Games",
    description: studio.tagline,
    siteName: "Tovix Games",
    images: [{ url: "/brand/tovix-mark.png", width: 1024, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tovix Games",
    description: studio.tagline,
    images: ["/brand/tovix-mark.png"],
  },
};

const bootScript = `(function(){try{
var k="tovix-booted";
if(sessionStorage.getItem(k)==="1"){return;}
var d=document.documentElement;
d.setAttribute("data-boot","1");
setTimeout(function(){
  try{sessionStorage.setItem(k,"1");}catch(e){}
  d.removeAttribute("data-boot");
  window.dispatchEvent(new Event("tovix:boot"));
},1750);
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${oxanium.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full min-w-0 flex-col bg-[var(--void)] text-[var(--ink)]">
        <Preloader />
        <Cursor />
        <Curtain />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <ChapterRail />
        <SiteFooter />
      </body>
    </html>
  );
}
