import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import Sidebar from "@/components/Sidebar";
import SignInModal from "@/components/modals/SignInModal";
import SignUpModal from "@/components/modals/SignUpModal";
import { QClientProvider } from "@/providers/QueryClientProvider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "Share Comments With The World",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToasterProvider />
          <QClientProvider>
            <SignInModal />
            <SignUpModal />
            <div className="flex h-full">
              <Sidebar />
              {children}
            </div>
          </QClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
