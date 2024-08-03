import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./Components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BreezeCode",
  description: "One place to master Coding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{backgroundColor : '#FFF0E5'}}>
      <AuthProvider>
        <NavBar />
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
