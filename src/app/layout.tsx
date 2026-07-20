import type { Metadata } from "next";
import Script from "next/script";
import { Sora } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileDock } from "@/components/layout/MobileDock";
import { PageLoader } from "@/components/layout/PageLoader";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "portfolio",
    "web developer",
    "frontend developer",
    "Next.js",
    "React",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  // No `icons` entry on purpose — src/app/icon.svg is picked up by the App
  // Router file convention, and an explicit entry here would override it.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sora.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {/* Apply the saved theme before paint to avoid a flash. Default dark. */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <PageLoader />
        <ThemeToggle />
        {children}
        <MobileDock />
        {/* top-center keeps clear of the theme toggle (top-right on mobile)
            and the floating dock (bottom). */}
        <ToastContainer
          position="top-center"
          autoClose={4000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </body>
    </html>
  );
}
