import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Footer from "./_components/footer";
import { Toaster } from "./_components/ui/sonner";
import AuthProvider from "./providers/auth";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "FSW Barber",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${nunito.className} antialiased`}>
        <AuthProvider>
          <Toaster />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
