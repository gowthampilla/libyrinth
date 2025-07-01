import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The OSSPTS",
  description: "The Official Site of the OSSPTS",
  icons: {
    icon: "https://res.cloudinary.com/dobqpjhd7/image/upload/v1751377346/photo_6278223030123612362_y-removebg-preview_zlheaj.png",
    apple: "https://res.cloudinary.com/dobqpjhd7/image/upload/v1751377346/photo_6278223030123612362_y-removebg-preview_zlheaj.png",
  },
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/dobqpjhd7/image/upload/v1751377346/photo_6278223030123612362_y-removebg-preview_zlheaj.png",
        width: 800,
        height: 600,
        alt: "OSSPTS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://res.cloudinary.com/dobqpjhd7/image/upload/v1751377346/photo_6278223030123612362_y-removebg-preview_zlheaj.png",
        width: 800,
        height: 600,
        alt: "OSSPTS Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dobqpjhd7/image/upload/v1751377346/photo_6278223030123612362_y-removebg-preview_zlheaj.png"
          type="image/png"
          sizes="any"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}