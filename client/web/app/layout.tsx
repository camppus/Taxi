import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/provider/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
  description: "Painel de gestão",
};

export default function RootLayout({ children }: Readonly<LayoutProps<"/">>) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
