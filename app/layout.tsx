import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const funnelSans = Funnel_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://husnucan.dev";
const description =
  "canbedir — full-stack developer, building things from idea to launch.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // The tab always reads "husnucan.dev"; the share card carries the longer line.
  title: "husnucan.dev",
  description,
  openGraph: {
    title: "husnucan.dev — full-stack developer",
    description,
    url: siteUrl,
    siteName: "husnucan.dev",
    type: "website",
  },
  // Text-only card: no image, by choice.
  twitter: {
    card: "summary",
    title: "husnucan.dev — full-stack developer",
    description,
  },
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
        <Analytics />
      </body>
    </html>
  );
}
