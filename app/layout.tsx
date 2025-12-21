import type { Metadata } from "next";
import { Geist, Geist_Mono, Anonymous_Pro } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anonymousPro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-anonymous-pro",
});

export const metadata: Metadata = {
  title: "Developer Student Community, SVCE",
  description: "Step into our vibrant student community, where we foster a passion for technology and development to build powerful products and create impactful stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={anonymousPro.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${anonymousPro.variable} ${anonymousPro.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
