"use client"

import localFont from "next/font/local";
import "./globals.css";

import { NextUIProvider } from "@nextui-org/react";
import { ImageKitProvider } from "imagekitio-next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (err) {
    const error = err as Error;
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextUIProvider>
         <ImageKitProvider
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        > 
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased  container mx-auto py-8`}
          >
            {children}
          </body>
        </ImageKitProvider>
      </NextUIProvider>
    </html>
  );
}
