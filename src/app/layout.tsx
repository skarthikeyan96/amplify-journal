import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Auth from "@/components/auth/Auth";
import NavBar from "@/components/Navbar";
import { isAuthenticated } from "@/utils/amplify-utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar isSignedIn={await isAuthenticated()}/>
        <Auth>{children}</Auth>
      </body>
    </html>
  );
}
