import type { Metadata, Viewport } from "next";
import { Montserrat, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ChatDock } from "@/components/chatbot/ChatDock";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#faf8f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatDock />
        </PostHogProvider>
      </body>
    </html>
  );
}
