import React from "react";
import type { Metadata } from "next";

import AuthProvider from "@/providers/AuthProvider";
import AlertProvider from "@/providers/AlertProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata: Metadata = {
  title: "Tasks App",
  description: "Application to manage tasks"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AlertProvider>{children}</AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
