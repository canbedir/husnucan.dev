import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

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
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add
          attributes to <body> before hydration; ignore those mismatches. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delay={120}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
