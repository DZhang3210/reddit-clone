import type { Metadata } from "next";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import "./globals.css";
import { ConvexClientProvider } from "../components/ConvexClientProvider";
import { Toaster } from "sonner";
import Modals from "@/components/modals";

export const metadata: Metadata = {
  title: "Reddit Clone",
  description: "A reddit clone built with Convex and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className="bg-dark-1">
          <ConvexClientProvider>
            <Modals />
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
