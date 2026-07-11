import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const funnelSans = Funnel_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Same bare title on every page; no description or Open Graph, so shared
  // links unfurl with nothing but the URL.
  title: "husnucan.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${funnelSans.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delay={120}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            {/* Soft fade so content dissolves into the background at the
                bottom edge of the viewport. */}
            <div
              aria-hidden
              className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 bg-linear-to-t from-background to-transparent"
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
