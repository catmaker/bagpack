import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "TimeInk",
  description: "당신의 인생 여정을 기록하는 특별한 공간",
  icons: "/bagpackIcon/favicon.png",
};
import { UserProvider } from "@/app/provider/UserProvider";
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
