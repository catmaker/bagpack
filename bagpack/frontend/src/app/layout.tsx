import React from "react";
import { UserProvider } from "@/app/provider/UserProvider";
import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "TimeInk",
  description: "당신의 인생 여정을 기록하는 특별한 공간",
  icons: "/bagpackIcon/favicon.png",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </UserProvider>
  );
}
